'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react'
import { getVaultManager } from '@/lib/crypto/vault'
import { useVaultStore } from '@/lib/stores/vault'

function VaultResetContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const vaultManager = getVaultManager()
  const { unlock } = useVaultStore()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [tokenValid, setTokenValid] = useState(false)

  useEffect(() => {
    verifyToken()
  }, [token])

  const verifyToken = async () => {
    if (!token) {
      setError('No reset token provided')
      setVerifying(false)
      return
    }

    try {
      const response = await fetch('/api/vault/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()
      
      if (data.valid) {
        setTokenValid(true)
      } else {
        setError(data.error || 'Invalid or expired token')
      }
    } catch (err) {
      setError('Failed to verify reset token')
    } finally {
      setVerifying(false)
    }
  }

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/vault/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token, 
          newPassword,
          apiKeys: {} // Start with empty vault
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Vault password reset successfully! You can now add your API keys.')
        
        // Automatically unlock the vault with new password
        unlock(newPassword, {})
        
        // Redirect to settings after 2 seconds
        setTimeout(() => {
          router.push('/settings')
        }, 2000)
      } else {
        setError(data.error || 'Failed to reset vault password')
      }
    } catch (err) {
      setError('Failed to reset vault password')
    } finally {
      setLoading(false)
    }
  }

  if (verifying) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verifying Reset Token</CardTitle>
            <CardDescription>Please wait while we verify your reset token...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Reset Token</CardTitle>
            <CardDescription>The reset token is invalid or has expired</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => router.push('/settings')}
                className="flex-1"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Settings
              </Button>
              <Button
                onClick={() => router.push('/chat')}
                className="flex-1"
              >
                Go to Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Vault Password</CardTitle>
          <CardDescription>
            Enter a new password for your vault. This will create a new empty vault.
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
            <Label htmlFor="new-password">New Vault Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter a strong password"
                disabled={loading || !!success}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading || !!success}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                disabled={loading || !!success}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading || !!success}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Password must be at least 6 characters long</p>
            <p>• This will create a new empty vault</p>
            <p>• You'll need to re-add all your API keys</p>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push('/settings')}
              disabled={loading}
              className="flex-1"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button
              onClick={handleResetPassword}
              disabled={loading || !newPassword || !confirmPassword || !!success}
              className="flex-1"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function VaultResetPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we load the reset page...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <VaultResetContent />
    </Suspense>
  )
}