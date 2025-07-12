// AI Provider types
export type AIProvider = 'openai' | 'anthropic' | 'google' | 'aws' | 'azure'

export interface ModelInfo {
  id: string
  name: string
  provider: AIProvider
  contextLength: number
  description?: string
  capabilities?: string[]
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  tool_calls?: ToolCall[]
  tool_call_id?: string
}

export interface ToolCall {
  id: string
  type: 'function'
  function: {
    name: string
    arguments: string
  }
}

export interface ChatOptions {
  model: string
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
  stop?: string[]
  tools?: Tool[]
  toolChoice?: 'auto' | 'none' | { type: 'function'; function: { name: string } }
}

export interface Tool {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: Record<string, any>
  }
}

export interface ChatChunk {
  type: 'content' | 'tool_call' | 'error' | 'done'
  content?: string
  tool_call?: ToolCall
  error?: string
  usage?: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
}

// API Key types
export interface APIKeys {
  openai?: string
  anthropic?: string
  google?: string
  aws?: {
    accessKeyId: string
    secretAccessKey: string
    region: string
  }
  azure?: {
    apiKey: string
    endpoint: string
    deploymentName: string
  }
}

// Encrypted vault data
export interface VaultData {
  apiKeys: APIKeys
  // Future: other sensitive data
}