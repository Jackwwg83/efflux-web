import { GoogleGenerativeAI } from '@google/generative-ai'
import { BaseAIProvider } from '../base'
import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

interface GoogleModel {
  name: string           // "models/gemini-2.5-flash-lite-preview-06-17"
  version: string        // "2.5-preview-06-17"
  displayName: string    // "Gemini 2.5 Flash-Lite Preview 06-17"
  description: string
  inputTokenLimit: number
  outputTokenLimit: number
  supportedGenerationMethods: string[]
  // Note: baseModelId doesn't exist in actual API response
}

interface ListModelsResponse {
  models: GoogleModel[]
  nextPageToken?: string
}

export class GoogleProvider extends BaseAIProvider {
  private client: GoogleGenerativeAI
  private _models: ModelInfo[] = []
  private _modelsLoaded = false
  private _loadingPromise: Promise<void> | null = null

  constructor(apiKey: string) {
    super(apiKey)
    this.client = new GoogleGenerativeAI(apiKey)
    // Initialize with fallback models immediately
    this._models = this.getFallbackModels()
    this._modelsLoaded = false
    // Start loading models asynchronously to replace fallback
    this._loadingPromise = this.loadModels()
  }

  get id() {
    return 'google'
  }

  get name() {
    return 'Google AI'
  }

  get models(): ModelInfo[] {
    return this._models
  }

  // Ensure models are loaded before using
  async ensureModelsLoaded(): Promise<void> {
    if (this._modelsLoaded) return
    if (this._loadingPromise) {
      await this._loadingPromise
    }
  }

