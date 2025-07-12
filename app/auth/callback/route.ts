import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')

  if (error) {
    console.error('OAuth error:', error, error_description)
    return NextResponse.redirect(new URL(`/login?error=${error}`, requestUrl.origin))
  }

  if (code) {
    const supabase = createClient()
    
    try {
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Session exchange error:', exchangeError)
        return NextResponse.redirect(new URL('/login?error=auth_error', requestUrl.origin))
      }

      if (data.user) {
        // Create or update user profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name,
            avatar_url: data.user.user_metadata?.avatar_url,
            updated_at: new Date().toISOString(),
          })
          .select()

        if (profileError) {
          console.warn('Profile creation error:', profileError)
          // Don't fail the login for profile errors
        }
      }
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(new URL('/login?error=callback_error', requestUrl.origin))
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/chat', requestUrl.origin))
}