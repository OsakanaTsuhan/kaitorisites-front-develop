// Function to get user's IPv4 address from Cloudflare headers
export async function getUserIP(): Promise<string> {
  try {
    // Make a request to a service that returns the IP
    const response = await fetch('/api/get-ip', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch IP');
    }
    
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    // console.error('Error getting IP address:', error);
    return 'unknown';
  }
}

// Check if an IP address is IPv4
function isIPv4(ip: string): boolean {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Pattern.test(ip)) return false;
  
  // Validate each octet is 0-255
  const octets = ip.split('.');
  return octets.every(octet => {
    const num = parseInt(octet, 10);
    return num >= 0 && num <= 255;
  });
}

// Extract IPv4 from IPv6 if it's an IPv4-mapped IPv6 address
function extractIPv4FromIPv6(ip: string): string | null {
  // IPv4-mapped IPv6: ::ffff:192.0.2.1
  const ipv4MappedPattern = /::ffff:(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/i;
  const match = ip.match(ipv4MappedPattern);
  if (match) return match[1];
  
  // 6to4: 2002:c000:0201::1 (c000:0201 = 192.0.2.1 in hex)
  const sixToFourPattern = /^2002:([0-9a-f]{4}):([0-9a-f]{4})/i;
  const sixToFourMatch = ip.match(sixToFourPattern);
  if (sixToFourMatch) {
    const hex1 = parseInt(sixToFourMatch[1], 16);
    const hex2 = parseInt(sixToFourMatch[2], 16);
    const octet1 = (hex1 >> 8) & 0xff;
    const octet2 = hex1 & 0xff;
    const octet3 = (hex2 >> 8) & 0xff;
    const octet4 = hex2 & 0xff;
    return `${octet1}.${octet2}.${octet3}.${octet4}`;
  }
  
  return null;
}

// Get IPv4 address from headers (server-side only)
export function getIPFromHeaders(headers: Headers): string {
  // Cloudflare provides the real user IP in CF-Connecting-IP header
  const cfIP = headers.get('cf-connecting-ip');
  if (cfIP) {
    // If it's IPv4, return it
    if (isIPv4(cfIP)) {
      return cfIP;
    }
    // If it's IPv6, try to extract IPv4
    const extractedIPv4 = extractIPv4FromIPv6(cfIP);
    if (extractedIPv4) {
      return extractedIPv4;
    }
  }
  
  // Fallback to X-Forwarded-For (but CF-Connecting-IP is more reliable with Cloudflare)
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // X-Forwarded-For can contain multiple IPs, check each one
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    for (const ip of ips) {
      if (isIPv4(ip)) {
        return ip;
      }
      const extractedIPv4 = extractIPv4FromIPv6(ip);
      if (extractedIPv4) {
        return extractedIPv4;
      }
    }
  }
  
  // Fallback to X-Real-IP
  const xRealIP = headers.get('x-real-ip');
  if (xRealIP) {
    if (isIPv4(xRealIP)) {
      return xRealIP;
    }
    const extractedIPv4 = extractIPv4FromIPv6(xRealIP);
    if (extractedIPv4) {
      return extractedIPv4;
    }
  }
  
  return 'unknown';
}

// API Route example: app/api/get-ip/route.ts or pages/api/get-ip.ts
// 
// For App Router (app/api/get-ip/route.ts):
// import { NextRequest, NextResponse } from 'next/server';
// import { getIPFromHeaders } from '@/lib/ip-utils';
//
// export async function GET(request: NextRequest) {
//   const ip = getIPFromHeaders(request.headers);
//   return NextResponse.json({ ip });
// }
//
// For Pages Router (pages/api/get-ip.ts):
// import type { NextApiRequest, NextApiResponse } from 'next';
// import { getIPFromHeaders } from '@/lib/ip-utils';
//
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const headers = new Headers();
//   Object.entries(req.headers).forEach(([key, value]) => {
//     if (value) headers.set(key, Array.isArray(value) ? value[0] : value);
//   });
//   const ip = getIPFromHeaders(headers);
//   res.status(200).json({ ip });
// }