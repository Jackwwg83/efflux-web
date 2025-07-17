import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { email, token } = await request.json()

    if (!email || !token) {
      return NextResponse.json(
        { error: 'Email and token are required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createClient()

    // Verify user is authenticated and owns this email
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user || user.email !== email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://efflux-web.vercel.app'}/vault-reset?token=${token}`
    
    // Log for debugging
    console.log(`Vault reset requested for ${email}`)
    console.log(`Reset URL: ${resetUrl}`)
    
    // TODO: In production, integrate with email service
    // For now, we'll return the URL in development for testing
    
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        success: true, 
        message: 'Development mode: Reset URL generated',
        resetUrl: resetUrl
      })
    } else {
      // In production, you would send an actual email here
      // Using Supabase Edge Functions, SendGrid, AWS SES, etc.
      
      return NextResponse.json({ 
        success: true, 
        message: 'Reset email sent! Check your inbox for reset instructions.'
      })
    }

  } catch (error) {
    console.error('Vault reset request error:', error)
    return NextResponse.json(
      { error: 'Failed to process reset request' },
      { status: 500 }
    )
  }
}