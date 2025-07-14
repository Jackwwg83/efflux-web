import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth/admin'

export async function GET(request: NextRequest) {
  try {
    // 验证管理员权限
    const adminStatus = await isAdmin()
    if (!adminStatus) {
      return NextResponse.json(
        { error: 'Access denied: Admin privileges required' },
        { status: 403 }
      )
    }
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const search = searchParams.get('search') || ''
    
    const supabase = createClient()
    
    // 获取所有用户信息
    const { data: authUsers } = await supabase.auth.admin.listUsers()
    let users = authUsers?.users || []
    
    // 搜索过滤
    if (search) {
      users = users.filter(user => 
        user.email?.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // 分页
    const total = users.length
    const totalPages = Math.ceil(total / limit)
    const offset = (page - 1) * limit
    const paginatedUsers = users.slice(offset, offset + limit)
    
    // 获取每个用户的统计信息
    const usersWithStats = await Promise.all(
      paginatedUsers.map(async (user) => {
        // 获取用户的对话和消息统计
        const [conversationsResult, messagesFromConversationsResult] = await Promise.all([
          supabase
            .from('conversations')
            .select('id')
            .eq('user_id', user.id),
          supabase
            .from('conversations')
            .select('id')
            .eq('user_id', user.id)
        ])
        
        const conversationIds = conversationsResult.data?.map(c => c.id) || []
        
        let messagesCount = 0
        if (conversationIds.length > 0) {
          const messagesResult = await supabase
            .from('messages')
            .select('count', { count: 'exact', head: true })
            .in('conversation_id', conversationIds)
          messagesCount = messagesResult.count || 0
        }
        
        return {
          id: user.id,
          email: user.email || '',
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          stats: {
            conversationsCount: conversationsResult.data?.length || 0,
            messagesCount
          }
        }
      })
    )
    
    return NextResponse.json({
      users: usersWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    })
    
  } catch (error) {
    console.error('Admin users API error:', error)
    
    if (error instanceof Error && error.message.includes('Access denied')) {
      return NextResponse.json(
        { error: 'Access denied: Admin privileges required' },
        { status: 403 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}