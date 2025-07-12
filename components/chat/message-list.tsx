'use client'

import { useEffect, useRef } from 'react'
import { Database } from '@/types/database'
import { MessageItem } from './message-item'
import { ScrollArea } from '@/components/ui/scroll-area'

type Message = Database['public']['Tables']['messages']['Row']

interface MessageListProps {
  messages: Message[]
  isStreaming?: boolean
  streamingMessageId?: string
}

export function MessageList({ 
  messages, 
  isStreaming = false, 
  streamingMessageId 
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Welcome to Efflux</h3>
          <p className="text-muted-foreground">
            Start a conversation with your AI assistant
          </p>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p>• Ask questions and get intelligent responses</p>
            <p>• Switch between different AI models</p>
            <p>• Your conversations are saved automatically</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            message={message}
            isStreaming={isStreaming && message.id === streamingMessageId}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}