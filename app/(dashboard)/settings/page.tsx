'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Eye, EyeOff, Check, X, AlertTriangle } from 'lucide-react'
import { getVaultManager } from '@/lib/crypto/vault'
import { getAIManager } from '@/lib/ai/manager'
import { useVaultStore } from '@/lib/stores/vault'
import { APIKeys } from '@/types/ai'

export default function SettingsPage() {
  const router = useRouter()
  const vaultManager = getVaultManager()
  const aiManager = getAIManager()
  const { unlock } = useVaultStore()

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [hasVault, setHasVault] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // API Keys state
  const [apiKeys, setApiKeys] = useState<APIKeys>({})
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})
  const [validationStatus, setValidationStatus] = useState<Record<string, boolean | null>>({})

  useEffect(() => {
    checkVaultStatus()
  }, [])

  const checkVaultStatus = async () => {
    const exists = await vaultManager.hasVault()
    setHasVault(exists)
  }

  const handleUnlock = async () => {
    if (!password) return
    
    setLoading(true)
    setError(null)
    
    try {
      const keys = await vaultManager.loadApiKeys(password)
      if (keys) {
        setApiKeys(keys)
        setIsUnlocked(true)
        aiManager.setApiKeys(keys)
        unlock(password, keys) // Update the store
        
        // Validate all keys
        await validateAllKeys(keys)
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Failed to decrypt vault')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateVault = async () => {
    if (!password) return
    
    setLoading(true)
    setError(null)
    
    try {
      await vaultManager.saveApiKeys({}, password)
      setHasVault(true)
      setIsUnlocked(true)
      setSuccess('Vault created successfully')
    } catch (err) {
      setError('Failed to create vault')
    } finally {
      setLoading(false)
    }
  }

  const validateAllKeys = async (keys: APIKeys) => {
    const status: Record<string, boolean | null> = {}
    
    for (const [provider, value] of Object.entries(keys)) {
      if (value) {
        status[provider] = null // Loading state
        setValidationStatus({ ...status })
        
        try {
          const isValid = await aiManager.validateProviderKey(provider as any)
          status[provider] = isValid
        } catch {
          status[provider] = false
        }
      }
    }
    
    setValidationStatus(status)
  }

  const handleSaveKey = async (provider: keyof APIKeys, value: any) => {
    if (!isUnlocked) return
    
    setLoading(true)
    setError(null)
    
    try {
      const updatedKeys = { ...apiKeys, [provider]: value }
      await vaultManager.saveApiKeys(updatedKeys, password)
      setApiKeys(updatedKeys)
      aiManager.setApiKeys(updatedKeys)
      
      // Validate the specific key
      if (value) {
        setValidationStatus(prev => ({ ...prev, [provider]: null }))
        const isValid = await aiManager.validateProviderKey(provider as any)
        setValidationStatus(prev => ({ ...prev, [provider]: isValid }))
      } else {
        setValidationStatus(prev => ({ ...prev, [provider]: null }))
      }
      
      setSuccess(`${provider} API key saved`)
    } catch (err) {
      setError(`Failed to save ${provider} API key`)
    } finally {
      setLoading(false)
    }
  }

  const toggleShowKey = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }))
  }

  const getValidationIcon = (provider: string) => {
    const status = validationStatus[provider]
    if (status === null) return null
    if (status === true) return <Check className="h-4 w-4 text-green-500" />
    return <X className="h-4 w-4 text-red-500" />
  }

  if (!hasVault || !isUnlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              {hasVault ? 'Unlock Vault' : 'Create Vault'}
            </CardTitle>
            <CardDescription>
              {hasVault 
                ? 'Enter your password to access your API keys' 
                : 'Create a secure vault to store your API keys'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Vault Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      hasVault ? handleUnlock() : handleCreateVault()
                    }
                  }}
                  placeholder="Enter a strong password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {!hasVault && (
                <p className="text-xs text-muted-foreground">
                  This password will be used to encrypt your API keys. Make sure to remember it!
                </p>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push('/chat')}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={hasVault ? handleUnlock : handleCreateVault}
                disabled={!password || loading}
                className="flex-1"
              >
                {loading ? 'Loading...' : hasVault ? 'Unlock' : 'Create'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center space-x-4">
        <Button variant="outline" onClick={() => router.push('/chat')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chat
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="openai" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="openai">OpenAI</TabsTrigger>
          <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
          <TabsTrigger value="aws">AWS Bedrock</TabsTrigger>
          <TabsTrigger value="azure">Azure</TabsTrigger>
        </TabsList>

        <TabsContent value="openai">
          <OpenAISettings
            apiKey={apiKeys.openai || ''}
            onSave={(key) => handleSaveKey('openai', key)}
            showKey={showKeys.openai}
            onToggleShow={() => toggleShowKey('openai')}
            validationIcon={getValidationIcon('openai')}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="anthropic">
          <AnthropicSettings
            apiKey={apiKeys.anthropic || ''}
            onSave={(key) => handleSaveKey('anthropic', key)}
            showKey={showKeys.anthropic}
            onToggleShow={() => toggleShowKey('anthropic')}
            validationIcon={getValidationIcon('anthropic')}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="google">
          <GoogleSettings
            apiKey={apiKeys.google || ''}
            onSave={(key) => handleSaveKey('google', key)}
            showKey={showKeys.google}
            onToggleShow={() => toggleShowKey('google')}
            validationIcon={getValidationIcon('google')}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="aws">
          <AWSSettings
            credentials={apiKeys.aws}
            onSave={(creds) => handleSaveKey('aws', creds)}
            validationIcon={getValidationIcon('aws')}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="azure">
          <AzureSettings
            config={apiKeys.azure}
            onSave={(config) => handleSaveKey('azure', config)}
            validationIcon={getValidationIcon('azure')}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Individual provider settings components
function OpenAISettings({ 
  apiKey, 
  onSave, 
  showKey, 
  onToggleShow, 
  validationIcon, 
  loading 
}: {
  apiKey: string
  onSave: (key: string) => void
  showKey?: boolean
  onToggleShow: () => void
  validationIcon: React.ReactNode
  loading: boolean
}) {
  const [tempKey, setTempKey] = useState(apiKey)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>OpenAI Configuration</span>
          {validationIcon}
        </CardTitle>
        <CardDescription>
          Configure your OpenAI API key to access GPT models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai-key">API Key</Label>
          <div className="relative">
            <Input
              id="openai-key"
              type={showKey ? 'text' : 'password'}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="sk-..."
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={onToggleShow}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <Button
          onClick={() => onSave(tempKey)}
          disabled={loading || tempKey === apiKey}
        >
          Save OpenAI Key
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline">OpenAI Platform</a></p>
        </div>
      </CardContent>
    </Card>
  )
}

function AnthropicSettings({ 
  apiKey, 
  onSave, 
  showKey, 
  onToggleShow, 
  validationIcon, 
  loading 
}: {
  apiKey: string
  onSave: (key: string) => void
  showKey?: boolean
  onToggleShow: () => void
  validationIcon: React.ReactNode
  loading: boolean
}) {
  const [tempKey, setTempKey] = useState(apiKey)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Anthropic Configuration</span>
          {validationIcon}
        </CardTitle>
        <CardDescription>
          Configure your Anthropic API key to access Claude models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="anthropic-key">API Key</Label>
          <div className="relative">
            <Input
              id="anthropic-key"
              type={showKey ? 'text' : 'password'}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="sk-ant-..."
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={onToggleShow}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <Button
          onClick={() => onSave(tempKey)}
          disabled={loading || tempKey === apiKey}
        >
          Save Anthropic Key
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>Get your API key from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="underline">Anthropic Console</a></p>
        </div>
      </CardContent>
    </Card>
  )
}

