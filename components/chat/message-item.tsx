'use client'

import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Database } from '@/types/database'
import { User, Bot, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

type Message = Database['public']['Tables']['messages']['Row']

interface MessageItemProps {
  message: Message
  isStreaming?: boolean
}

function MessageItemComponent({ message, isStreaming = false }: MessageItemProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'
  const isAssistant = message.role === 'assistant'

  const handleCopy = async () => {
    if (message.content) {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!message.content && !isStreaming) {
    return null
  }

  return (
    <div className={`group flex w-full gap-4 p-4 ${
      isUser ? 'bg-muted/50' : 'bg-background'
    }`}>
      {/* Avatar */}
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md">
        {isUser ? (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-primary text-primary-foreground">
            <User className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-secondary text-secondary-foreground">
            <Bot className="h-4 w-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">
            {isUser ? 'You' : 'Assistant'}
          </div>
          {isAssistant && message.content && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>

        <div className="text-sm">
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    const inline = !match
                    return !inline ? (
                      <pre className="overflow-x-auto rounded-md bg-muted p-2">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code
                        className="rounded bg-muted px-1 py-0.5 text-sm"
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => (
                    <div className="overflow-x-auto">{children}</div>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
          
          {isStreaming && (
            <div className="mt-2 flex items-center space-x-1 text-xs text-muted-foreground">
              <div className="h-1 w-1 animate-pulse rounded-full bg-current" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-current animation-delay-200" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-current animation-delay-400" />
              <span>AI is thinking...</span>
            </div>
          )}
        </div>

        {/* Token usage */}
        {message.tokens && (
          <div className="text-xs text-muted-foreground">
            Tokens: {message.tokens.prompt || 0} + {message.tokens.completion || 0} = {(message.tokens.prompt || 0) + (message.tokens.completion || 0)}
          </div>
        )}
      </div>
    </div>
  )
}

export const MessageItem = memo(MessageItemComponent)