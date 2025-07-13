import { GoogleGenerativeAI } from '@google/generative-ai'
import { BaseAIProvider } from '../base'
import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

interface GoogleModel {
  name: string
  baseModelId: string
  version: string
  displayName: string
  description: string
  inputTokenLimit: number
  outputTokenLimit: number
  supportedGenerationMethods: string[]
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
    // Start loading models asynchronously
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
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data: ListModelsResponse = await response.json()
      
      // Filter and convert to our ModelInfo format
      this._models = data.models
        .filter(model => 
          model.supportedGenerationMethods.includes('generateContent') &&
          model.baseModelId.startsWith('gemini')
        )
        .map(model => ({
          id: model.baseModelId,
          name: model.displayName || model.baseModelId,
          provider: 'google' as const,
          contextLength: model.inputTokenLimit,
          description: model.description,
          capabilities: this.getModelCapabilities(model),
        }))

      this._modelsLoaded = true
      console.log(`Loaded ${this._models.length} Google models:`, this._models.map(m => m.name))
    } catch (error) {
      console.warn('Failed to load Google models from API, using fallback:', error)
      // Use fallback models if API fails
      this._models = this.getFallbackModels()
      this._modelsLoaded = true
    }
  }

  private getModelCapabilities(model: GoogleModel): string[] {
    const capabilities = ['chat']
    
    // Check if model supports vision (usually indicated by having high context limits)
    if (model.inputTokenLimit > 100000) {
      capabilities.push('vision')
    }
    
    // Most modern Gemini models support function calling
    if (model.baseModelId.includes('1.5') || model.baseModelId.includes('2.0')) {
      capabilities.push('function-calling')
    }
    
    // Experimental models might have code execution
    if (model.baseModelId.includes('exp') || model.baseModelId.includes('2.0')) {
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