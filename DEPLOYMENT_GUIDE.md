# 用户部署指南

本文档详细记录了将 Efflux Web 部署到生产环境的完整步骤，包括 Supabase 和 Vercel 的配置。

## 📋 部署概览

Efflux Web 使用以下技术栈：
- **前端**: Next.js 14 部署在 Vercel
- **后端**: Supabase (数据库 + 认证)
- **存储**: 用户 API 密钥客户端加密存储
- **认证**: Google OAuth + 邮箱密码

## 🚀 第一步：Supabase 项目设置

### 1.1 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 点击 "New Project"
3. 填写项目信息：
   - **Name**: `Efflux Web`
   - **Database Password**: 设置一个强密码
   - **Region**: 选择离用户最近的区域
4. 点击 "Create new project"
5. 等待 2-3 分钟项目创建完成

### 1.2 配置数据库架构

1. 进入 Supabase Dashboard
2. 左侧菜单 → **SQL Editor**
3. 点击 "New Query"
4. 复制并执行 `supabase/schema.sql` 中的完整 SQL

**关键表结构**：
- `user_settings`: 用户偏好设置
- `user_vault`: 加密的 API 密钥存储
- `conversations`: 聊天对话
- `messages`: 聊天消息
- `prompt_templates`: 提示词模板
- `mcp_servers`: MCP 服务器配置

### 1.3 配置认证设置

1. 左侧菜单 → **Authentication** → **Settings**
2. 配置以下设置：
   - **Site URL**: `https://efflux-web.vercel.app`
   - **Redirect URLs**: 添加 `https://efflux-web.vercel.app/auth/callback`
3. 点击 "Save"

### 1.4 获取 API 密钥

1. 左侧菜单 → **Settings** → **API**
2. 复制以下信息（保存到安全地方）：
   - **Project URL**: `https://xxx.supabase.co`
   - **anon public**: `eyJ...` (公开 API 密钥)
   - **service_role**: `eyJ...` (服务端 API 密钥)

## 🎯 第二步：Google OAuth 配置

### 2.1 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com)
2. 创建新项目或选择现有项目
3. 项目名称: `Efflux Web`

### 2.2 启用 Google+ API

1. 左侧菜单 → **APIs & Services** → **Library**
2. 搜索 "Google+ API"
3. 点击启用

### 2.3 配置 OAuth 同意屏幕

1. 左侧菜单 → **APIs & Services** → **OAuth consent screen**
2. 选择 **External** 用户类型
3. 填写应用信息：
   - **App name**: `Efflux - AI Chat Platform`
   - **User support email**: 你的邮箱
   - **Application home page**: `https://efflux-web.vercel.app`
   - **Application privacy policy**: `https://efflux-web.vercel.app/privacy`
   - **Application terms of service**: `https://efflux-web.vercel.app/terms`
   - **Authorized domains**: 添加 `efflux-web.vercel.app`
   - **Developer contact information**: 你的邮箱
4. 点击 "Save and Continue"
5. **Scopes**: 跳过（使用默认）
6. **Test users**: 跳过或添加测试用户
7. **Summary**: 确认信息

### 2.4 创建 OAuth 凭据

1. 左侧菜单 → **APIs & Services** → **Credentials**
2. 点击 "+ Create Credentials" → "OAuth 2.0 Client IDs"
3. 配置凭据：
   - **Application type**: Web application
   - **Name**: `Efflux Web App`
   - **Authorized redirect URIs**: 添加
     ```
     https://musduoamlmscyyvgpreg.supabase.co/auth/v1/callback
     ```
4. 点击 "Create"
5. 复制 **Client ID** 和 **Client Secret**

### 2.5 发布应用

1. 返回 **OAuth consent screen**
2. 点击 "PUBLISH APP"
3. 确认发布（允许所有用户登录）

## 🔧 第三步：Supabase Google Provider 配置

### 3.1 启用 Google Provider

1. Supabase Dashboard → **Authentication** → **Providers**
2. 找到 **Google** provider
3. 开启 "Enable Sign in with Google"

### 3.2 配置 Google 凭据

