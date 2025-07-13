'use client'

import { Database } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Conversation = Database['public']['Tables']['conversations']['Row']

interface ChatHeaderProps {
  conversation?: Conversation
  onModelChange?: (model: string, provider: string) => void
}

// Available models - TODO: load from AI manager
const availableModels = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
  { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', provider: 'anthropic' },
  { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet', provider: 'anthropic' },
  { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro', provider: 'google' },
]

export function ChatHeader({ conversation, onModelChange }: ChatHeaderProps) {
  const router = useRouter()
  const currentModel = conversation?.settings.model || 'gpt-4'
  const currentProvider = conversation?.settings.provider || 'openai'

  const handleSettingsClick = () => {
    router.push('/settings')
  }

  return (
    <div className="flex items-center justify-between border-b bg-background p-4">
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <Bot className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">
            {conversation?.title || 'New Conversation'}
          </h2>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Select
          value={currentModel}
          onValueChange={(value) => {
            const model = availableModels.find(m => m.id === value)
            if (model && onModelChange) {
              onModelChange(model.id, model.provider)
            }
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span>{model.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {model.provider}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}