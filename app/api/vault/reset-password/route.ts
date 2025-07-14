import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getVaultManager } from '@/lib/crypto/vault'

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword, apiKeys = {} } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient()

    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Use VaultManager to reset password
    const vaultManager = getVaultManager()
    
    try {
      await vaultManager.resetVaultPassword(token, newPassword, apiKeys)
      
      return NextResponse.json({ 
        success: true,
        message: 'Vault password reset successfully'
      })
    } catch (vaultError: any) {
      return NextResponse.json(
        { error: vaultError.message || 'Failed to reset vault password' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Vault password reset error:', error)
    return NextResponse.json(
      { error: 'Failed to reset vault password' },
      { status: 500 }
    )
  }
}