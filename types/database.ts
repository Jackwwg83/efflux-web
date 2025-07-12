// Database types
export interface Database {
  public: {
    Tables: {
      user_settings: {
        Row: {
          id: string
          user_id: string
          default_model: string
          default_provider: string
          preferences: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          default_model?: string
          default_provider?: string
          preferences?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          default_model?: string
          default_provider?: string
          preferences?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
      }
      user_vault: {
        Row: {
          user_id: string
          encrypted_data: string
          salt: string
          iv: string
          updated_at: string
        }
        Insert: {
          user_id: string
          encrypted_data: string
          salt: string
          iv: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          encrypted_data?: string
          salt?: string
          iv?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string
          title: string
          summary: string | null
          last_message_at: string
          settings: {
            model: string
            provider: string
            [key: string]: any
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          summary?: string | null
          last_message_at?: string
          settings?: {
            model: string
            provider: string
            [key: string]: any
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          summary?: string | null
          last_message_at?: string
          settings?: {
            model: string
            provider: string
            [key: string]: any
          }
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          role: 'user' | 'assistant' | 'system' | 'tool'
          content: string | null
          tool_calls: any | null
          tool_results: any | null
          tokens: {
            prompt: number
            completion: number
          } | null
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: 'user' | 'assistant' | 'system' | 'tool'
          content?: string | null
          tool_calls?: any | null
          tool_results?: any | null
          tokens?: {
            prompt: number
            completion: number
          } | null
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: 'user' | 'assistant' | 'system' | 'tool'
          content?: string | null
          tool_calls?: any | null
          tool_results?: any | null
          tokens?: {
            prompt: number
            completion: number
          } | null
          created_at?: string
        }
      }
      prompt_templates: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          content: string
          variables: Array<{
            name: string
            description?: string
            default?: string
          }>
          category: string | null
          is_public: boolean
          usage_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          content: string
          variables?: Array<{
            name: string
            description?: string
            default?: string
          }>
          category?: string | null
          is_public?: boolean
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          content?: string
          variables?: Array<{
            name: string
            description?: string
            default?: string
          }>
          category?: string | null
          is_public?: boolean
          usage_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      mcp_servers: {
        Row: {
          id: string
          user_id: string
          name: string
          command: string
          args: string[]
          env: Record<string, string>
          is_active: boolean
          last_used_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          command: string
          args?: string[]
          env?: Record<string, string>
          is_active?: boolean
          last_used_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          command?: string
          args?: string[]
          env?: Record<string, string>
          is_active?: boolean
          last_used_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}