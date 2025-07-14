import { createClient } from '@/lib/supabase/client'

// 管理员邮箱列表
const ADMIN_EMAILS = [
  'jackwwg@gmail.com'
]

/**
 * 检查当前用户是否为管理员
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user || !user.email) {
      return false
    }
    
    return ADMIN_EMAILS.includes(user.email.toLowerCase())
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

/**
 * 获取当前用户信息
 */
export async function getCurrentUser() {
  try {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.email ? ADMIN_EMAILS.includes(user.email.toLowerCase()) : false
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * 管理员权限中间件 - 用于保护管理员路由
 */
export async function requireAdmin() {
  const adminStatus = await isAdmin()
  if (!adminStatus) {
    throw new Error('Access denied: Admin privileges required')
  }
  return true
}