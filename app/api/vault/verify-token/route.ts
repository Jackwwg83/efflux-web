import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
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

    // Check if token exists and is valid
    const { data, error } = await supabase
      .from('vault_reset_tokens')
      .select('*')
      .eq('user_id', user.id)
      .eq('token', token)
      .eq('used', false)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { valid: false, error: 'Invalid token' },
        { status: 400 }
      )
    }

    // Check if token is expired
    const now = new Date()
    const expiresAt = new Date(data.expires_at)
    
    if (now > expiresAt) {
      return NextResponse.json(
        { valid: false, error: 'Token has expired' },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      valid: true,
      message: 'Token is valid'
    })

  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    )
  }
}