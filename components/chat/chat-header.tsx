'use client'

import { Database } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useVaultStore } from '@/lib/stores/vault'
import { AIManager } from '@/lib/ai/manager'
import { useMemo } from 'react'

type Conversation = Database['public']['Tables']['conversations']['Row']

interface ChatHeaderProps {
  conversation?: Conversation
  onModelChange?: (model: string, provider: string) => void
}

export function ChatHeader({ conversation, onModelChange }: ChatHeaderProps) {
  const router = useRouter()
  const { apiKeys } = useVaultStore()
  
  // Get available models based on configured API keys
  const availableModels = useMemo(() => {
    if (!apiKeys) return []
    
    const aiManager = new AIManager()
    aiManager.setApiKeys(apiKeys)
    return aiManager.getAvailableModels()
  }, [apiKeys])
  
  const currentModel = conversation?.settings.model || (availableModels[0]?.id || 'gpt-4')
  const currentProvider = conversation?.settings.provider || (availableModels[0]?.provider || 'openai')

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
        {availableModels.length > 0 ? (
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
        ) : (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>No API keys configured</span>
          </div>
        )}
        
        <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}