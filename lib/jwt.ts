import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

interface AppTokenPayload {
  app: string;
  iat: number;
}

interface ApiCallOptions extends RequestInit {
  headers?: Record<string, string>;
}

// JWTトークン生成（有効期限なし）
export function generateAppToken(): string {
  const payload: AppTokenPayload = {
    app: 'nextjs-frontend',
    iat: Math.floor(Date.now() / 1000),
  };
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
}

// API呼び出し用のfetch wrapper
export async function secureApiCall<T>(
  endpoint: string, 
  options: ApiCallOptions = {}
): Promise<T> {
  const token = generateAppToken();
  
  const defaultHeaders: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendURL) {
    throw new Error('BACKEND_URL is not set');
  }

  try {
    const response = await fetch(`${backendURL}${endpoint}`, config);
    console.log("response::::")
    console.log(response);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
}