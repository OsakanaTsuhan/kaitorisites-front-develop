import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true, // 一時的
  },
  eslint: {
    ignoreDuringBuilds: true, // 一時的
  },
  images: {
    unoptimized: true,
  },
  // Next.js 15での正しいexperimental設定
  experimental: {
    // ISR関連の設定（Next.js 15で利用可能）
    staleTimes: {
      dynamic: 30, // 動的ルートのキャッシュ時間（秒）
      static: 180, // 静的ルートのキャッシュ時間（秒）
    },
    // PPR（Partial Prerendering）- 必要に応じて
    // ppr: 'incremental',
    
    // After API - レスポンス後の処理用（必要に応じて）
    // after: true,
  },
  // リダイレクトとリライト
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080'}/api/:path*`,
      },
    ]
  },
}

export default nextConfig