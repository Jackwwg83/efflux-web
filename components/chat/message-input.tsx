'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  isStreaming?: boolean
  onStopStreaming?: () => void
}

export function MessageInput({
  onSendMessage,
  disabled = false,
  isStreaming = false,
  onStopStreaming,
}: MessageInputProps) {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🔵 MessageInput handleSubmit called:', {
      message: message.trim(),
      disabled,
      isStreaming,
      messageLength: message.trim().length
    })
    
    if (message.trim() && !disabled && !isStreaming) {
      console.log('✅ Calling onSendMessage with:', message.trim())
      onSendMessage(message.trim())
      setMessage('')
    } else {
      console.log('❌ Message not sent due to conditions:', {
        hasMessage: !!message.trim(),
        notDisabled: !disabled,
        notStreaming: !isStreaming
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (!isStreaming && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isStreaming])

  return (
    <div className="border-t bg-background p-4">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <div className="flex-1">
          <Input
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              disabled
                ? 'Please configure your API keys first...'
                : isStreaming
                ? 'AI is responding...'
                : 'Type your message...'
            }
            disabled={disabled || isStreaming}
            className="resize-none"
          />
        </div>
        {isStreaming && onStopStreaming ? (
          <Button
            type="button"
            onClick={onStopStreaming}
            variant="outline"
            size="icon"
            className="shrink-0"
          >
            <StopCircle className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!message.trim() || disabled || isStreaming}
            size="icon"
            className="shrink-0"
          >
            {isStreaming ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        )}
      </form>
    </div>
  )
}