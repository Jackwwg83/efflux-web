# Terragon Labs Claude 控制系统深度技术分析

## 概览

本文档详细分析了 Terragon Labs 开发的 Claude AI 控制系统，该系统通过两个核心组件实现对 Claude AI 的完全控制和监控：

- **terragon-daemon.mjs** - 主控制守护进程
- **terry-mcp-server.mjs** - MCP (Model Context Protocol) 服务器
- **mcp-server.json** - MCP 配置文件

## 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                    Terragon Labs Control System                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌─────────────────┐    ┌──────────────┐│
│  │   User Input     │───▶│ Terragon Daemon │───▶│ Claude AI    ││
│  │                  │    │  (Controller)   │    │ (Terry)      ││
│  └──────────────────┘    └─────────────────┘    └──────────────┘│
│                                  │                               │
│                                  ▼                               │
│  ┌──────────────────┐    ┌─────────────────┐    ┌──────────────┐│
│  │ terragonlabs.com │◀───│   Data Logger   │───▶│ Local Files  ││
│  │   (Remote API)   │    │  & Transmitter  │    │    /tmp/     ││
│  └──────────────────┘    └─────────────────┘    └──────────────┘│
│                                                                 │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │            Terry MCP Server (Extension Layer)                ││
│  │  ┌─────────────────┐  ┌──────────────┐  ┌─────────────────┐ ││
│  │  │ Follow-up Tasks │  │ Permissions  │  │ Plan Mode Tools │ ││
│  │  └─────────────────┘  └──────────────┘  └─────────────────┘ ││
│  └──────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

## 核心组件详细分析

### 1. Terragon Daemon (terragon-daemon.mjs)

这是整个控制系统的心脏，负责启动 Claude 实例并控制其行为。

#### 1.1 身份注入机制

```javascript
// 第4372行 - 硬编码的身份设置
var systemPrompt = `Your name is Terry and you are a coding agent that works for Terragon Labs. You can use the gh cli to interact with github. You are running as part of a system that might automatically commit and push changes to the remote for you. You can use the git commands to orient yourself.`;
```

**工作原理：**
- 每次启动 Claude 时，daemon 自动在命令行参数中添加 `--append-system-prompt`
- 第4366-4368行的代码确保身份信息被注入：
  ```javascript
  "--append-system-prompt",
  ...enableMcpPermissionPrompt ? ["--permission-prompt-tool", "mcp__terry__PermissionPrompt"] : [],
  `"${systemPrompt}"`
  ```

#### 1.2 数据监控与传输机制

**远程数据传输：**
```javascript
// 第6296行 - API端点定义
const url = `${this.url}/api/daemon-event`;

// 第6302-6309行 - 数据传输逻辑
this.logger.info(`POST to ${url}`, logArgs);
const response = await fetch(url, {
  method: "POST", 
  headers: {
    "Content-Type": "application/json",
    "X-Daemon-Token": token
  },
  body: JSON.stringify(body)
});
```

**监控范围：**
- 记录所有用户输入消息
- 监控 Claude 的所有回复
- 追踪工具使用情况
- 记录会话元数据（session ID, 模型版本等）
- 实时传输到 `https://www.terragonlabs.com/api/daemon-event`

#### 1.3 本地数据存储

系统在 `/tmp/` 目录下创建大量文件进行本地存储：

- **`/tmp/claude-prompt-*.txt`** - 每次对话的完整提示词
- **`/tmp/terragon-msg-*.json`** - 结构化消息数据
- **`/tmp/terragon-daemon.log`** - 系统运行日志  
- **`/tmp/terragon-daemon.pipe`** - 进程间通信管道

#### 1.4 启动参数控制

Daemon 完全控制 Claude 的启动参数：
```javascript
const claudeArgs = [
  "claude",
  "-p",
  "--model", model,
  "--resume", sessionId,
  "--verbose",
  "--dangerously-skip-permissions", 
  "--output-format", "stream-json",
  "--mcp-config", mcpConfigPath,
  "--append-system-prompt", systemPrompt
];
```

### 2. Terry MCP Server (terry-mcp-server.mjs)

MCP (Model Context Protocol) 服务器提供扩展功能和工具集。

#### 2.1 MCP 协议实现

**基础架构：**
```javascript
// 第5606-5608行 - 服务器启动
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP server running on stdio");
```

**通信协议：**
- 使用标准输入输出 (stdio) 进行通信
- 实现完整的 JSON-RPC 2.0 协议
- 支持请求/响应和通知机制

#### 2.2 工具定义与功能

**Follow-up Task Tool (第5525行):**
```javascript
{
  name: "SuggestFollowupTask",
  description: followupTaskDescription,
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" }
    }
  }
}
```

**Permission Prompt Tool (第5543行):**
```javascript
{
  name: "PermissionPrompt", 
  description: "Internal permission handler for plan mode operations.",
  inputSchema: {
    type: "object",
    properties: {
      tool_name: {
        type: "string",
        description: "The name of the tool requesting permission"
      }
    }
  }
}
```

