import OpenAI from 'openai'
import { BaseAIProvider } from '../base'
import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

export class AzureOpenAIProvider extends BaseAIProvider {
  private client: OpenAI
  private deploymentName: string
  private endpoint: string

  constructor(config: { apiKey: string; endpoint: string; deploymentName: string }) {
    super(config.apiKey)
    this.endpoint = config.endpoint
    this.deploymentName = config.deploymentName
    
    // Azure OpenAI uses a different base URL format
    const baseURL = `${config.endpoint}/openai/deployments/${config.deploymentName}`
    
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL,
      defaultHeaders: {
        'api-key': config.apiKey,
      },
      defaultQuery: {
        'api-version': '2024-02-15-preview',
      },
      dangerouslyAllowBrowser: true,
    })
  }

  get id() {
    return 'azure'
  }

  get name() {
    return 'Azure OpenAI'
  }

  get models(): ModelInfo[] {
    // Azure models depend on deployment
    return [
      {
        id: this.deploymentName,
        name: `Azure Deployment: ${this.deploymentName}`,
        provider: 'azure',
        contextLength: 128000, // Depends on deployed model
        description: 'Your Azure OpenAI deployment',
        capabilities: ['chat', 'function-calling'],
      },
    ]
  }

  async *chat(
    messages: ChatMessage[],
    options: ChatOptions
  ): AsyncGenerator<ChatChunk> {
    try {
      // For Azure, we use the deployment name instead of model
      const stream = await this.client.chat.completions.create({
        model: this.deploymentName, // Azure uses deployment name
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
      // Make a minimal API call to validate the configuration
      await this.client.chat.completions.create({
        model: this.deploymentName,
        messages: [{ role: 'user', content: 'Hi' }],
        max_tokens: 1,
      })
      return true
    } catch {
      return false
    }
  }
}