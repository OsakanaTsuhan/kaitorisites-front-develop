import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get IP from Cloudflare headers
    const cfIP = request.headers.get('cf-connecting-ip');
    const xForwardedFor = request.headers.get('x-forwarded-for');
    const xRealIP = request.headers.get('x-real-ip');
    
    let ip = 'unknown';
    
    if (cfIP) {
      ip = cfIP;
    } else if (xForwardedFor) {
      // X-Forwarded-For can contain multiple IPs, take the first one
      ip = xForwardedFor.split(',')[0].trim();
    } else if (xRealIP) {
      ip = xRealIP;
    }
    
    return NextResponse.json({ ip });
  } catch (error) {
    console.error('Error getting IP address:', error);
    return NextResponse.json({ ip: 'unknown' });
  }
}
