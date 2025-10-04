// Function to get user's IP address from Cloudflare headers
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
    console.error('Error getting IP address:', error);
    return 'unknown';
  }
}

// Alternative: Get IP from headers in server-side context
export function getIPFromHeaders(headers: Headers): string {
  // Cloudflare provides the real IP in CF-Connecting-IP header
  const cfIP = headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;
  
  // Fallback to other common headers
  const xForwardedFor = headers.get('x-forwarded-for');
  if (xForwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim();
  }
  
  const xRealIP = headers.get('x-real-ip');
  if (xRealIP) return xRealIP;
  
  return 'unknown';
}
