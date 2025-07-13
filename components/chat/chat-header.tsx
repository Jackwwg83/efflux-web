'use client'

import { Database } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Bot } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useVaultStore } from '@/lib/stores/vault'
import { AIManager } from '@/lib/ai/manager'
import { useMemo, useState } from 'react'

type Conversation = Database['public']['Tables']['conversations']['Row']

interface ChatHeaderProps {
  conversation?: Conversation
  onModelChange?: (model: string, provider: string) => void
}

export function ChatHeader({ conversation, onModelChange }: ChatHeaderProps) {
  const router = useRouter()
  const { apiKeys, isUnlocked } = useVaultStore()
  const [isLoadingModels, setIsLoadingModels] = useState(false)
  
  // Get available models based on configured API keys
  const availableModels = useMemo(() => {
    console.log('=== ChatHeader Debug ===')
    console.log('isUnlocked:', isUnlocked)
    console.log('apiKeys:', apiKeys)
    
    if (!apiKeys) {
      console.log('No apiKeys found')
      return []
    }
    
    console.log('API Keys available:', Object.keys(apiKeys))
    
    const aiManager = new AIManager()
    aiManager.setApiKeys(apiKeys)
    
    // Start with sync models (fallback/cached)
    const syncModels = aiManager.getAvailableModelsSync()
    console.log('Sync models loaded:', syncModels.length, syncModels)
    
    // Load async models in background
    if (!isLoadingModels) {
      setIsLoadingModels(true)
      console.log('Starting async model loading...')
      
      aiManager.getAvailableModels().then(asyncModels => {
        console.log('Async models loaded:', asyncModels.length, asyncModels)
        setIsLoadingModels(false)
        // Force re-render by updating a state
        // The useMemo will pick up the new models automatically
      }).catch(error => {
        console.error('Failed to load dynamic models:', error)
        setIsLoadingModels(false)
      })
    }
    
    return syncModels
  }, [apiKeys, isLoadingModels, isUnlocked])
  
  const currentModel = conversation?.settings.model || (availableModels[0]?.id || 'gpt-4')
  const currentProvider = conversation?.settings.provider || (availableModels[0]?.provider || 'openai')

  const handleSettingsClick = () => {
    router.push('/settings')
  }

  // Check vault status and provide appropriate message
  const getStatusMessage = () => {
    if (!isUnlocked) {
      return "Vault locked - click settings to unlock"
    }
    if (!apiKeys || Object.keys(apiKeys).length === 0) {
      return "No API keys configured"
    }
    return null
  }

  const statusMessage = getStatusMessage()

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
        {statusMessage ? (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>{statusMessage}</span>
          </div>
        ) : availableModels.length > 0 ? (
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
            <span>No models available</span>
          </div>
        )}
        
        <Button variant="ghost" size="icon" onClick={handleSettingsClick}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}