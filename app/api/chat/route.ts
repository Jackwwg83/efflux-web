import { createClient } from '@/lib/supabase/server'
import { getVaultManager } from '@/lib/crypto/vault'
import { getAIManager } from '@/lib/ai/manager'
import { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { conversationId, message } = await request.json()

    if (!conversationId || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get conversation settings
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .eq('user_id', user.id)
      .single()

    if (convError || !conversation) {
      return new Response(JSON.stringify({ error: 'Conversation not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get conversation history
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (msgError) {
      return new Response(JSON.stringify({ error: 'Failed to load messages' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Prepare messages for AI
    const chatMessages = messages.map(msg => ({
      role: msg.role as any,
      content: msg.content || '',
    }))

    // Add the new user message
    chatMessages.push({
      role: 'user',
      content: message,
    })

    // Get user's password from headers (you'll need to pass this from frontend)
    const userPassword = headers().get('x-vault-password')
    if (!userPassword) {
      return new Response(JSON.stringify({ error: 'Vault password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Load API keys
    const vaultManager = getVaultManager()
    const apiKeys = await vaultManager.loadApiKeys(userPassword)
    
    if (!apiKeys) {
      return new Response(JSON.stringify({ error: 'Failed to decrypt API keys' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Initialize AI manager
    const aiManager = getAIManager()
    aiManager.setApiKeys(apiKeys)

    const provider = conversation.settings.provider as any
    const model = conversation.settings.model

    if (!aiManager.isProviderAvailable(provider)) {
      return new Response(JSON.stringify({ error: `Provider ${provider} not configured` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Create streaming response
    const encoder = new TextEncoder()
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const chatStream = aiManager.chat(provider, chatMessages, {
            model,
            temperature: 0.7,
            maxTokens: 4000,
          })

          for await (const chunk of chatStream) {
            const data = `data: ${JSON.stringify(chunk)}\n\n`
            controller.enqueue(encoder.encode(data))

            // If this is an error or done chunk, we can break
            if (chunk.type === 'error' || chunk.type === 'done') {
              break
            }
          }
        } catch (error) {
          const errorChunk = {
            type: 'error',
            error: error instanceof Error ? error.message : 'Unknown error',
          }
          const data = `data: ${JSON.stringify(errorChunk)}\n\n`
          controller.enqueue(encoder.encode(data))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Internal server error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}