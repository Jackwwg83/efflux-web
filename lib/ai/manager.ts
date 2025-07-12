import { BaseAIProvider } from './base'
import { OpenAIProvider } from './providers/openai'
import { AnthropicProvider } from './providers/anthropic'
import { GoogleProvider } from './providers/google'
import { BedrockProvider } from './providers/bedrock'
import { AzureOpenAIProvider } from './providers/azure'
import { AIProvider, APIKeys, ChatMessage, ChatOptions, ChatChunk, ModelInfo } from '@/types/ai'

export class AIManager {
  private providers: Map<AIProvider, BaseAIProvider | null> = new Map()

  constructor() {
    // Initialize with null providers
    this.providers.set('openai', null)
    this.providers.set('anthropic', null)
    this.providers.set('google', null)
    this.providers.set('aws', null)
    this.providers.set('azure', null)
  }

  // Set API keys and initialize providers
  setApiKeys(apiKeys: APIKeys) {
    if (apiKeys.openai) {
      this.providers.set('openai', new OpenAIProvider(apiKeys.openai))
    }

    if (apiKeys.anthropic) {
      this.providers.set('anthropic', new AnthropicProvider(apiKeys.anthropic))
    }

    if (apiKeys.google) {
      this.providers.set('google', new GoogleProvider(apiKeys.google))
    }

    if (apiKeys.aws) {
      this.providers.set('aws', new BedrockProvider(apiKeys.aws))
    }

    if (apiKeys.azure) {
      this.providers.set('azure', new AzureOpenAIProvider(apiKeys.azure))
    }
  }

  // Get all available models
  getAvailableModels(): ModelInfo[] {
    const models: ModelInfo[] = []
    
    for (const provider of this.providers.values()) {
      if (provider) {
        models.push(...provider.models)
      }
    }
    
    return models
  }

  // Get models for a specific provider
  getProviderModels(providerId: AIProvider): ModelInfo[] {
    const provider = this.providers.get(providerId)
    return provider ? provider.models : []
  }

  // Check if a provider is available
  isProviderAvailable(providerId: AIProvider): boolean {
    return this.providers.get(providerId) !== null
  }

  // Validate API key for a provider
  async validateProviderKey(providerId: AIProvider): Promise<boolean> {
    const provider = this.providers.get(providerId)
    if (!provider) return false
    
    try {
      return await provider.validateApiKey()
    } catch {
      return false
    }
  }

  // Chat with a specific model
  async *chat(
    providerId: AIProvider,
    messages: ChatMessage[],
    options: ChatOptions
  ): AsyncGenerator<ChatChunk> {
    const provider = this.providers.get(providerId)
    
    if (!provider) {
      yield {
        type: 'error',
        error: `Provider ${providerId} not configured`,
      }
      return
    }

    yield* provider.chat(messages, options)
  }

  // Get provider info
  getProviderInfo(providerId: AIProvider): { id: string; name: string } | null {
    const provider = this.providers.get(providerId)
    if (!provider) return null
    
    return {
      id: provider.id,
      name: provider.name,
    }
  }

  // Get all configured providers
  getConfiguredProviders(): AIProvider[] {
    const configured: AIProvider[] = []
    
    for (const [id, provider] of this.providers.entries()) {
      if (provider) {
        configured.push(id)
      }
    }
    
    return configured
  }
}

// Singleton instance
let aiManagerInstance: AIManager | null = null

export function getAIManager(): AIManager {
  if (!aiManagerInstance) {
    aiManagerInstance = new AIManager()
  }
  return aiManagerInstance
}