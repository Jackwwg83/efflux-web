# Deployment Guide

This guide covers deploying Efflux Web to production using Vercel and Supabase.

## Prerequisites

- A Supabase account
- A Vercel account
- GitHub repository (recommended)
- Domain name (optional)

## Step 1: Supabase Project Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and enter project details
4. Select a region closest to your users
5. Wait for project creation (2-3 minutes)

### 1.2 Configure Database

1. Go to SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase/schema.sql`
3. Run the SQL to create tables and RLS policies

### 1.3 Configure Authentication

1. Go to Authentication → Settings
2. Site URL: Set to your production domain (e.g., `https://efflux.yourdomain.com`)
3. Redirect URLs: Add your domain + `/auth/callback`

#### Optional: Enable OAuth Providers

For Google OAuth:
1. Go to Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials from Google Cloud Console

### 1.4 Get API Keys

1. Go to Settings → API
2. Copy your Project URL
3. Copy your anon (public) key
4. Copy your service_role (secret) key

## Step 2: Vercel Deployment

### 2.1 Connect Repository

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository

### 2.2 Configure Environment Variables

In Vercel dashboard, add these environment variables:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Optional
NEXT_PUBLIC_APP_NAME=Efflux
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 2.3 Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 2.4 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Visit your deployment URL

## Step 3: Custom Domain (Optional)

### 3.1 Add Domain in Vercel

1. Go to your project in Vercel
2. Click "Domains" tab
3. Add your custom domain
4. Follow DNS configuration instructions

### 3.2 Update Supabase URLs

1. Go back to Supabase Authentication settings
2. Update Site URL and Redirect URLs to use your custom domain

## Step 4: Production Optimizations

### 4.1 Environment-Specific Settings

Update your `.env.production`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
```

### 4.2 Performance Monitoring

Consider adding:

1. **Vercel Analytics**: Enable in project settings
2. **Supabase Analytics**: Monitor API usage
3. **Error Tracking**: Add Sentry for error monitoring

### 4.3 Security Headers

Vercel automatically adds security headers, but you can customize in `next.config.js`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

## Step 5: Monitoring and Maintenance

### 5.1 Set Up Monitoring

1. **Vercel Functions**: Monitor API routes performance
2. **Supabase Dashboard**: Monitor database performance
3. **User Analytics**: Track usage patterns

### 5.2 Regular Updates

1. Keep dependencies updated
2. Monitor Supabase changelog for breaking changes
3. Review security advisories

### 5.3 Backup Strategy

1. **Database**: Supabase automatically backs up your database
2. **User Data**: Consider implementing export features
3. **Configuration**: Keep environment variables backed up securely

## Troubleshooting

### Common Issues

#### Build Fails on Vercel

```bash
# Check for TypeScript errors
npm run build

# Check for missing dependencies
npm install
```

#### Authentication Not Working

1. Verify Site URL in Supabase matches your domain
2. Check redirect URLs include `/auth/callback`
3. Ensure environment variables are set correctly

#### API Routes Timing Out

1. Check Vercel function logs
2. Verify Supabase connection
3. Check API provider rate limits

#### CORS Errors

1. Verify your domain is whitelisted in Supabase
2. Check API route headers
3. Ensure proper environment variables

### Debugging Tips

1. **Vercel Logs**: Check function logs in Vercel dashboard
2. **Browser Console**: Check for client-side errors
3. **Supabase Logs**: Monitor database queries and auth events
4. **Network Tab**: Check API calls and responses

## Production Checklist

- [ ] Database schema deployed
- [ ] Environment variables configured
- [ ] Authentication providers enabled
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Error tracking enabled
- [ ] Performance monitoring active
- [ ] Backup strategy in place
- [ ] Security headers configured
- [ ] Rate limiting considered
- [ ] User documentation updated

## Cost Optimization

### Supabase Costs

- **Database**: Included in free tier up to 500MB
- **Auth**: 50,000 MAU free
- **Storage**: 1GB free
- **Bandwidth**: 2GB free

### Vercel Costs

- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month for commercial use
- **Function Invocations**: 100GB-hours free

### AI Provider Costs

Users pay for their own API usage:
- **OpenAI**: $0.03/1K tokens (GPT-4)
- **Anthropic**: $0.015/1K tokens (Claude 3)
- **Google**: $0.001/1K tokens (Gemini Pro)

## Support

If you encounter issues during deployment:

1. Check our [GitHub Issues](https://github.com/your-username/efflux-web/issues)
2. Join our [Discord community](https://discord.gg/efflux)
3. Email support@efflux.ai

## Next Steps

After successful deployment:

1. Test all functionality with real API keys
2. Monitor performance and user feedback
3. Consider implementing additional features from the roadmap
4. Set up analytics to understand user behavior

---

Congratulations! Your Efflux Web application is now live in production. 🎉