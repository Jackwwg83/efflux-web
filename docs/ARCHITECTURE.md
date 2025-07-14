# 系统架构文档

## 概述
Efflux Web是一个基于Next.js的AI聊天平台，支持多模型集成、实时流式对话和安全的API密钥管理。

## 技术栈

### 前端技术
- **Next.js 14** (App Router)
- **TypeScript** 
- **Tailwind CSS** + **shadcn/ui**
- **React Query** (TanStack Query) - 数据状态管理
- **Zustand** - 客户端状态管理
- **React Markdown** - 消息渲染

### 后端技术  
- **Next.js API Routes** - RESTful API
- **Supabase** - PostgreSQL数据库 + 身份认证
- **Server-Sent Events (SSE)** - 实时流式数据传输

### 安全与认证
- **Supabase Auth** - OAuth认证 (Google)
- **Row Level Security (RLS)** - 数据库权限控制
- **AES-256-GCM** - 客户端API密钥加密

## 核心架构

### 1. 认证流程
```
用户登录 → Google OAuth → Supabase Auth → JWT Token → RLS验证
```

**实现细节**：
- Google OAuth回调：`/app/auth/callback/route.ts`
- 用户配置表自动创建：数据库触发器
- 会话持久化：Supabase客户端自动处理

### 2. API密钥管理 (Vault系统)
```
用户输入密码 → AES-256-GCM加密 → 本地存储 → 会话级解锁
```

**安全特性**：
- 密码永不持久化，仅用于加密/解密
- API密钥加密后存储在localStorage
- 会话级解锁，刷新页面无需重新输入密码
- 所有加密操作在客户端进行

**核心文件**：
- `/lib/stores/vault.ts` - Vault状态管理
- `/lib/crypto/utils.ts` - 加密/解密实现

### 3. AI模型集成

#### 动态模型加载
```
API密钥解锁 → 调用供应商API → 获取可用模型 → 更新UI选择器
```

**当前支持的供应商**：
- **Google AI** (Gemini系列)
- 架构支持扩展：OpenAI、Anthropic、Azure等

**实现逻辑**：
```typescript
// Google模型加载示例
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
);
const { models } = await response.json();
const filteredModels = models.filter(model => 
  model.supportedGenerationMethods?.includes('generateContent') &&
  model.name.includes('gemini')
);
```

### 4. 聊天系统架构

#### 消息流处理
```
用户输入 → 保存用户消息 → 创建助手消息占位符 → 流式AI响应 → 实时更新数据库 → UI渲染
```

#### 数据库设计
```sql
-- 对话表
conversations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  title TEXT,
  model_id TEXT,
  provider TEXT,
  created_at TIMESTAMP,
  last_message_at TIMESTAMP
);

-- 消息表  
messages (
  id UUID PRIMARY KEY,
  conversation_id UUID REFERENCES conversations,
  role TEXT CHECK (role IN ('user', 'assistant')),
  content TEXT,
  tokens JSONB,
  created_at TIMESTAMP
);
```

#### RLS策略
```sql
-- 查看权限：只能查看自己的对话和消息
CREATE POLICY "Users can view own conversations" ON conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages in own conversations" ON messages  
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM conversations 
            WHERE conversations.id = messages.conversation_id 
            AND conversations.user_id = auth.uid())
  );

-- 创建权限：可以创建消息和对话
CREATE POLICY "Users can create messages in own conversations" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM conversations 
            WHERE conversations.id = messages.conversation_id 
            AND conversations.user_id = auth.uid())
  );

-- 更新权限：可以更新自己对话中的消息（用于streaming）
CREATE POLICY "Users can update messages in own conversations" ON messages
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM conversations
            WHERE conversations.id = messages.conversation_id
            AND conversations.user_id = auth.uid())
  );
```

### 5. 实时流式对话

#### 前端流处理
```typescript
// SSE流式数据处理
const reader = response.body?.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = new TextDecoder().decode(value);
  const lines = chunk.split('\n').filter(line => line.trim());
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      if (data.type === 'content') {
        fullContent += data.content;
        // 实时更新数据库
        await supabase
          .from('messages')
          .update({ content: fullContent })
          .eq('id', assistantMessage.id);
      }
    }
  }
}
```

#### 后端API实现
```typescript
// /app/api/chat/route.ts
const stream = new ReadableStream({
  start(controller) {
    for await (const chunk of chatStream) {
      const data = `data: ${JSON.stringify(chunk)}\n\n`;
      controller.enqueue(encoder.encode(data));
    }
  }
});

return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  }
});
```

## 关键组件

### 1. 聊天页面 (`/app/(dashboard)/chat/page.tsx`)
- 对话管理和消息发送
- React Query数据获取和缓存
- 流式响应处理
- 状态管理集成

### 2. 消息组件 (`/components/chat/message-item.tsx`)
- Markdown渲染 (ReactMarkdown)
- 代码高亮支持
- 复制功能
- 流式加载动画

### 3. Vault管理 (`/lib/stores/vault.ts`)
- Zustand状态管理
- 持久化配置 (localStorage)
- 密码验证和API密钥加密

### 4. AI供应商抽象 (`/lib/ai/providers/`)
- 统一的Provider接口
- 模型列表获取
- 流式响应处理
- 错误处理

## 部署架构

### 生产环境
- **前端**: Vercel部署 (自动CI/CD)
- **数据库**: Supabase托管PostgreSQL
- **认证**: Supabase Auth服务
- **域名**: https://efflux-web.vercel.app

### 环境变量
```bash
# Supabase配置
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google OAuth
GOOGLE_CLIENT_ID=xxx.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
```

## 性能优化

### 1. 前端优化
- React Query缓存和自动重新获取
- 组件懒加载和代码分割
- Streaming UI更新减少重渲染
- Zustand持久化减少API调用

### 2. 数据库优化
- RLS策略优化查询性能
- 适当的索引策略
- 连接池管理

### 3. 网络优化
- SSE长连接减少延迟
- 压缩和缓存策略
- CDN静态资源加速

## 安全考虑

### 1. 数据安全
- 所有用户数据通过RLS隔离
- API密钥客户端加密存储
- 敏感操作需要身份验证

### 2. API安全
- CORS配置限制
- 速率限制 (计划中)
- 输入验证和清理

### 3. 前端安全
- XSS防护 (React内置)
- CSRF保护 (SameSite cookies)
- 安全的OAuth流程

## 可扩展性

### 1. 新增AI供应商
1. 在`/lib/ai/providers/`下创建新的provider实现
2. 实现`AIProvider`接口
3. 在模型选择逻辑中集成

### 2. 新增功能模块
- 文件上传和处理
- 团队协作功能
- 对话分享和导出
- 插件系统

### 3. 国际化支持
- i18n配置 (计划中)
- 多语言UI
- 地区化设置