  private async loadModels(): Promise<void> {
    console.log('=== Google Provider Loading Models ===')
    console.log('API Key length:', this.apiKey.length)
    console.log('API Key starts with:', this.apiKey.substring(0, 20) + '...')
    
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`
      console.log('Fetching from URL:', url.replace(this.apiKey, 'API_KEY_HIDDEN'))
      
      const response = await fetch(url)
      
      console.log('Response status:', response.status)
      console.log('Response ok:', response.ok)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error('API Error response:', errorText)
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: ListModelsResponse = await response.json()
      console.log('Raw API response:', data)
      console.log('Total models from API:', data.models?.length || 0)
      
      // 安全检查：确保 models 数组存在
      if (!data.models || !Array.isArray(data.models)) {
        console.error('Invalid API response: models array missing or invalid')
        throw new Error('Invalid API response format')
      }
      
      // Filter and convert to our ModelInfo format
      const filteredModels = data.models
        .filter(model => {
          // 安全检查：确保必要字段存在
          if (!model.name || !model.supportedGenerationMethods) {
            console.log(`Skipping model due to missing fields:`, model)
            return false
          }
          
          const hasGenerateContent = model.supportedGenerationMethods.includes('generateContent')
          const isGemini = model.name.includes('gemini') // 使用 name 字段检查
          
          // 过滤掉不适合聊天的模型
          const excludePatterns = [
            'embedding',      // 嵌入模型
            'aqa',           // 问答专用模型
            'gecko',         // 老的嵌入模型
            'text-embedding', // 嵌入模型
            'tts',           // 语音合成模型
            'image-generation', // 图像生成专用模型
            'vision-latest',  // 老的视觉模型（有更新版本）
            'pro-vision'     // 老的视觉模型（有更新版本）
          ]
          
          const shouldExclude = excludePatterns.some(pattern => 
            model.name.toLowerCase().includes(pattern.toLowerCase())
          )
          
          console.log(`Model ${model.name}: generateContent=${hasGenerateContent}, isGemini=${isGemini}, shouldExclude=${shouldExclude}`)
          return hasGenerateContent && isGemini && !shouldExclude
        })
      
      console.log('Filtered models count:', filteredModels.length)
      
      // 去重：基于模型名称去重，保留最新版本
      const uniqueModels = new Map<string, any>()
      filteredModels.forEach(model => {
        const baseModelId = model.name.replace('models/', '')
        const baseName = baseModelId.replace(/-\d{3}$/, '').replace(/-latest$/, '').replace(/-preview.*$/, '')
        
        if (!uniqueModels.has(baseName) || 
            baseModelId.includes('latest') || 
            baseModelId.includes('2.5') || 
            baseModelId.includes('2.0')) {
          uniqueModels.set(baseName, model)
        }
      })
      
      this._models = Array.from(uniqueModels.values()).map(model => {
        // 从 name 提取 baseModelId: "models/gemini-2.5-flash" -> "gemini-2.5-flash"
        const baseModelId = model.name.replace('models/', '')
        
        return {
          id: baseModelId,
          name: model.displayName || baseModelId,
          provider: 'google' as const,
          contextLength: model.inputTokenLimit,
          description: model.description,
          capabilities: this.getModelCapabilities(model),
        }
      })

      this._modelsLoaded = true
      console.log(`✅ Successfully loaded ${this._models.length} Google models:`, this._models.map(m => m.name))
    } catch (error) {
      console.error('❌ Failed to load Google models from API:', error)
      // Use fallback models if API fails
      this._models = this.getFallbackModels()
      console.log(`📦 Using ${this._models.length} fallback models:`, this._models.map(m => m.name))
      this._modelsLoaded = true
    }
  }

  private getModelCapabilities(model: GoogleModel): string[] {
    const capabilities = ['chat']
    
    // Check if model supports vision (usually indicated by having high context limits)
    if (model.inputTokenLimit > 100000) {
      capabilities.push('vision')
    }
    
    // Extract baseModelId from name field for capability checking
    const baseModelId = model.name.replace('models/', '')
    
    // Most modern Gemini models support function calling
    if (baseModelId.includes('1.5') || baseModelId.includes('2.0')) {
      capabilities.push('function-calling')
    }
    
    // Experimental models might have code execution
    if (baseModelId.includes('exp') || baseModelId.includes('2.0')) {
      capabilities.push('code-execution')
    }
    
    return capabilities
  }

  private getFallbackModels(): ModelInfo[] {
    return [
      {
        id: 'gemini-1.5-pro-latest',
        name: 'Gemini 1.5 Pro',
        provider: 'google',
        contextLength: 2097152,
        description: 'Most capable production Gemini model',
        capabilities: ['chat', 'vision', 'function-calling'],
      },
      {
        id: 'gemini-1.5-flash-latest',
        name: 'Gemini 1.5 Flash',
        provider: 'google',
        contextLength: 1048576,
        description: 'Fast and efficient for high-frequency tasks',
        capabilities: ['chat', 'vision', 'function-calling'],
      },
    ]
  }

  async *chat(
    messages: ChatMessage[],
    options: ChatOptions
  ): AsyncGenerator<ChatChunk> {
    try {
      const model = this.client.getGenerativeModel({ 
        model: options.model,
        generationConfig: {
          temperature: options.temperature,
          topP: options.topP,
          maxOutputTokens: options.maxTokens,
          stopSequences: options.stop,
        },
      })

      // Convert messages to Gemini format
      const history = messages.slice(0, -1).map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }))

      const chat = model.startChat({ history })
      
      // Get the last message
      const lastMessage = messages[messages.length - 1]
      const result = await chat.sendMessageStream(lastMessage.content)

      let totalContent = ''

      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) {
          yield {
            type: 'content',
            content: text,
          }
          totalContent += text
        }
      }

      // Get final response for token counting
      const finalResponse = await result.response
      const usage = finalResponse.usageMetadata

      yield {
        type: 'done',
        usage: {
          promptTokens: usage?.promptTokenCount || 0,
          completionTokens: usage?.candidatesTokenCount || 0,
          totalTokens: usage?.totalTokenCount || 0,
        },
      }
    } catch (error) {
      yield this.handleError(error)
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const model = this.client.getGenerativeModel({ model: 'gemini-pro' })
      await model.generateContent('Hi')
      return true
    } catch {
      return false
    }
  }
}