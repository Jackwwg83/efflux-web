import OpenAI from 'openai'
import { BaseAIProvider } from '../base'
import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

export class OpenAIProvider extends BaseAIProvider {
  private client: OpenAI

  constructor(apiKey: string) {
    super(apiKey)
    this.client = new OpenAI({ 
      apiKey,
      dangerouslyAllowBrowser: true // We'll handle security with encryption
    })
  }

  get id() {
    return 'openai'
  }

  get name() {
    return 'OpenAI'
  }

  get models(): ModelInfo[] {
    return [
      {
        id: 'gpt-4-turbo-preview',
        name: 'GPT-4 Turbo',
        provider: 'openai',
        contextLength: 128000,
        description: 'Most capable GPT-4 model with vision capabilities',
        capabilities: ['chat', 'vision', 'function-calling'],
      },
      {
        id: 'gpt-4',
        name: 'GPT-4',
        provider: 'openai',
        contextLength: 8192,
        description: 'More capable than GPT-3.5, better at complex tasks',
        capabilities: ['chat', 'function-calling'],
      },
      {
        id: 'gpt-3.5-turbo',
        name: 'GPT-3.5 Turbo',
        provider: 'openai',
        contextLength: 16385,
        description: 'Fast and cost-effective for simple tasks',
        capabilities: ['chat', 'function-calling'],
      },
    ]
  }

  async *chat(
    messages: ChatMessage[],
    options: ChatOptions
  ): AsyncGenerator<ChatChunk> {
    try {
      const stream = await this.client.chat.completions.create({
        model: options.model,
        messages: messages as any,
        temperature: options.temperature,
        max_tokens: options.maxTokens,
        top_p: options.topP,
        frequency_penalty: options.frequencyPenalty,
        presence_penalty: options.presencePenalty,
        stop: options.stop,
        tools: options.tools as any,
        tool_choice: options.toolChoice as any,
        stream: true,
      })

      let promptTokens = 0
      let completionTokens = 0

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta

        if (delta?.content) {
          yield {
            type: 'content',
            content: delta.content,
          }
        }

        if (delta?.tool_calls) {
          for (const toolCall of delta.tool_calls) {
            yield {
              type: 'tool_call',
              tool_call: toolCall as any,
            }
          }
        }

        // Track usage if provided
        if (chunk.usage) {
          promptTokens = chunk.usage.prompt_tokens || 0
          completionTokens = chunk.usage.completion_tokens || 0
        }
      }

      // Send final chunk with usage
      yield {
        type: 'done',
        usage: {
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
        },
      }
    } catch (error) {
      yield this.handleError(error)
    }
  }

  async validateApiKey(): Promise<boolean> {
    try {
      // Make a minimal API call to validate the key
      await this.client.models.list()
      return true
    } catch {
      return false
    }
  }
}