function GoogleSettings({ 
  apiKey, 
  onSave, 
  showKey, 
  onToggleShow, 
  validationIcon, 
  loading 
}: {
  apiKey: string
  onSave: (key: string) => void
  showKey?: boolean
  onToggleShow: () => void
  validationIcon: React.ReactNode
  loading: boolean
}) {
  const [tempKey, setTempKey] = useState(apiKey)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Google AI Configuration</span>
          {validationIcon}
        </CardTitle>
        <CardDescription>
          Configure your Google AI API key to access Gemini models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="google-key">API Key</Label>
          <div className="relative">
            <Input
              id="google-key"
              type={showKey ? 'text' : 'password'}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="AIza..."
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={onToggleShow}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <Button
          onClick={() => onSave(tempKey)}
          disabled={loading || tempKey === apiKey}
        >
          Save Google Key
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></p>
        </div>
      </CardContent>
    </Card>
  )
}

function AWSSettings({ 
  credentials, 
  onSave, 
  validationIcon, 
  loading 
}: {
  credentials?: { accessKeyId: string; secretAccessKey: string; region: string }
  onSave: (creds: { accessKeyId: string; secretAccessKey: string; region: string }) => void
  validationIcon: React.ReactNode
  loading: boolean
}) {
  const [accessKeyId, setAccessKeyId] = useState(credentials?.accessKeyId || '')
  const [secretAccessKey, setSecretAccessKey] = useState(credentials?.secretAccessKey || '')
  const [region, setRegion] = useState(credentials?.region || 'us-east-1')

  const hasChanges = accessKeyId !== (credentials?.accessKeyId || '') ||
                     secretAccessKey !== (credentials?.secretAccessKey || '') ||
                     region !== (credentials?.region || 'us-east-1')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>AWS Bedrock Configuration</span>
          {validationIcon}
        </CardTitle>
        <CardDescription>
          Configure your AWS credentials to access Bedrock models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="aws-access-key">Access Key ID</Label>
          <Input
            id="aws-access-key"
            type="password"
            value={accessKeyId}
            onChange={(e) => setAccessKeyId(e.target.value)}
            placeholder="AKIA..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aws-secret-key">Secret Access Key</Label>
          <Input
            id="aws-secret-key"
            type="password"
            value={secretAccessKey}
            onChange={(e) => setSecretAccessKey(e.target.value)}
            placeholder="Secret key..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="aws-region">Region</Label>
          <Input
            id="aws-region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="us-east-1"
          />
        </div>
        
        <Button
          onClick={() => onSave({ accessKeyId, secretAccessKey, region })}
          disabled={loading || !hasChanges || !accessKeyId || !secretAccessKey || !region}
        >
          Save AWS Credentials
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>Get your credentials from <a href="https://console.aws.amazon.com/iam/" target="_blank" rel="noopener noreferrer" className="underline">AWS IAM Console</a></p>
        </div>
      </CardContent>
    </Card>
  )
}

