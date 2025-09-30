import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    // ビルド時の型エラーを無視
    ignoreBuildErrors: true,
  },
  eslint: {
    // ビルド時のESLintエラーを無視
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    // formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig