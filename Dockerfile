FROM node:23-alpine

WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# 環境変数設定
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ビルド実行
RUN npm run build

# ポート公開
EXPOSE 3000

# アプリケーション起動
CMD ["npm", "start"]