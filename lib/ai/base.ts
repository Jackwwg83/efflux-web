import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

export abstract class BaseAIProvider {
  protected apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  abstract get id(): string
  abstract get name(): string
  abstract get models(): ModelInfo[]

  abstract chat(
    messages: ChatMessage[],
    options: ChatOptions
  ): AsyncGenerator<ChatChunk>

  abstract validateApiKey(): Promise<boolean>

  protected handleError(error: any): ChatChunk {
    return {
      type: 'error',
      error: error.message || 'An error occurred',
    }
  }
}