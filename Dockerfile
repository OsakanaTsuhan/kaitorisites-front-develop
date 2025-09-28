# syntax=docker/dockerfile:1

FROM node:23-alpine AS base

# 必要なパッケージをインストール
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# 依存関係のインストール
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

# 本番環境でビルド
ENV NODE_ENV=production

# Next.jsアプリケーションをビルド
RUN npm run build

# プロダクション用ステージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# 非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 必要なファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# ヘルスチェックエンドポイントを追加
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]