function AzureSettings({ 
  config, 
  onSave, 
  validationIcon, 
  loading 
}: {
  config?: { apiKey: string; endpoint: string; deploymentName: string }
  onSave: (config: { apiKey: string; endpoint: string; deploymentName: string }) => void
  validationIcon: React.ReactNode
  loading: boolean
}) {
  const [apiKey, setApiKey] = useState(config?.apiKey || '')
  const [endpoint, setEndpoint] = useState(config?.endpoint || '')
  const [deploymentName, setDeploymentName] = useState(config?.deploymentName || '')

  const hasChanges = apiKey !== (config?.apiKey || '') ||
                     endpoint !== (config?.endpoint || '') ||
                     deploymentName !== (config?.deploymentName || '')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Azure OpenAI Configuration</span>
          {validationIcon}
        </CardTitle>
        <CardDescription>
          Configure your Azure OpenAI service to access deployed models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="azure-key">API Key</Label>
          <Input
            id="azure-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Your Azure OpenAI key"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="azure-endpoint">Endpoint</Label>
          <Input
            id="azure-endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            placeholder="https://your-resource.openai.azure.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="azure-deployment">Deployment Name</Label>
          <Input
            id="azure-deployment"
            value={deploymentName}
            onChange={(e) => setDeploymentName(e.target.value)}
            placeholder="your-deployment-name"
          />
        </div>
        
        <Button
          onClick={() => onSave({ apiKey, endpoint, deploymentName })}
          disabled={loading || !hasChanges || !apiKey || !endpoint || !deploymentName}
        >
          Save Azure Config
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>Get your configuration from <a href="https://portal.azure.com/" target="_blank" rel="noopener noreferrer" className="underline">Azure Portal</a></p>
        </div>
      </CardContent>
    </Card>
  )
}