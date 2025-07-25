'use client'

import { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/database'
import { Sidebar } from '@/components/chat/sidebar'
import { MessageList } from '@/components/chat/message-list'
import { MessageInput } from '@/components/chat/message-input'
import { ChatHeader } from '@/components/chat/chat-header'
import { getVaultManager } from '@/lib/crypto/vault'
import { useVaultStore } from '@/lib/stores/vault'
import { useRouter } from 'next/navigation'

type Conversation = Database['public']['Tables']['conversations']['Row']
type Message = Database['public']['Tables']['messages']['Row']

export default function ChatPage() {
  const router = useRouter()
  const supabase = createClient()
  const queryClient = useQueryClient()
  const vaultManager = getVaultManager()
  const { isUnlocked, password, unlock, apiKeys } = useVaultStore()

  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const [pendingMessage, setPendingMessage] = useState<string | null>(null)

  // Debug vault store state
  useEffect(() => {
    console.log('🔍 Vault Store Debug:', {
      isUnlocked,
      hasPassword: !!password,
      hasApiKeys: !!apiKeys,
      apiKeysType: typeof apiKeys,
      apiKeysKeys: apiKeys ? Object.keys(apiKeys) : 'null',
      storeState: useVaultStore.getState()
    })
  }, [isUnlocked, password, apiKeys])

  // Debug auth state
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      console.log('🔐 Auth Debug:', {
        user: user ? { id: user.id, email: user.email } : null,
        error: error?.message,
        sessionValid: !!user
      })
    }
    checkAuth()
  }, [])

  // Check if user has vault and redirect if needed
  useEffect(() => {
    const checkVaultStatus = async () => {
      const hasVault = await vaultManager.hasVault()
      
      if (!hasVault) {
        // No vault at all - redirect to settings to create one
        router.push('/settings')
      } else if (!isUnlocked) {
        // Has vault but not unlocked - redirect to settings to unlock
        router.push('/settings?action=unlock')
      }
    }
    
    checkVaultStatus()
  }, [isUnlocked, router])

  // Load conversations
  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      console.log('🗂️ Loading conversations...')
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .order('last_message_at', { ascending: false })
      
      if (error) {
        console.error('❌ Conversations query error:', error)
        throw error
      }
      console.log('✅ Conversations loaded:', data?.length || 0)
      return data as Conversation[]
    },
  })

  // Load messages for current conversation
  const { data: messages = [] } = useQuery({
    queryKey: ['messages', currentConversationId],
    queryFn: async () => {
      if (!currentConversationId) return []
      
      console.log('🔄 Loading messages for conversation:', currentConversationId)
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', currentConversationId)
        .order('created_at', { ascending: true })
      
      if (error) {
        console.error('❌ Messages query error:', error)
        throw error
      }
      console.log('📬 Messages loaded:', data?.length || 0, data?.map(m => ({
        id: m.id,
        role: m.role,
        content: m.content,
        contentLength: m.content?.length || 0,
        created_at: m.created_at
      })))
      return data as Message[]
    },
    enabled: !!currentConversationId,
  })

  // Create new conversation
  const createConversationMutation = useMutation({
    mutationFn: async () => {
      // Get current vault and determine best default model
      let defaultModel = 'gpt-4'
      let defaultProvider = 'openai'
      
      if (password) {
        try {
          const apiKeys = await vaultManager.loadApiKeys(password)
          if (apiKeys) {
            // Prefer Google Gemini 2.5-flash if available
            if (apiKeys.google) {
              defaultModel = 'gemini-2.5-flash'
              defaultProvider = 'google'
            } else if (apiKeys.anthropic) {
              defaultModel = 'claude-3-5-sonnet-20241022'
              defaultProvider = 'anthropic'
            } else if (apiKeys.openai) {
              defaultModel = 'gpt-4'
              defaultProvider = 'openai'
            }
          }
        } catch (error) {
          console.warn('Failed to load API keys for default model selection:', error)
        }
      }
      
      console.log(`📝 Creating new conversation with model: ${defaultModel}, provider: ${defaultProvider}`)
      
      // Get current user for RLS compliance
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }
      
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id, // Required for RLS policy
          title: 'New Conversation',
          settings: {
            model: defaultModel,
            provider: defaultProvider,
          },
        })
        .select()
        .single()
      
      if (error) {
        console.error('❌ Failed to create conversation:', error)
        throw error
      }
      console.log('✅ Conversation created:', data.id)
      return data as Conversation
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      setCurrentConversationId(data.id)
      
      // Send pending message if there is one
      if (pendingMessage) {
        // Small delay to ensure conversation is set
        setTimeout(() => {
          sendMessageMutation.mutate({ message: pendingMessage })
          setPendingMessage(null)
        }, 100)
      }
    },
  })

  // Send message
  const sendMessageMutation = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      console.log('📝 sendMessageMutation starting:', { message, currentConversationId })
      if (!currentConversationId) throw new Error('No conversation selected')
      
      // Add user message to database
      console.log('💾 Saving user message to database...')
      const { data: userMessage, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversationId,
          role: 'user',
          content: message,
        })
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error saving user message:', error)
        throw error
      }
      console.log('✅ User message saved:', userMessage)
      return userMessage as Message
    },
    onSuccess: (userMessage) => {
      console.log('🎉 sendMessageMutation onSuccess called:', userMessage)
      queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] })
      
      // Start streaming AI response
      console.log('🚀 Starting streamAIResponse...')
      streamAIResponse(userMessage.content!)
    },
    onError: (error) => {
      console.error('❌ sendMessageMutation error:', error)
    },
  })

  const streamAIResponse = async (userMessage: string) => {
    console.log('🔄 streamAIResponse called:', { userMessage, currentConversationId })
    if (!currentConversationId) return
    
    // Check if we have API keys available
    const { apiKeys } = useVaultStore.getState()
    console.log('🔑 API keys check:', { hasApiKeys: !!apiKeys, apiKeysCount: apiKeys ? Object.keys(apiKeys).length : 0 })
    if (!apiKeys) {
      console.error('No API keys available')
      router.push('/settings?action=unlock')
      return
    }
    
    console.log('🎬 Starting streaming process...')
    setIsStreaming(true)
    const controller = new AbortController()
    setAbortController(controller)
    
    try {
      // Create placeholder assistant message
      console.log('📝 Creating assistant message placeholder...')
      const { data: assistantMessage, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: currentConversationId,
          role: 'assistant',
          content: '',
        })
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error creating assistant message:', error)
        throw error
      }
      console.log('✅ Assistant message created:', assistantMessage)
      
      setStreamingMessageId(assistantMessage.id)
      queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] })
      
      // Stream from API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-api-keys': JSON.stringify(apiKeys),
        },
        body: JSON.stringify({
          conversationId: currentConversationId,
          message: userMessage,
        }),
        signal: controller.signal,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get AI response')
      }
      
      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')
      
      let fullContent = ''
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        
        const chunk = new TextDecoder().decode(value)
        console.log('📦 Raw chunk received:', chunk)
        const lines = chunk.split('\n').filter(line => line.trim())
        console.log('📝 Parsed lines:', lines)
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6).trim()
              console.log('🔍 Parsing JSON:', jsonStr)
              const data = JSON.parse(jsonStr)
              console.log('✅ Parsed data:', data)
              
              if (data.type === 'content') {
                fullContent += data.content
                console.log('💬 Updated content:', fullContent)
                
                // Update message in database
                console.log('💾 Updating message in database:', assistantMessage.id)
                const { data: updateResult, error: updateError } = await supabase
                  .from('messages')
                  .update({ content: fullContent })
                  .eq('id', assistantMessage.id)
                  .select()
                
                if (updateError) {
                  console.error('❌ Error updating message:', updateError)
                } else {
                  console.log('✅ Message updated in database, result:', updateResult)
                }
                
                console.log('🔄 Invalidating queries...')
                queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] })
              } else if (data.type === 'done') {
                console.log('🏁 Stream completed, final content:', fullContent)
                // Final update with token usage
                if (data.usage) {
                  await supabase
                    .from('messages')
                    .update({
                      content: fullContent,
                      tokens: data.usage,
                    })
                    .eq('id', assistantMessage.id)
                  
                  queryClient.invalidateQueries({ queryKey: ['messages', currentConversationId] })
                }
                break
              } else if (data.type === 'error') {
                console.error('❌ Stream error:', data.error)
                throw new Error(data.error)
              }
            } catch (e) {
              console.error('❌ Error parsing SSE data:', e, 'Line:', line)
            }
          }
        }
      }
      
      // Update conversation title if it's the first message
      if (messages.length === 0) {
        const title = userMessage.length > 50 
          ? userMessage.substring(0, 50) + '...' 
          : userMessage
        
        await supabase
          .from('conversations')
          .update({ title, last_message_at: new Date().toISOString() })
          .eq('id', currentConversationId)
        
        queryClient.invalidateQueries({ queryKey: ['conversations'] })
      }
      
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Stream aborted')
      } else {
        console.error('Error streaming AI response:', error)
        // Show error to user
        if (error.message.includes('not configured')) {
          router.push('/settings')
        }
      }
    } finally {
      setIsStreaming(false)
      setStreamingMessageId(null)
      setAbortController(null)
    }
  }

  const handleStopStreaming = () => {
    if (abortController) {
      abortController.abort()
      setIsStreaming(false)
      setStreamingMessageId(null)
      setAbortController(null)
    }
  }

  const handleNewConversation = useCallback(() => {
    createConversationMutation.mutate()
  }, [createConversationMutation])

  const handleConversationSelect = useCallback((id: string) => {
    setCurrentConversationId(id)
  }, [])

  const handleSendMessage = useCallback((message: string) => {
    console.log('🟡 ChatPage handleSendMessage called:', {
      message,
      currentConversationId,
      isUnlocked,
      hasApiKeys: !!apiKeys
    })
    
    if (!currentConversationId) {
      console.log('📝 No conversation, storing message and creating new conversation')
      // Store the message and create new conversation
      setPendingMessage(message)
      createConversationMutation.mutate()
      return
    }
    
    console.log('💬 Sending message to existing conversation:', currentConversationId)
    sendMessageMutation.mutate({ message })
  }, [currentConversationId, createConversationMutation, sendMessageMutation, apiKeys])

  const currentConversation = conversations.find(c => c.id === currentConversationId)

  // Show unlock prompt if not unlocked
  if (!isUnlocked) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Vault Locked</h2>
          <p className="text-muted-foreground mb-4">
            Please go to settings to unlock your vault
          </p>
          <button
            onClick={() => router.push('/settings')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Go to Settings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        conversations={conversations}
        currentConversationId={currentConversationId || undefined}
        onConversationSelect={handleConversationSelect}
        onNewConversation={handleNewConversation}
      />
      
      <div className="flex flex-1 flex-col">
        <ChatHeader
          conversation={currentConversation}
          onModelChange={async (model, provider) => {
            if (!currentConversationId) return
            
            console.log(`🔄 Updating conversation model to: ${model} (${provider})`)
            
            try {
              const { error } = await supabase
                .from('conversations')
                .update({
                  settings: {
                    model,
                    provider,
                  },
                })
                .eq('id', currentConversationId)
              
              if (error) {
                console.error('❌ Failed to update conversation settings:', error)
              } else {
                console.log('✅ Conversation settings updated')
                // Invalidate queries to refresh the UI
                queryClient.invalidateQueries({ queryKey: ['conversations'] })
              }
            } catch (error) {
              console.error('❌ Error updating conversation settings:', error)
            }
          }}
        />
        
        <MessageList
          messages={messages}
          isStreaming={isStreaming}
          streamingMessageId={streamingMessageId || undefined}
        />
        
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={!isUnlocked}
          isStreaming={isStreaming}
          onStopStreaming={handleStopStreaming}
        />
        
        {/* Debug info */}
        <div className="p-2 text-xs text-gray-500 border-t">
          Debug: isUnlocked={isUnlocked.toString()}, hasApiKeys={!!apiKeys}, 
          currentConversationId={currentConversationId || 'none'}
        </div>
      </div>
    </div>
  )
}