1. 填入从 Google Cloud Console 获取的：
   - **Client ID**: `你的Google Client ID`
   - **Client Secret**: `你的Google Client Secret`
2. 点击 "Save"

**重要**：确保重定向 URL 为 `https://你的项目ID.supabase.co/auth/v1/callback`

## 📦 第四步：部署到 Vercel

### 4.1 推送代码到 GitHub

1. 创建 GitHub 仓库：`efflux-web`
2. 推送代码：
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/efflux-web.git
   git branch -M main
   git push -u origin main
   ```

### 4.2 连接 Vercel

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project"
3. 选择 "Import Git Repository"
4. 选择 `efflux-web` 仓库
5. 点击 "Import"

### 4.3 配置环境变量

在 Vercel 项目设置中添加：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://你的项目ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
SUPABASE_SERVICE_KEY=你的Supabase服务密钥

# 应用配置
NEXT_PUBLIC_APP_NAME=Efflux
```

**⚠️ 重要**：确保 API 密钥完整，不要截断长字符串！

### 4.4 部署应用

1. 配置完环境变量后，Vercel 会自动开始部署
2. 等待 2-5 分钟部署完成
3. 获得生产 URL：`https://efflux-web.vercel.app`

## ✅ 第五步：验证部署

### 5.1 测试基本功能

1. 访问 `https://efflux-web.vercel.app`
2. 测试邮箱注册：
   - 点击 "Sign up"
   - 输入邮箱和密码
   - 确认注册成功

### 5.2 测试 Google 登录

1. 点击 "Continue with Google"
2. 完成 Google 认证
3. 确认成功登录并跳转到聊天界面

### 5.3 测试 AI 聊天功能

1. 进入设置页面
2. 添加至少一个 AI 提供商的 API 密钥
3. 返回聊天界面测试对话

## 🔧 配置记录

### 当前环境配置

**Supabase 项目**：
- URL: `https://你的项目ID.supabase.co`
- Project ID: `你的项目ID`
- Region: 已配置

**Google OAuth**：
- Client ID: `你的Google Client ID`
- 应用状态: 已发布（生产环境）
- 重定向 URI: 已配置

**Vercel 部署**：
- URL: `https://你的应用名.vercel.app`
- 自动部署: 已启用（GitHub main 分支）
- 环境变量: 已配置

### 数据库架构状态

✅ **已创建的表**：
- `user_settings` - 用户设置
- `user_vault` - 加密 API 密钥存储
- `conversations` - 聊天对话
- `messages` - 聊天消息
- `prompt_templates` - 提示词模板
- `mcp_servers` - MCP 服务器配置
- `profiles` - 用户档案（OAuth 用户）

✅ **已配置的功能**：
- Row Level Security (RLS) 策略
- 自动触发器（用户创建时初始化设置）
- 索引优化
- 数据完整性约束

### 认证配置状态

✅ **Supabase Auth**：
- Site URL: `https://efflux-web.vercel.app`
- Redirect URLs: `https://efflux-web.vercel.app/auth/callback`
- Google Provider: 已启用并配置

✅ **Google OAuth**：
- 应用已发布到生产环境
- 同意屏幕已配置完整信息
- 重定向 URI 已验证

## 🚨 常见问题

参考 `TROUBLESHOOTING.md` 文档了解常见错误及解决方案。

## 📱 后续维护

### 自动部署

- 每次推送到 GitHub main 分支会自动触发 Vercel 重新部署
- 环境变量更改后需要手动重新部署

### 监控

- **Vercel**: 查看部署日志和性能监控
- **Supabase**: 监控数据库使用量和 Auth 日志
- **Google Cloud**: 监控 OAuth 使用情况

### 备份

- **数据库**: Supabase 自动备份
- **代码**: GitHub 版本控制
- **配置**: 本文档记录所有配置

---

**部署完成！** 🎉

你的 Efflux AI Chat Platform 已成功部署到生产环境，支持：
- 多种 AI 模型（OpenAI, Anthropic, Google, AWS, Azure）
- 安全的 API 密钥管理
- Google OAuth 登录
- 实时聊天功能
- 响应式设计