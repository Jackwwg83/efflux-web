/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // 允许流式响应
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  
  // 环境变量类型安全
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
  // 图片域名配置
  images: {
    domains: ['*.supabase.co'],
  },
}

module.exports = nextConfig