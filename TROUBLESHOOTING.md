# 常见错误排查记录

本文档记录了在 Efflux Web 开发和部署过程中遇到的常见错误及其解决方案。

## 🚨 部署错误

### 1. `useSearchParams() requires Suspense boundary`

**错误现象**：
```
useSearchParams() should be wrapped in a suspense boundary at page "/login"
```

**根本原因**：
Next.js 14 App Router 要求所有使用 `useSearchParams()` 的客户端组件必须包装在 Suspense 边界中。

**解决方案**：
```tsx
// 错误的写法
export default function LoginPage() {
  const searchParams = useSearchParams()
  // ...
}

// 正确的写法
function LoginForm() {
  const searchParams = useSearchParams()
  // ...
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
```

**文件位置**：`app/(auth)/login/page.tsx`

### 2. TypeScript 构建错误

**错误现象**：
```
Property 'inline' does not exist on type 'CodeProps'
Type 'string | null' is not assignable to type 'string | undefined'
```

**根本原因**：
1. react-markdown 类型定义更新导致的兼容性问题
2. null 和 undefined 类型处理不当

**解决方案**：
```tsx
// 修复 react-markdown 类型错误
code({ node, className, children, ...props }: any) {
  const inline = !className?.includes('language-')
  // ...
}

// 修复 null/undefined 类型错误
streamingMessageId={streamingMessageId || undefined}
```

## 🔐 认证错误

### 3. Google OAuth "Database error saving new user"

**错误现象**：
重定向到 `http://localhost:3000/?error=server_error&error_code=unexpected_failure&error_description=Database+error+saving+new+user`

**根本原因**：
1. **重定向 URL 配置错误**：Supabase 中 Site URL 设置为 localhost
2. **数据库表缺失**：代码尝试向不存在的 `profiles` 表插入数据
3. **RLS 策略问题**：Row Level Security 阻止用户创建档案

**解决方案**：
1. **修复 Supabase 认证设置**：
   - Site URL: `https://efflux-web.vercel.app`
   - Redirect URLs: `https://efflux-web.vercel.app/auth/callback`

2. **创建 profiles 表**：
   ```sql
   CREATE TABLE IF NOT EXISTS profiles (
     id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
     email TEXT,
     full_name TEXT,
     avatar_url TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can view own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);
   CREATE POLICY "Users can insert own profile" ON profiles
     FOR INSERT WITH CHECK (auth.uid() = id);
   ```

### 4. Google OAuth "继续前往 musduoamlmscyyvgpreg.supabase.co"

**错误现象**：
Google 登录时显示 Supabase 域名而不是应用名称

**根本原因**：
Google OAuth 同意屏幕配置不完整

**解决方案**：
在 Google Cloud Console → OAuth consent screen 中配置：
- **Application name**: `Efflux - AI Chat Platform`
- **Application home page**: `https://efflux-web.vercel.app`
- **Application privacy policy**: `https://efflux-web.vercel.app/privacy`
- **Application terms of service**: `https://efflux-web.vercel.app/terms`
- **Authorized domains**: `efflux-web.vercel.app`

### 5. Google OAuth "测试模式"问题

**错误现象**：
只有特定用户可以登录，其他用户被阻止

**根本原因**：
Google OAuth 应用处于测试模式，只允许测试用户登录

**解决方案**：
1. **方法一**：添加测试用户（临时方案）
   - Google Cloud Console → OAuth consent screen → Test users
   - 添加需要登录的邮箱地址

2. **方法二**：发布应用（推荐）
   - Google Cloud Console → OAuth consent screen → "PUBLISH APP"
   - 填写必要信息后发布到生产环境

### 6. "OAuth authentication failed"

**错误现象**：
Google 认证完成后重定向到登录页面显示 OAuth 错误

**根本原因**：
Google Cloud Console 重定向 URI 配置不匹配或配置更改未生效

**解决方案**：
1. **检查重定向 URI**：
   ```
   https://musduoamlmscyyvgpreg.supabase.co/auth/v1/callback
   ```

2. **等待配置生效**：Google 配置更改可能需要 5 分钟到几小时生效

3. **重启 Supabase Provider**：
   - 关闭再重新启用 Google Provider

## 🌐 网络和环境错误

### 7. "Failed to execute 'fetch' on 'Window': Invalid value"

**错误现象**：
注册时出现 fetch 无效值错误

**根本原因**：
**Vercel 环境变量被截断** - 最常见的原因是复制 API 密钥时不完整

**解决方案**：
1. **检查 Vercel 环境变量**完整性：
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://musduoamlmscyyvgpreg.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=完整的JWT令牌（不能截断）
   SUPABASE_SERVICE_KEY=完整的JWT令牌（不能截断）
   ```

2. **重新部署**：修改环境变量后必须重新部署

3. **移除无效的重定向配置**：
   ```tsx
   // 可能导致问题的代码
   options: {
     emailRedirectTo: `${window.location.origin}/auth/callback`,
   }
   ```

## 🔍 调试技巧

### 通用调试方法

1. **查看 Vercel Function 日志**：
   - Vercel 项目 → Functions 标签
   - 查看 API 路由的执行日志

2. **浏览器开发者工具**：
   - Network 标签查看请求失败
   - Console 标签查看错误信息

3. **添加调试日志**：
   ```tsx
   console.log('=== Debug Info ===')
   console.log('Environment:', process.env.NODE_ENV)
   console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
   console.log('API Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
   ```

### Supabase 调试

1. **检查 RLS 策略**：确保用户有适当的数据库权限
2. **查看 Auth 日志**：Supabase Dashboard → Auth → Logs
3. **测试 API 密钥**：确保密钥未过期且权限正确

### Google OAuth 调试

1. **检查重定向 URI**：必须完全匹配
2. **验证应用状态**：确保不在测试模式或已添加测试用户
3. **清除浏览器缓存**：OAuth 错误可能被缓存

## 📝 预防措施

1. **环境变量管理**：
   - 使用密码管理器保存完整的 API 密钥
   - 复制时注意不要截断长字符串
   - 定期验证环境变量的完整性

2. **配置文档化**：
   - 记录所有外部服务的配置
   - 保存重要的 URL 和设置

3. **分步测试**：
   - 先测试基本功能（邮箱注册）
   - 再测试复杂功能（OAuth）
   - 每个功能都要单独验证

4. **版本控制**：
   - 重要配置更改后立即测试
   - 保持部署日志和更改记录

## 🎯 总结

大多数错误都源于：
1. **配置不匹配**：URL、密钥等配置不一致
2. **环境变量问题**：截断、缺失或错误的环境变量
3. **权限问题**：数据库 RLS、OAuth 权限等
4. **时间延迟**：外部服务配置更改需要时间生效

遇到问题时，优先检查这些方面，通常能快速定位和解决问题。