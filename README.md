# Efflux Web - AI Chat Platform

A modern, secure web application for chatting with multiple AI models using your own API keys.

🚀 **Live Demo**: [https://efflux-web.vercel.app](https://efflux-web.vercel.app)

## Features

- 🤖 **Multi-Model Support**: OpenAI, Anthropic, Google AI, AWS Bedrock, Azure OpenAI
- 🔐 **Secure API Key Management**: Client-side encryption with user-controlled passwords
- 💬 **Real-time Streaming**: Live AI responses with markdown support
- 📱 **Responsive Design**: Works on desktop and mobile
- 🗂️ **Conversation Management**: Save, organize, and search your chats
- 📝 **Prompt Templates**: Create and share reusable prompts (coming soon)
- 🔧 **MCP Server Support**: Extensible tool system (planned)

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, React Query
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **AI Integration**: Native SDKs for all supported providers
- **Security**: Web Crypto API for client-side encryption
- **Deployment**: Vercel + Supabase

## Quick Start

### 1. Prerequisites

- Node.js 18+ 
- A Supabase account
- A Vercel account
- API keys from at least one AI provider

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase/schema.sql`
3. Enable Google OAuth in Authentication → Providers (optional)
4. Note your project URL and anon key

### 3. Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### 4. Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting!

## AI Provider Setup

### OpenAI
1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add to your vault in Settings

### Anthropic (Claude)
1. Get API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to your vault in Settings

### Google AI (Gemini)
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add to your vault in Settings

### AWS Bedrock
1. Configure AWS IAM user with Bedrock permissions
2. Add Access Key ID, Secret Access Key, and Region to your vault

### Azure OpenAI
1. Deploy a model in Azure OpenAI Service
2. Add API Key, Endpoint, and Deployment Name to your vault

## Security Features

- **Client-Side Encryption**: API keys are encrypted in your browser before storage
- **Zero-Knowledge**: Supabase cannot decrypt your API keys
- **User-Controlled**: Only you know your vault password
- **Secure Headers**: CSP and other security headers configured
- **Row-Level Security**: Database queries are user-scoped

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fefflux-web)

1. Click the deploy button above
2. Connect your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to Vercel
npx vercel --prod
```

## Development

### Project Structure

```
efflux-web/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Core libraries
│   ├── ai/                # AI provider integrations
│   ├── crypto/            # Encryption utilities
│   └── supabase/          # Supabase client
├── types/                  # TypeScript definitions
└── supabase/              # Database schema
```

### Adding New AI Providers

1. Create provider class in `lib/ai/providers/`
2. Implement `BaseAIProvider` interface
3. Add to `AIManager` in `lib/ai/manager.ts`
4. Update settings UI in `app/(dashboard)/settings/page.tsx`

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests (when available)
5. Submit a pull request

## Roadmap

- [ ] **MCP Server Integration**: Support for Model Control Protocol tools
- [ ] **Prompt Templates**: Create, share, and manage prompt templates
- [ ] **File Upload**: Support for documents, images, and other files
- [ ] **Team Collaboration**: Share conversations and workspaces
- [ ] **Usage Analytics**: Track costs and token usage
- [ ] **Dark Mode**: Theme switching
- [ ] **Mobile App**: React Native app
- [ ] **Self-Hosting**: Docker support for on-premise deployment

## FAQ

### How secure are my API keys?

Your API keys are encrypted using AES-256-GCM encryption in your browser before being sent to our servers. The encryption key is derived from your password using PBKDF2 with 100,000 iterations. We never see your password or unencrypted API keys.

### Can I use this offline?

No, Efflux Web requires an internet connection to communicate with AI providers and sync your data. However, a future offline mode is planned for cached conversations.

### Which AI models are supported?

We support all major AI providers:
- **OpenAI**: GPT-4, GPT-3.5 Turbo
- **Anthropic**: Claude 3 (Opus, Sonnet, Haiku)
- **Google**: Gemini 1.5 Pro, Gemini Pro
- **AWS Bedrock**: Claude, Titan, Llama 3
- **Azure OpenAI**: Your deployed models

### How much does it cost?

Efflux Web is free to use. You only pay for the AI API calls to your chosen providers using your own API keys.

## Support

- 📧 Email: support@efflux.ai
- 💬 Discord: [Join our community](https://discord.gg/efflux)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/efflux-web/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ by the Efflux Team