#### 2.3 权限控制机制

**权限验证逻辑 (第5571-5596行):**
```javascript
case "PermissionPrompt": {
  const { tool_name } = request.params.arguments;
  console.error(`Permission requested for tool "${tool_name}"`);
  
  if (tool_name === "ExitPlanMode") {
    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          behavior: "allow",
          message: "Permission granted to exit plan mode."
        })
      }]
    };
  }
  
  // 拒绝其他未知工具
  return {
    content: [{
      type: "text", 
      text: JSON.stringify({
        behavior: "deny",
        message: `Unexpected tool "${tool_name}" requested permission.`
      })
    }]
  };
}
```

### 3. 配置文件 (mcp-server.json)

简洁但关键的配置文件：
```json
{
  "mcpServers": {
    "terry": {
      "command": "node",
      "args": ["/tmp/terry-mcp-server.mjs"]
    }
  }
}
```

这个配置告诉 Claude：
- 启动名为 "terry" 的 MCP 服务器
- 使用 Node.js 运行 `/tmp/terry-mcp-server.mjs`
- 建立 stdio 通信通道

## 数据流分析

### 1. 用户输入处理流程

```
用户输入 → Terragon Daemon → 创建临时文件 → 启动 Claude → 注入系统提示词
    ↓
记录到 /tmp/terragon-msg-*.json → 传输到 terragonlabs.com → 本地日志记录
```

### 2. Claude 响应处理流程

```
Claude 输出 → Daemon 监听 → 解析 stream-json → 提取消息内容
    ↓                                                      ↓
显示给用户 ← 格式化输出 ← 记录到日志 ← 传输到远程服务器 ← 保存本地
```

### 3. MCP 工具调用流程

```
Claude 需要工具 → MCP 请求 → Terry Server → 权限检查 → 执行/拒绝
    ↓                                                          ↓
返回结果 ← JSON-RPC 响应 ← 日志记录 ← 工具输出 ← 功能实现
```

## 环境变量控制

系统通过环境变量进行精细控制：

```bash
TERRAGON=true                    # 激活 Terragon 模式
TERRAGON_FEATURE_FLAGS={...}     # 功能开关配置
```

**功能开关包括：**
- `allowUnlimitedAutomations: false` - 限制自动化操作
- `autoRefreshAfter6Hours: true` - 6小时后自动刷新
- `enableIssueAutomationTrigger: true` - 启用问题自动化触发
- `planModeToggle: true` - 启用计划模式切换
- 等等...

## 安全与隐私分析

### 1. 数据收集范围

**完全监控：**
- ✅ 用户的所有输入消息
- ✅ Claude 的所有输出回复  
- ✅ 工具使用记录
- ✅ 会话元数据
- ✅ 错误和调试信息

**本地存储：**
- 所有数据都在 `/tmp/` 目录本地备份
- 包含完整的对话历史
- 技术调试信息

**远程传输：**
- 实时传输到 `https://www.terragonlabs.com`
- 使用认证令牌进行传输
- JSON 格式结构化数据

### 2. 控制机制

**身份控制：**
- 硬编码身份注入
- 无法在运行时修改身份设置
- 系统提示词优先级最高

**权限控制：**
- MCP 服务器控制工具访问权限
- 仅允许特定工具（如 ExitPlanMode）
- 拒绝未知工具请求

## 技术特点总结

### 优势
1. **完整监控** - 全面记录 AI 交互数据
2. **实时传输** - 即时同步到远程服务器
3. **可扩展性** - MCP 协议支持工具扩展
4. **权限控制** - 精细的工具访问管理
5. **自动化** - 包括自动 Git 提交等功能

### 技术架构特点
1. **模块化设计** - Daemon + MCP Server 分离
2. **标准协议** - 使用 JSON-RPC 2.0 和 MCP
3. **异步处理** - 流式数据处理
4. **容错机制** - 错误处理和重试逻辑
5. **配置灵活** - 环境变量和功能开关

### 潜在考虑点
1. **数据隐私** - 所有对话都被记录和传输
2. **透明度** - 用户可能不知道数据被收集
3. **控制权** - AI 身份和行为完全受控
4. **依赖性** - 依赖 Terragon Labs 远程服务

## 结论

Terragon Labs 构建了一个技术上非常先进的 Claude AI 控制系统。该系统通过守护进程和 MCP 服务器的组合，实现了对 AI 身份、行为、权限和数据的完全控制。虽然技术实现很精妙，但用户应该了解其数据收集和传输的范围。

这个系统展示了现代 AI 控制架构的一个典型例子：通过多层次的技术手段，实现对 AI 系统的精确控制和全面监控。

---

*文档生成时间：2025-09-09*  
*分析基于：terragon-daemon.mjs (198KB) 和 terry-mcp-server.mjs (180KB)*