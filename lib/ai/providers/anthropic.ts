import Anthropic from '@anthropic-ai/sdk'
import { BaseAIProvider } from '../base'
import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

export class AnthropicProvider extends BaseAIProvider {
  private client: Anthropic

  constructor(apiKey: string) {
    super(apiKey)
    this.client = new Anthropic({ 
      apiKey
    })
  }

  get id() {
    return 'anthropic'
  }

  get name() {
    return 'Anthropic'
  }

  get models(): ModelInfo[] {
    return [
      {
        id: 'claude-3-opus-20240229',
        name: 'Claude 3 Opus',
        provider: 'anthropic',
        contextLength: 200000,
        description: 'Most capable Claude model, best for complex tasks',
        capabilities: ['chat', 'vision', 'function-calling'],
      },
      {
        id: 'claude-3-sonnet-20240229',
        name: 'Claude 3 Sonnet',
        provider: 'anthropic',
        contextLength: 200000,
        description: 'Balanced performance and speed',
        capabilities: ['chat', 'vision', 'function-calling'],
      },
      {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: 'anthropic',
        contextLength: 200000,
        description: 'Fastest Claude model for simple tasks',
        capabilities: ['chat', 'vision'],
      },
    ]
  }

  async *chat(
    messages: ChatMessage[],
    options: ChatOptions
  ): AsyncGenerator<ChatChunk> {
    try {
      // Convert messages to Anthropic format
      const anthropicMessages = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      }))

      // Extract system message if present
      const systemMessage = messages.find(m => m.role === 'system')?.content

      const stream = await this.client.messages.create({
        model: options.model,
        messages: anthropicMessages as any,
        system: systemMessage,
        max_tokens: options.maxTokens || 4096,
        temperature: options.temperature,
        top_p: options.topP,
        stream: true,
      })

      let totalContent = ''

      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
          yield {
            type: 'content',
            content: chunk.delta.text,
          }
          totalContent += chunk.delta.text
        }

        if (chunk.type === 'message_stop') {
          // Anthropic doesn't provide token usage in streaming
          // We'll estimate it (rough approximation)
          const estimatedTokens = Math.ceil(totalContent.length / 4)
          yield {
            type: 'done',
            usage: {
              promptTokens: messages.reduce((acc, m) => acc + Math.ceil(m.content.length / 4), 0),
              completionTokens: estimatedTokens,
              totalTokens: 0, // Will be calculated
            },
          }
        }
      }
    } catch (error) {
      yield this.handleError(error)
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      // Make a minimal API call to validate the key
      await this.client.messages.create({
        model: 'claude-3-haiku-20240307',
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 1,
      })
      return true
    } catch {
      return false
    }
  }
}