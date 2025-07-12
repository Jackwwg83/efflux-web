import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')

  console.log('OAuth callback - code:', !!code, 'error:', error)

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(new URL(`/login?error=oauth_error`, requestUrl.origin))
  }

  if (!code) {
    console.error('No code provided in OAuth callback')
    return NextResponse.redirect(new URL('/login?error=no_code', requestUrl.origin))
  }

  const cookieStore = cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  try {
    console.log('Attempting to exchange code for session...')
    const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (sessionError) {
      console.error('Session exchange error:', sessionError)
      return NextResponse.redirect(new URL('/login?error=session_error', requestUrl.origin))
    }

    if (!data.user || !data.session) {
      console.error('No user or session returned from exchange')
      return NextResponse.redirect(new URL('/login?error=no_session', requestUrl.origin))
    }

    console.log('Session created successfully for user:', data.user.email)

    // Simple profile creation - don't fail login if this fails
    try {
      await supabase
        .from('profiles')
        .upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || 
                    data.user.user_metadata?.name || 
                    data.user.email?.split('@')[0],
          avatar_url: data.user.user_metadata?.avatar_url,
          updated_at: new Date().toISOString(),
        })

      console.log('Profile upserted successfully')
    } catch (profileError) {
      console.warn('Profile creation failed (non-critical):', profileError)
    }

    console.log('Redirecting to chat...')
    return NextResponse.redirect(new URL('/chat', requestUrl.origin))

  } catch (error) {
    console.error('OAuth callback fatal error:', error)
    return NextResponse.redirect(new URL('/login?error=callback_error', requestUrl.origin))
  }
}