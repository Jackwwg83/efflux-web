# Efflux Web 核心逻辑文档

本文档记录 Efflux Web 应用的核心技术实现逻辑。

## 🔐 用户认证系统

### Google OAuth 流程

#### 1. 前端触发登录
```typescript
// app/(auth)/login/page.tsx
const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}
```

#### 2. Google 认证重定向
```
用户点击 Google 登录 
→ Google OAuth 同意页面
→ Google 重定向到 Supabase: https://musduoamlmscyyvgpreg.supabase.co/auth/v1/callback
→ Supabase 处理后重定向到应用: https://efflux-web.vercel.app/auth/callback
```

#### 3. 应用回调处理
```typescript
// app/auth/callback/route.ts
export async function GET(request: Request) {
  const code = requestUrl.searchParams.get('code')
  
  // 1. 交换 code 获取 session
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  
  // 2. 创建用户 profile（使用 service client 绕过 RLS）
  const serviceSupabase = createClient(url, serviceKey)
  await serviceSupabase.from('profiles').upsert({
    id: data.user.id,
    email: data.user.email,
    full_name: data.user.user_metadata?.full_name,
    avatar_url: data.user.user_metadata?.avatar_url,
  })
  
  // 3. 重定向到聊天页面
  return NextResponse.redirect('/chat')
}
```

#### 4. 数据库触发器
```sql
-- 用户创建时自动初始化设置
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 邮箱密码认证
```typescript
// 注册
const { error } = await supabase.auth.signUp({
  email,
  password,
})

// 登录
const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
})
```

## 🔒 API 密钥管理系统

### 客户端加密架构

#### 1. 加密工具类
```typescript
// lib/crypto/utils.ts
export class CryptoUtils {
  // 使用 PBKDF2 派生密钥（100,000 迭代）
  static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey>
  
  // AES-256-GCM 加密
  static async encrypt(data: string, password: string): Promise<{
    encrypted: string
    salt: string
    iv: string
  }>
  
  // AES-256-GCM 解密
  static async decrypt(encryptedData: string, password: string, salt: string, iv: string): Promise<string>
}
```

#### 2. Vault 管理器
```typescript
// lib/crypto/vault.ts
export class VaultManager {
  // 创建新的加密保险库
  async createVault(password: string, apiKeys: APIKeys): Promise<void> {
    const vaultData: VaultData = { apiKeys }
    const dataString = JSON.stringify(vaultData)
    
    // 客户端加密
    const { encrypted, salt, iv } = await CryptoUtils.encrypt(dataString, password)
    
    // 存储到 Supabase
    await this.supabase.from('user_vault').insert({
      user_id: userId,
      encrypted_data: encrypted,
      salt,
      iv,
    })
  }
  
  // 解锁保险库
  async unlockVault(password: string): Promise<APIKeys> {
    // 从数据库获取加密数据
    const vaultRecord = await this.getVaultRecord()
    
    // 客户端解密
    const decryptedData = await CryptoUtils.decrypt(
      vaultRecord.encrypted_data,
      password,
      vaultRecord.salt,
      vaultRecord.iv
    )
    
    const vaultData: VaultData = JSON.parse(decryptedData)
    return vaultData.apiKeys
  }
}
```

#### 3. 状态管理
```typescript
// lib/stores/vault.ts
interface VaultStore {
  isUnlocked: boolean
  password: string | null
  apiKeys: APIKeys | null
  
  unlock: (password: string, apiKeys: APIKeys) => void
  lock: () => void
}

// 安全配置：不持久化敏感数据
partialize: (state) => ({ 
  isUnlocked: false,
  password: null,
  apiKeys: null,
})
```

### 零知识架构特点
- **客户端加密**: 密码和密钥在浏览器中加密，服务器无法解密
- **派生密钥**: 使用 PBKDF2 + 100K 迭代增强安全性
- **随机盐和 IV**: 每次加密使用不同的盐和初始化向量
- **内存安全**: 敏感数据不持久化到 localStorage

## 🤖 AI 模型集成系统

### 提供商架构

#### 1. 基础提供商类
```typescript
// lib/ai/base.ts
export abstract class BaseAIProvider {
  protected apiKey: string
  
  abstract get id(): string
  abstract get name(): string
  abstract get models(): ModelInfo[]
  abstract chat(messages: ChatMessage[], options: ChatOptions): AsyncGenerator<ChatChunk>
  abstract validateApiKey(): Promise<boolean>
}
```

#### 2. Google AI 提供商
```typescript
// lib/ai/providers/google.ts
export class GoogleProvider extends BaseAIProvider {
  private client: GoogleGenerativeAI
  private _models: ModelInfo[] = []
  
  constructor(apiKey: string) {
    super(apiKey)
    this.client = new GoogleGenerativeAI(apiKey)
    this.loadModels() // 异步加载模型列表
  }
  
