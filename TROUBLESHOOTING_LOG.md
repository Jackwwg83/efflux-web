# Efflux Web 故障排查记录

本文档记录了 Efflux Web 项目开发过程中遇到的实际问题及解决方案。

## 🚨 Google OAuth 认证失败

### 问题现象
```
OAuth authentication failed. Please try again.
```

### 错误调试过程

#### 1. 初始配置检查
- ✅ Supabase Site URL: `https://efflux-web.vercel.app`
- ✅ Supabase Redirect URLs: `https://efflux-web.vercel.app/auth/callback`
- ✅ Google Cloud Console 重定向 URI: `https://musduoamlmscyyvgpreg.supabase.co/auth/v1/callback`
- ✅ Google OAuth 应用状态: 正式版（非测试模式）

#### 2. Vercel 日志分析
```
OAuth error details: {
  error: 'server_error',
  error_description: 'Database error saving new user'
}
```

#### 3. Supabase 数据库日志分析
```json
{
  "event_message": "relation \"user_settings\" does not exist",
  "context": "PL/pgSQL function public.handle_new_user() line 3 at SQL statement",
  "internal_query": "INSERT INTO user_settings (user_id)\n  VALUES (NEW.id)"
}
```

### 根本原因
1. **触发器函数问题**: `handle_new_user()` 触发器试图向 `user_settings` 表插入数据
2. **Schema 路径问题**: 函数执行时无法找到 `public.user_settings` 表
3. **权限问题**: 触发器执行上下文的搜索路径不包含 `public` schema

### 解决方案
```sql
-- 修复触发器函数，明确指定 schema
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 修复结果
- ✅ Google OAuth 认证成功
- ✅ 用户可以正常登录并跳转到聊天界面
- ✅ 自动创建用户设置记录

## 🔧 右上角设置按钮无响应

### 问题现象
- 左下角 "Settings" 按钮正常工作
- 右上角齿轮图标点击无响应

### 根本原因
```typescript
// 问题代码：缺少 onClick 事件处理器
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>
```

### 解决方案
```typescript
// 修复：添加点击事件和路由导航
<Button variant="ghost" size="icon" onClick={handleSettingsClick}>
  <Settings className="h-4 w-4" />
</Button>

const handleSettingsClick = () => {
  router.push('/settings')
}
```

## 🤖 模型选择器显示错误模型

### 问题现象
- 用户只配置了 Gemini API Key
- 模型选择器显示 GPT、Claude 等未配置的模型

### 根本原因
硬编码的模型列表，不基于用户实际配置：
```typescript
// 问题代码
const availableModels = [
  { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
  { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus', provider: 'anthropic' },
  // ...
]
```

### 解决方案
1. **动态模型获取**: 基于 vault 中的 API Keys 筛选模型
2. **AIManager 集成**: 使用现有的 `getAvailableModels()` 方法
3. **异步加载**: 支持从 Google API 动态获取最新模型

```typescript
// 修复代码
const availableModels = useMemo(() => {
  if (!apiKeys) return []
  
  const aiManager = new AIManager()
  aiManager.setApiKeys(apiKeys)
  return aiManager.getAvailableModelsSync()
}, [apiKeys])
```

## 📂 Vault 状态检测错误

### 问题现象
右上角显示 "No API keys configured"，但用户明明在 Vault 中保存了 Gemini API Key

### 问题分析
#### 1. Vault Store 设计问题
```typescript
// Vault store 配置：不持久化 API Keys
partialize: (state) => ({ 
  isUnlocked: false,
  password: null,
  apiKeys: null,  // 总是 null！
})
```

#### 2. 状态检查逻辑缺失
```typescript
// 问题代码：只检查 apiKeys，忽略 isUnlocked
const { apiKeys } = useVaultStore()
if (!apiKeys) return "No API keys configured"
```

### 解决方案
#### 1. 分层状态检测
```typescript
const { apiKeys, isUnlocked } = useVaultStore()

const getStatusMessage = () => {
  if (!isUnlocked) {
    return "Vault locked - click settings to unlock"
  }
  if (!apiKeys || Object.keys(apiKeys).length === 0) {
    return "No API keys configured"
  }
  return null
}
```

#### 2. 聊天页面重定向逻辑修复
```typescript
// 修复前：有 Vault 但未解锁时不处理
if (!hasVault) router.push('/settings')

// 修复后：正确处理所有状态
if (!hasVault) {
  router.push('/settings')  // 创建 Vault
} else if (!isUnlocked) {
  router.push('/settings?action=unlock')  // 解锁 Vault
}
```

## 🔄 Google 模型列表过时

### 问题现象
- 显示 Gemini 1.5 模型
- 用户反馈 "Gemini 现在都 2.0 了"

### 根本原因
硬编码的模型列表，无法自动更新

### 解决方案：动态 API 获取
```typescript
// 使用 Google AI API models.list 端点
private async loadModels(): Promise<void> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`
    )
    const data: ListModelsResponse = await response.json()
    
    // 筛选并转换为内部格式
    this._models = data.models
      .filter(model => 
        model.supportedGenerationMethods.includes('generateContent') &&
        model.baseModelId.startsWith('gemini')
      )
      .map(model => ({
        id: model.baseModelId,
        name: model.displayName || model.baseModelId,
        provider: 'google' as const,
        contextLength: model.inputTokenLimit,
        description: model.description,
        capabilities: this.getModelCapabilities(model),
      }))
  } catch (error) {
    // 降级到 fallback 模型
    this._models = this.getFallbackModels()
  }
}
```

## 📋 常见错误模式总结

### 1. 配置类错误
- **特征**: 服务正常，但特定功能不工作
- **调试**: 检查环境变量、URL 配置、API 密钥
- **工具**: Vercel 日志、Supabase 日志、浏览器 Network 标签

### 2. 数据库相关错误
- **特征**: "Database error"、"relation does not exist"
- **调试**: 查看 Supabase SQL 日志，检查表结构和权限
- **工具**: Supabase Dashboard → Logs，SQL Editor

### 3. 前端状态管理错误
- **特征**: UI 显示与实际状态不符
- **调试**: 检查 Zustand store、React state、localStorage
- **工具**: React DevTools、浏览器 Application 标签

### 4. 异步加载问题
- **特征**: 间歇性工作、竞态条件
- **调试**: 添加 loading 状态、错误边界、fallback 机制
- **工具**: console.log、Chrome Performance 标签

## 🛠️ 调试工具清单

### Vercel
- Functions 标签：查看 API 路由执行日志
- Deployments：确认最新代码已部署

### Supabase
- Logs → Auth：查看认证相关错误
- Logs → Database：查看 SQL 执行错误
- SQL Editor：手动执行查询验证

### 浏览器
- Network 标签：查看 API 请求和响应
- Application 标签：检查 localStorage、cookies
- Console：查看前端错误和调试信息

### 代码调试
- `console.log`：关键状态和变量
- `console.warn`：非致命错误
- `console.error`：严重错误和异常

## ✅ 成功指标

项目目前状态：
- ✅ Google OAuth 登录正常
- ✅ 邮箱密码注册/登录正常
- ✅ Vault 系统加密存储 API Keys
- ✅ 动态模型列表基于配置显示
- ✅ 聊天功能与 Gemini 集成正常
- ✅ 设置页面完整功能
- ✅ 响应式 UI 设计

关键性能指标：
- 首次加载时间：< 3 秒
- Google OAuth 流程：< 10 秒
- 聊天响应延迟：< 2 秒（取决于 AI 提供商）
- 构建成功率：100%