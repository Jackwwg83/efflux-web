'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/types/database'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { PlusIcon, LogOut, Settings, MessageSquare } from 'lucide-react'

type Conversation = Database['public']['Tables']['conversations']['Row']

interface SidebarProps {
  conversations: Conversation[]
  currentConversationId?: string
  onConversationSelect: (id: string) => void
  onNewConversation: () => void
}

export function Sidebar({
  conversations,
  currentConversationId,
  onConversationSelect,
  onNewConversation,
}: SidebarProps) {
  const supabase = createClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="flex h-full w-64 flex-col bg-muted/50">
      {/* Header */}
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">Efflux</h1>
        <Button
          onClick={onNewConversation}
          className="mt-2 w-full"
          variant="outline"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-4 text-center text-muted-foreground">
            <MessageSquare className="h-8 w-8 mb-2" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs">Start a new chat to begin</p>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onConversationSelect(conversation.id)}
                className={`w-full rounded-lg p-3 text-left text-sm hover:bg-accent transition-colors ${
                  currentConversationId === conversation.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="truncate font-medium">{conversation.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {new Date(conversation.created_at).toLocaleDateString()}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => router.push('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}