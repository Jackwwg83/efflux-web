'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, StopCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TemplateSelector } from '@/components/prompts/TemplateSelector'
import { PromptTemplate } from '@/types/database'

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

  const handleTemplateSelect = (template: PromptTemplate, processedContent: string) => {
    setMessage(processedContent)
    // 自动聚焦到输入框，方便用户继续编辑
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // 添加键盘快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault()
        // 触发模板选择器打开
        // 这个功能将在 TemplateSelector 组件中实现
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

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
        
        <TemplateSelector
          onSelectTemplate={handleTemplateSelect}
          disabled={disabled || isStreaming}
        />
        
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