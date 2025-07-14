import { CryptoUtils } from './utils'
import { createClient } from '@/lib/supabase/client'
import { VaultData, APIKeys } from '@/types/ai'

export class VaultManager {
  private supabase = createClient()
  
  // Save encrypted API keys
  async saveApiKeys(apiKeys: APIKeys, password: string): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const vaultData: VaultData = { apiKeys }
    const jsonData = JSON.stringify(vaultData)
    
    // Encrypt the data
    const { encrypted, salt, iv } = await CryptoUtils.encrypt(jsonData, password)
    
    // Save to database
    const { error } = await this.supabase
      .from('user_vault')
      .upsert({
        user_id: user.id,
        encrypted_data: encrypted,
        salt,
        iv,
        updated_at: new Date().toISOString(),
      })
    
    if (error) throw error
  }

  // Load and decrypt API keys
  async loadApiKeys(password: string): Promise<APIKeys | null> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Load from database
    const { data, error } = await this.supabase
      .from('user_vault')
      .select('*')
      .eq('user_id', user.id)
      .single()
    
    if (error || !data) return null
    
    try {
      // Decrypt the data
      const decrypted = await CryptoUtils.decrypt(
        data.encrypted_data,
        password,
        data.salt,
        data.iv
      )
      
      const vaultData: VaultData = JSON.parse(decrypted)
      return vaultData.apiKeys
    } catch (error) {
      // Wrong password or corrupted data
      console.error('Failed to decrypt vault:', error)
      return null
    }
  }

  // Check if vault exists
  async hasVault(): Promise<boolean> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) return false

    const { data } = await this.supabase
      .from('user_vault')
      .select('user_id')
      .eq('user_id', user.id)
      .single()
    
    return !!data
  }

  // Update single API key
  async updateApiKey(
    provider: keyof APIKeys,
    value: any,
    password: string
  ): Promise<void> {
    // Load current keys
    const currentKeys = await this.loadApiKeys(password)
    const updatedKeys = {
      ...currentKeys,
      [provider]: value,
    }
    
    // Save updated keys
    await this.saveApiKeys(updatedKeys, password)
  }

  // Remove API key
  async removeApiKey(
    provider: keyof APIKeys,
    password: string
  ): Promise<void> {
    // Load current keys
    const currentKeys = await this.loadApiKeys(password)
    if (!currentKeys) return
    
    // Remove the key
    delete currentKeys[provider]
    
    // Save updated keys
    await this.saveApiKeys(currentKeys, password)
  }

  // Clear all vault data
  async clearVault(): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { error } = await this.supabase
      .from('user_vault')
      .delete()
      .eq('user_id', user.id)
    
    if (error) throw error
  }

  // Reset vault with new password - requires email verification
  async requestVaultReset(): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user || !user.email) throw new Error('Not authenticated or no email')

    // Check if vault exists
    const hasVault = await this.hasVault()
    if (!hasVault) throw new Error('No vault found to reset')

    // Generate a reset token and save it
    const resetToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    
    const { error } = await this.supabase
      .from('vault_reset_tokens')
      .upsert({
        user_id: user.id,
        token: resetToken,
        expires_at: expiresAt.toISOString(),
        used: false,
      })
    
    if (error) throw error

    // Send reset email via API
    const response = await fetch('/api/vault/reset-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, token: resetToken }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to send reset email')
    }
  }

  // Verify reset token and allow password change
  async verifyResetToken(token: string): Promise<boolean> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await this.supabase
      .from('vault_reset_tokens')
      .select('*')
      .eq('user_id', user.id)
      .eq('token', token)
      .eq('used', false)
      .single()

    if (error || !data) return false

    // Check if token is expired
    const now = new Date()
    const expiresAt = new Date(data.expires_at)
    
    if (now > expiresAt) {
      return false
    }

    return true
  }

  // Reset vault with new password using verified token
  async resetVaultPassword(token: string, newPassword: string, newApiKeys: APIKeys = {}): Promise<void> {
    const { data: { user } } = await this.supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    // Verify token first
    const isValid = await this.verifyResetToken(token)
    if (!isValid) throw new Error('Invalid or expired reset token')

    // Clear old vault and create new one with new password
    await this.clearVault()
    await this.saveApiKeys(newApiKeys, newPassword)

    // Mark token as used
    const { error } = await this.supabase
      .from('vault_reset_tokens')
      .update({ used: true })
      .eq('token', token)
      .eq('user_id', user.id)

    if (error) throw error
  }
}

// Singleton instance
let vaultManagerInstance: VaultManager | null = null

export function getVaultManager(): VaultManager {
  if (!vaultManagerInstance) {
    vaultManagerInstance = new VaultManager()
  }
  return vaultManagerInstance
}