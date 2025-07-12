# Contributing to Efflux Web

Thank you for your interest in contributing to Efflux Web! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- A Supabase account (for testing)

### Local Development

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/efflux-web.git
   cd efflux-web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Project Structure

```
efflux-web/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main application pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # Base UI components
│   ├── chat/              # Chat-related components
│   └── models/            # Model management components
├── lib/                   # Core libraries
│   ├── ai/                # AI provider integrations
│   ├── crypto/            # Encryption utilities
│   ├── supabase/          # Supabase client
│   └── stores/            # State management
├── types/                 # TypeScript type definitions
└── supabase/             # Database schema and migrations
```

## Contributing Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check formatting
npm run lint

# Auto-fix formatting
npm run lint:fix
```

### Git Workflow

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Keep commits small and focused
   - Write clear commit messages
   - Follow conventional commit format

3. **Test Your Changes**
   ```bash
   npm run build
   npm run dev
   ```

4. **Submit Pull Request**
   - Fill out the PR template
   - Include screenshots for UI changes
   - Link related issues

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(chat): add streaming response support`
- `fix(auth): resolve login redirect issue`
- `docs(readme): update installation instructions`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Build process or auxiliary tool changes

## Adding New Features

### Adding AI Providers

1. **Create Provider Class**
   ```typescript
   // lib/ai/providers/new-provider.ts
   import { BaseAIProvider } from '../base'
   
   export class NewProvider extends BaseAIProvider {
     // Implement required methods
   }
   ```

2. **Register Provider**
   ```typescript
   // lib/ai/manager.ts
   import { NewProvider } from './providers/new-provider'
   
   // Add to AIManager
   ```

3. **Update Settings UI**
   ```typescript
   // app/(dashboard)/settings/page.tsx
   // Add new provider tab and configuration
   ```

### Adding UI Components

1. **Create Base Component**
   ```typescript
   // components/ui/new-component.tsx
   import * as React from 'react'
   import { cn } from '@/lib/utils'
   
   const NewComponent = React.forwardRef<...>(...) => (
     // Component implementation
   )
   ```

2. **Export from Index**
   ```typescript
   // components/ui/index.ts
   export * from './new-component'
   ```

3. **Add to Storybook** (when available)

## Testing Guidelines

### Manual Testing

Before submitting a PR, test:

1. **Authentication Flow**
   - Registration
   - Login/logout
   - OAuth (if configured)

2. **Core Features**
   - Chat functionality
   - Model switching
   - API key management
   - Conversation management

3. **Error Handling**
   - Invalid API keys
   - Network errors
   - Rate limiting

### Adding Tests (Future)

We plan to add:
- Unit tests with Jest/Vitest
- Integration tests with Playwright
- Component tests with Testing Library

## Code Review Process

### For Contributors

1. **Self-Review**
   - Test your changes thoroughly
   - Check for console errors
   - Verify responsive design
   - Review your own code

2. **PR Description**
   - Explain what and why
   - Include before/after screenshots
   - List breaking changes
   - Reference related issues

### For Reviewers

1. **Code Quality**
   - TypeScript usage
   - Performance implications
   - Security considerations
   - Accessibility

2. **Testing**
   - Manual testing
   - Edge cases
   - Error scenarios

## Security Guidelines

### API Key Handling

- Never log API keys
- Always encrypt before storage
- Use secure headers for transmission
- Implement proper validation

### Database Security

- Use Row Level Security (RLS)
- Validate all inputs
- Implement proper authorization
- Use parameterized queries

### Frontend Security

- Sanitize user inputs
- Implement CSP headers
- Use HTTPS in production
- Validate all API responses

## Performance Guidelines

### Frontend Performance

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Minimize bundle size

### API Performance

- Implement proper caching
- Use streaming for long responses
- Optimize database queries
- Consider rate limiting

## Common Issues

### Development Issues

1. **Supabase Connection**
   ```bash
   # Check environment variables
   echo $NEXT_PUBLIC_SUPABASE_URL
   ```

2. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

3. **Type Errors**
   ```bash
   # Regenerate types
   npm run db:types
   ```

## Getting Help

### Community Support

- **Discord**: [Join our Discord](https://discord.gg/efflux)
- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/efflux-web/issues)
- **Email**: support@efflux.ai

### Documentation

- **API Documentation**: [Supabase Docs](https://supabase.com/docs)
- **Next.js Guide**: [Next.js Documentation](https://nextjs.org/docs)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Invited to contributor Discord channel
- Eligible for swag (future)

## License

By contributing to Efflux Web, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make Efflux Web better! 🚀