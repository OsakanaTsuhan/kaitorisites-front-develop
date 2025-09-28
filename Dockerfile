# syntax=docker/dockerfile:1

FROM node:23-alpine AS base

# libc6-compat が必要な場合があります
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 依存関係のインストール用ステージ
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm install

# ビルド用ステージ
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js テレメトリを無効化
ENV NEXT_TELEMETRY_DISABLED=1

# ビルド時の環境変数（ISR/SSR対応）
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"

# ISR用のビルド時環境変数
ENV NEXT_BUILD_ALLOW_FALLBACK=true
ENV NEXT_BUILD_SKIP_EXTERNAL_DEPS=true

# 必要最小限の環境変数のみ設定（ビルド用ダミー値）
ENV NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
ENV BASIC_AUTH_ENABLED=false

# Next.jsアプリケーションをビルド
RUN npm run build

# standaloneディレクトリが作成されたか確認
RUN ls -la .next/ && \
    ls -la .next/standalone/ || echo "Warning: standalone directory not found"

# プロダクション用ステージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# セキュリティのための非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# publicフォルダをコピー
COPY --from=builder /app/public ./public

# 自動的にOutput File Tracingを活用してイメージサイズを削減
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# ISR/SSRモードでserver.jsを起動
CMD ["node", "server.js"]