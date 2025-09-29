# syntax=docker/dockerfile:1

FROM node:23-alpine AS base

# 必要なパッケージをインストール
RUN apk add --no-cache libc6-compat
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

# ビルド成果物を確認
RUN ls -la .next/ && ls -la .next/standalone/

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

# ポート設定
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# デバッグ用：ファイル確認
RUN ls -la ./ && ls -la ./.next/

USER nextjs

# 起動コマンド（デバッグ付き）
CMD ["sh", "-c", "echo 'Starting Next.js on port $PORT' && node server.js"]