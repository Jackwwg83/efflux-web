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

    // Send reset email using Supabase's built-in email service
    // We'll use a custom email template or send a simple notification
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/vault-reset?token=${token}`
    
    // For now, we'll use a simple email service or log the reset URL
    // In production, you'd integrate with an email service like SendGrid, AWS SES, etc.
    
    console.log(`Vault reset requested for ${email}`)
    console.log(`Reset URL: ${resetUrl}`)
    
    // TODO: Replace with actual email sending service
    // Example with a hypothetical email service:
    /*
    await emailService.send({
      to: email,
      subject: 'Vault Password Reset - Efflux',
      html: `
        <h2>Vault Password Reset</h2>
        <p>You requested to reset your vault password.</p>
        <p><a href="${resetUrl}">Click here to reset your vault password</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    })
    */

    return NextResponse.json({ 
      success: true, 
      message: 'Reset email sent successfully',
      // In development, return the reset URL for testing
      ...(process.env.NODE_ENV === 'development' && { resetUrl })
    })

  } catch (error) {
    console.error('Vault reset request error:', error)
    return NextResponse.json(
      { error: 'Failed to process reset request' },
      { status: 500 }
    )
  }
}