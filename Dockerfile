# syntax=docker/dockerfile:1

FROM node:23-alpine AS base

# libc6-compat が必要な場合があります
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 依存関係のインストール用ステージ
FROM base AS deps
# package.json と lockfile をコピー
COPY package.json package-lock.json* ./
# 依存関係をインストール
RUN npm install

# ビルド用ステージ
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js テレメトリを無効化
ENV NEXT_TELEMETRY_DISABLED=1

# Next.jsアプリケーションをビルド
RUN npm run build

# プロダクション用ステージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# ランタイム時のテレメトリを無効化する場合は以下のコメントアウトを外す
# ENV NEXT_TELEMETRY_DISABLED=1

# セキュリティのための非rootユーザーを作成
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# publicフォルダをコピー
COPY --from=builder /app/public ./public

# 自動的にOutput File Tracingを活用してイメージサイズを削減
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
# server.jsはstandalone outputによってnext buildで作成される
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]