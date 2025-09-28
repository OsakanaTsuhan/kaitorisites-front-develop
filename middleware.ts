// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 環境変数でBasic認証の有効/無効を制御
  const basicAuthEnabled = process.env.BASIC_AUTH_ENABLED === 'true'
  
  // Basic認証が無効の場合はスキップ
  if (!basicAuthEnabled) {
    return NextResponse.next()
  }

  // Basic認証をスキップするパスを定義
  const publicPaths = ['/api/health', '/favicon.ico', '/_next', '/public']
  const pathname = request.nextUrl.pathname

  // パブリックパスの場合はスキップ
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // 認証ヘッダーを取得
  const authHeader = request.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    // 認証ヘッダーがない場合、認証ダイアログを表示
    return new Response('認証が必要です', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'text/plain; charset=utf-8'
      }
    })
  }

  // Base64デコードして認証情報を取得
  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
  const [username, password] = credentials.split(':')

  // 環境変数から認証情報を取得（本番環境では必ず環境変数を使用）
  const validUsername = process.env.BASIC_AUTH_USER || 'admin'
  const validPassword = process.env.BASIC_AUTH_PASSWORD || 'maguroya3'

  // 認証チェック
  if (username !== validUsername || password !== validPassword) {
    return new Response('認証に失敗しました', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'text/plain; charset=utf-8'
      }
    })
  }

  // 認証成功時は次の処理に進む
  return NextResponse.next()
}

// ミドルウェアを適用するパスを設定
export const config = {
  matcher: [
    /*
     * 以下のパスを除外してすべてのパスにマッチ:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}