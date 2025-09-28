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

# TypeScript用の環境変数
ENV NODE_ENV=production
ENV NEXT_BUILD_LINT_IGNORE_ESLINT_ERRORS=true
ENV NEXT_BUILD_LINT_IGNORE_TYPE_ERRORS=true

# プロジェクト構造を確認（TypeScript用）
RUN echo "=== Checking TypeScript project structure ===" && \
    ls -la && \
    echo "=== Checking for TypeScript files ===" && \
    find . -name "*.tsx" -o -name "*.ts" | head -10 && \
    echo "=== Checking next.config.js/ts ===" && \
    (cat next.config.js 2>/dev/null || cat next.config.ts 2>/dev/null || echo "No next config found") && \
    echo "=== Checking tsconfig.json ===" && \
    (cat tsconfig.json 2>/dev/null || echo "No tsconfig.json found") && \
    echo "=== Checking package.json scripts ===" && \
    node -e "console.log(JSON.stringify(require('./package.json').scripts, null, 2))"

# TypeScriptの型チェックをスキップしてビルド
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