  // 动态获取 Google 模型列表
  private async loadModels(): Promise<void> {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`
    )
    const data = await response.json()
    
    this._models = data.models
      .filter(model => 
        model.supportedGenerationMethods.includes('generateContent') &&
        model.baseModelId.startsWith('gemini')
      )
      .map(model => ({
        id: model.baseModelId,
        name: model.displayName,
        provider: 'google',
        contextLength: model.inputTokenLimit,
        capabilities: this.getModelCapabilities(model),
      }))
  }
  
  // 流式聊天实现
  async *chat(messages: ChatMessage[], options: ChatOptions): AsyncGenerator<ChatChunk> {
    const model = this.client.getGenerativeModel({ model: options.model })
    const result = await model.generateContentStream(prompt)
    
    for await (const chunk of result.stream) {
      yield {
        type: 'content',
        content: chunk.text(),
      }
    }
  }
}
```

#### 3. AI 管理器
```typescript
// lib/ai/manager.ts
export class AIManager {
  private providers: Map<AIProvider, BaseAIProvider | null> = new Map()
  
  setApiKeys(apiKeys: APIKeys) {
    if (apiKeys.openai) {
      this.providers.set('openai', new OpenAIProvider(apiKeys.openai))
    }
    if (apiKeys.google) {
      this.providers.set('google', new GoogleProvider(apiKeys.google))
    }
    // ... 其他提供商
  }
  
  // 异步获取所有可用模型
  async getAvailableModels(): Promise<ModelInfo[]> {
    const models: ModelInfo[] = []
    
    for (const provider of this.providers.values()) {
      if (provider) {
        // 确保动态模型已加载
        if ('ensureModelsLoaded' in provider) {
          await (provider as any).ensureModelsLoaded()
        }
        models.push(...provider.models)
      }
    }
    
    return models
  }
}
```

### 聊天 API 流程

#### 1. 前端发起聊天
```typescript
// app/api/chat/route.ts
export async function POST(request: Request) {
  const { messages, model, provider } = await request.json()
  
  // 1. 获取用户 API Keys
  const vaultManager = getVaultManager()
  const apiKeys = await vaultManager.getApiKeys(userId)
  
  // 2. 初始化 AI Manager
  const aiManager = new AIManager()
  aiManager.setApiKeys(apiKeys)
  
  // 3. 获取对应提供商
  const aiProvider = aiManager.getProvider(provider)
  
  // 4. 流式响应
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of aiProvider.chat(messages, { model })) {
          const data = encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
          controller.enqueue(data)
        }
      } finally {
        controller.close()
      }
    }
  })
  
  return new Response(stream, {
    headers: { 'Content-Type': 'text/stream' }
  })
}
```

#### 2. 前端接收流式响应
```typescript
// components/chat/message-input.tsx
const sendMessage = async (content: string) => {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [...messages, { role: 'user', content }],
      model: currentModel,
      provider: currentProvider,
    }),
  })
  
  const reader = response.body?.getReader()
  let assistantMessage = ''
  
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    
    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6))
        
        if (data.type === 'content') {
          assistantMessage += data.content
          // 实时更新 UI
        }
      }
    }
  }
}
```

## 🗄️ 数据库架构

### 核心表结构

#### 1. 用户认证（Supabase Auth）
```sql
-- auth.users (Supabase 管理)
-- 存储基本认证信息，支持多种登录方式
```

#### 2. 用户档案
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. 加密保险库
```sql
CREATE TABLE user_vault (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  encrypted_data TEXT NOT NULL, -- 加密的 JSON 数据
  salt TEXT NOT NULL,           -- PBKDF2 盐
  iv TEXT NOT NULL,             -- AES-GCM 初始化向量
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. 聊天数据
```sql
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  settings JSONB DEFAULT '{"model": "gpt-4", "provider": "openai"}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES conversations(id) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT,
  tokens JSONB, -- {"prompt": 100, "completion": 50}
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

#### 1. 基本原则
- 每个用户只能访问自己的数据
- 使用 `auth.uid()` 函数检查权限

#### 2. RLS 策略示例
```sql
-- Profiles 表
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Vault 表
CREATE POLICY "Users can access own vault" ON user_vault
  FOR ALL USING (auth.uid() = user_id);

-- Conversations 表
CREATE POLICY "Users can access own conversations" ON conversations
  FOR ALL USING (auth.uid() = user_id);
```

## 🎨 前端状态管理

### 1. Zustand Store 架构
```typescript
// 全局状态：Vault 解锁状态
const useVaultStore = create<VaultStore>()(
  persist(
    (set) => ({
      isUnlocked: false,
      apiKeys: null,
      unlock: (password, apiKeys) => set({ isUnlocked: true, apiKeys }),
      lock: () => set({ isUnlocked: false, apiKeys: null }),
    }),
    { name: 'vault-store' }
  )
)
```

### 2. React Query 数据获取
```typescript
// 聊天数据缓存和同步
const { data: conversations } = useQuery({
  queryKey: ['conversations'],
  queryFn: async () => {
    const { data } = await supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })
    return data
  }
})
```

### 3. 组件状态流
```
用户操作 
→ Zustand Action 
→ React Query Mutation 
→ Supabase 数据更新 
→ React Query 缓存刷新 
→ UI 重新渲染
```

## 🔄 实时功能

### 1. 流式 AI 响应
- **技术**: Server-Sent Events (SSE)
- **格式**: `data: ${JSON.stringify(chunk)}\n\n`
- **优势**: 实时显示 AI 生成内容，提升用户体验

### 2. 数据同步
- **技术**: React Query + Supabase Realtime
- **场景**: 多设备间聊天记录同步
- **实现**: Supabase 实时订阅 + 自动缓存更新

## 📱 响应式设计

### 1. 组件库
- **基础**: shadcn/ui + Radix UI
- **样式**: Tailwind CSS
- **图标**: Lucide React

### 2. 布局策略
- **桌面**: 侧边栏 + 主内容区
- **移动**: 全屏模式 + 抽屉导航
- **自适应**: CSS Grid + Flexbox

## 🚀 性能优化

### 1. 代码分割
- **路由级**: Next.js App Router 自动分割
- **组件级**: React.lazy + Suspense
- **第三方库**: 动态导入

### 2. 缓存策略
- **浏览器**: Service Worker + Cache API
- **CDN**: Vercel Edge Network
- **数据**: React Query 智能缓存

### 3. 图片优化
- **格式**: Next.js Image 组件自动优化
- **懒加载**: 视口内才加载
- **响应式**: 根据设备尺寸提供不同分辨率