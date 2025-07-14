'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Activity,
  Search,
  ArrowLeft,
  RefreshCw
} from 'lucide-react'
import { getCurrentUser } from '@/lib/auth/admin'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  totalConversations: number
  totalMessages: number
  activeUsers: number
  recentUsers: Array<{
    id: string
    email: string
    created_at: string
    last_sign_in_at: string | null
  }>
  dailyUserStats: Array<{
    date: string
    users: number
  }>
  lastUpdated: string
}

interface User {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  stats: {
    conversationsCount: number
    messagesCount: number
  }
}

interface UsersResponse {
  users: User[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<UsersResponse | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)

  // 检查管理员权限
  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const user = await getCurrentUser()
      if (!user || !user.isAdmin) {
        router.push('/chat')
        return
      }
      setIsAdmin(true)
      await loadData()
    } catch (error) {
      console.error('Admin access check failed:', error)
      router.push('/chat')
    } finally {
      setLoading(false)
    }
  }

  const loadData = async () => {
    try {
      const [statsResponse, usersResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/users?page=1&limit=20')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setUsers(usersData)
      }
    } catch (error) {
      console.error('Error loading admin data:', error)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  const searchUsers = async () => {
    try {
      const response = await fetch(
        `/api/admin/users?page=${currentPage}&limit=20&search=${encodeURIComponent(searchTerm)}`
      )
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error searching users:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN')
  }

  const formatRelativeTime = (dateString: string | null) => {
    if (!dateString) return '从未登录'
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) return '刚刚活跃'
    if (diffInHours < 24) return `${Math.floor(diffInHours)}小时前`
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}天前`
    return '一周前'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>验证管理员权限中...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/chat">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回聊天
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">管理后台</h1>
            <p className="text-muted-foreground">Efflux Web 系统管理</p>
          </div>
        </div>
        <Button onClick={refreshData} disabled={refreshing} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          刷新数据
        </Button>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总用户数</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                已注册用户总数
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃用户</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                最近7天活跃
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总对话数</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalConversations}</div>
              <p className="text-xs text-muted-foreground">
                创建的对话总数
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总消息数</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMessages}</div>
              <p className="text-xs text-muted-foreground">
                发送的消息总数
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 主要内容 */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">用户管理</TabsTrigger>
          <TabsTrigger value="recent">最近注册</TabsTrigger>
          <TabsTrigger value="stats">数据统计</TabsTrigger>
        </TabsList>

        {/* 用户管理 */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>用户列表</CardTitle>
              <CardDescription>
                查看和管理所有注册用户
              </CardDescription>
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索用户邮箱..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                    className="pl-8"
                  />
                </div>
                <Button onClick={searchUsers}>搜索</Button>
              </div>
            </CardHeader>
            <CardContent>
              {users && (
                <div className="space-y-4">
                  <div className="grid gap-4">
                    {users.users.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{user.email}</span>
                            <Badge variant="outline">
                              {formatRelativeTime(user.last_sign_in_at)}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            注册时间: {formatDate(user.created_at)}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="text-sm">
                            对话: {user.stats.conversationsCount}
                          </div>
                          <div className="text-sm">
                            消息: {user.stats.messagesCount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* 分页 */}
                  {users.pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        上一页
                      </Button>
                      <span className="text-sm">
                        第 {users.pagination.page} 页，共 {users.pagination.totalPages} 页
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === users.pagination.totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        下一页
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 最近注册 */}
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>最近注册用户</CardTitle>
              <CardDescription>
                最新注册的10个用户
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats && (
                <div className="space-y-3">
                  {stats.recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <div className="font-medium">{user.email}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(user.created_at)}
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {formatRelativeTime(user.last_sign_in_at)}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据统计 */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>系统统计</CardTitle>
              <CardDescription>
                最近30天用户注册趋势
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats && (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    数据更新时间: {formatDate(stats.lastUpdated)}
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-sm">
                    {stats.dailyUserStats.slice(-7).map((day) => (
                      <div key={day.date} className="text-center p-2 border rounded">
                        <div className="font-medium">{day.users}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(day.date).toLocaleDateString('zh-CN', { 
                            month: 'numeric', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}