// app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // 基本的なヘルスチェック
    return NextResponse.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'kaitori-frontend'
    })
  } catch (error) {
    return NextResponse.json(
      { status: 'error', error: 'Service unavailable' }, 
      { status: 503 }
    )
  }
}