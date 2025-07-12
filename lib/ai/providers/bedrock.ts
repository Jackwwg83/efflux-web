import { 
  BedrockRuntimeClient, 
  InvokeModelWithResponseStreamCommand 
} from '@aws-sdk/client-bedrock-runtime'
import { BaseAIProvider } from '../base'
import { ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

export class BedrockProvider extends BaseAIProvider {
  private client: BedrockRuntimeClient
  private accessKeyId: string
  private secretAccessKey: string
  private region: string

  constructor(credentials: { accessKeyId: string; secretAccessKey: string; region: string }) {
    super('') // Bedrock uses AWS credentials, not API key
    this.accessKeyId = credentials.accessKeyId
    this.secretAccessKey = credentials.secretAccessKey
    this.region = credentials.region
    
    this.client = new BedrockRuntimeClient({
      region: this.region,
      credentials: {
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
      },
    })
  }

  get id() {
    return 'aws'
  }

  get name() {
    return 'AWS Bedrock'
  }

  get models(): ModelInfo[] {
    return [
      {
        id: 'anthropic.claude-3-opus-20240229-v1:0',
        name: 'Claude 3 Opus (Bedrock)',
        provider: 'aws',
        contextLength: 200000,
        description: 'Claude 3 Opus via AWS Bedrock',
        capabilities: ['chat'],
      },
      {
        id: 'anthropic.claude-3-sonnet-20240229-v1:0',
        name: 'Claude 3 Sonnet (Bedrock)',
        provider: 'aws',
        contextLength: 200000,
        description: 'Claude 3 Sonnet via AWS Bedrock',
        capabilities: ['chat'],
      },
      {
        id: 'amazon.titan-text-express-v1',
        name: 'Titan Text Express',
        provider: 'aws',
        contextLength: 8192,
        description: 'Amazon\'s Titan model for text generation',
        capabilities: ['chat'],
      },
      {
        id: 'meta.llama3-70b-instruct-v1:0',
        name: 'Llama 3 70B',
        provider: 'aws',
        contextLength: 8192,
        description: 'Meta\'s Llama 3 70B model',
        capabilities: ['chat'],
      },
    ]
  }

  async *chat(
    messages: ChatMessage[],
    options: ChatOptions
  ): AsyncGenerator<ChatChunk> {
    try {
      // Different models have different payload formats
      const payload = this.formatPayload(options.model, messages, options)
      
      const command = new InvokeModelWithResponseStreamCommand({
        modelId: options.model,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(payload),
      })

      const response = await this.client.send(command)
      
      if (!response.body) {
        throw new Error('No response body')
      }

      let totalContent = ''

      for await (const chunk of response.body) {
        if (chunk.chunk?.bytes) {
          const decoded = JSON.parse(
            new TextDecoder().decode(chunk.chunk.bytes)
          )
          
          const content = this.extractContent(options.model, decoded)
          if (content) {
            yield {
              type: 'content',
              content,
            }
            totalContent += content
          }
        }
      }

      // Bedrock doesn't provide token usage in most cases
      yield {
        type: 'done',
        usage: {
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
        },
      }
    } catch (error) {
      yield this.handleError(error)
    }
  }

  private formatPayload(modelId: string, messages: ChatMessage[], options: ChatOptions): any {
    // Handle different model formats
    if (modelId.startsWith('anthropic.')) {
      return {
        messages: messages.map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        })),
        max_tokens: options.maxTokens || 4096,
        temperature: options.temperature,
        top_p: options.topP,
      }
    } else if (modelId.startsWith('amazon.titan')) {
      return {
        inputText: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        textGenerationConfig: {
          maxTokenCount: options.maxTokens || 4096,
          temperature: options.temperature,
          topP: options.topP,
        },
      }
    } else if (modelId.startsWith('meta.llama')) {
      return {
        prompt: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        max_gen_len: options.maxTokens || 4096,
        temperature: options.temperature,
        top_p: options.topP,
      }
    }
    
    throw new Error(`Unsupported model: ${modelId}`)
  }

  private extractContent(modelId: string, decoded: any): string | null {
    if (modelId.startsWith('anthropic.')) {
      return decoded.delta?.text || decoded.completion || null
    } else if (modelId.startsWith('amazon.titan')) {
      return decoded.outputText || null
    } else if (modelId.startsWith('meta.llama')) {
      return decoded.generation || null
    }
    
    return null
  }

  async validateApiKey(): Promise<boolean> {
    try {
      // Try to list available models
      const command = new InvokeModelWithResponseStreamCommand({
        modelId: 'amazon.titan-text-express-v1',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          inputText: 'Hi',
          textGenerationConfig: { maxTokenCount: 1 },
        }),
      })
      
      await this.client.send(command)
      return true
    } catch {
      return false
    }
  }
}