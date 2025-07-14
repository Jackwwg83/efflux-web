import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/admin'

export async function GET(request: NextRequest) {
  try {
    // 验证管理员权限
    await requireAdmin()
    
    const supabase = createClient()
    
    // 从auth.users表获取用户信息（需要service key）
    const { data: authUsers } = await supabase.auth.admin.listUsers()
    const totalUsers = authUsers?.users?.length || 0
    
    // 获取活跃用户（最近7天）
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const activeUsers = authUsers?.users?.filter(user => 
      user.last_sign_in_at && new Date(user.last_sign_in_at) >= sevenDaysAgo
    ).length || 0
    
    // 获取最近注册用户
    const recentUsers = authUsers?.users
      ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      ?.slice(0, 10)
      ?.map(user => ({
        id: user.id,
        email: user.email || '',
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at
      })) || []
    
    // 获取每日注册统计
    const dailyStats = []
    const usersByDate = (authUsers?.users || []).reduce((acc, user) => {
      const date = new Date(user.created_at).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      dailyStats.push({
        date: dateStr,
        users: usersByDate[dateStr] || 0
      })
    }
    
    // 获取其他统计信息
    const [conversationsResult, messagesResult] = await Promise.all([
      supabase
        .from('conversations')
        .select('count', { count: 'exact', head: true }),
      supabase
        .from('messages')
        .select('count', { count: 'exact', head: true })
    ])

    const stats = {
      totalUsers,
      totalConversations: conversationsResult.count || 0,
      totalMessages: messagesResult.count || 0,
      activeUsers,
      recentUsers,
      dailyUserStats: dailyStats,
      lastUpdated: new Date().toISOString()
    }

    return NextResponse.json(stats)
    
  } catch (error) {
    console.error('Admin stats API error:', error)
    
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