import { GoogleGenerativeAI } from '@google/generative-ai'
import { BaseAIProvider } from '../base'
import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

export class GoogleProvider extends BaseAIProvider {
  private client: GoogleGenerativeAI

  constructor(apiKey: string) {
    super(apiKey)
    this.client = new GoogleGenerativeAI(apiKey)
  }

  get id() {
    return 'google'
  }

  get name() {
    return 'Google AI'
  }

  get models(): ModelInfo[] {
    return [
      {
        id: 'gemini-1.5-pro-latest',
        name: 'Gemini 1.5 Pro',
        provider: 'google',
        contextLength: 1048576, // 1M tokens
        description: 'Most capable Gemini model with massive context window',
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
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        provider: 'google',
        contextLength: 32768,
        description: 'Balanced performance for general tasks',
        capabilities: ['chat', 'function-calling'],
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