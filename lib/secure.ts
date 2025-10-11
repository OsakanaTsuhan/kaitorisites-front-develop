'use server'
import { SITE_EN } from "@/util/appConst";
import { cookies, headers } from "next/headers";
const SECRET_KEY  = process.env.NEXT_PUBLIC_JWT_SECRET || 'abcdefghijklmnopqrstuvwxyz';

function lightEncrypt(text: string): string {
const xored = text
    .split('')
    .map((char, i) => 
    String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
    )
    .join('')

    return Buffer.from(xored).toString('base64')
}

function lightDecrypt(encrypted: string): string {
    const xored = Buffer.from(encrypted, 'base64').toString()

    return xored
        .split('')
        .map((char, i) => 
        String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length))
        )
        .join('')
}

/**
 * anon_idとsite_idをセキュアに保存するServer Action
 */
export async function setUserIds(anonId: string, siteId: string) {
    const cookieStore = await cookies()
    const cookie_name = SITE_EN + '_previous_ids'
    // JSONとして暗号化
    const data = JSON.stringify({ anon_id: anonId, site_id: siteId })
    const encrypted = lightEncrypt(data)
    
    cookieStore.set(cookie_name, encrypted, {
      httpOnly: true,        // JavaScriptからアクセス不可（XSS対策）
      secure: true,          // HTTPS通信のみ（本番環境で有効）
      sameSite: 'strict',    // CSRF対策
      maxAge: 60 * 60 * 24 * 60, // 60日間有効
      path: '/apply',        // /applyパスでのみ有効（セキュリティ向上）
    })
    
    return { success: true }
  }
  
  /**
   * anon_idとsite_idを取得するServer Action
   */
  export async function getUserIds(): Promise<{ anonId: string, siteId: string }> {
    const cookieStore = await cookies()
    const cookie_name = SITE_EN + '_previous_ids'
    const cookie = cookieStore.get(cookie_name)
    
    if (!cookie?.value) return { anonId: '', siteId: '' }
    
    try {
      const decrypted = lightDecrypt(cookie.value)
      const data = JSON.parse(decrypted)
      
      return {
        anonId: data.anon_id,
        siteId: data.site_id
      }
    } catch (error) {
      console.error('Failed to decrypt or parse cookie:', error)
      return {
        anonId: '',
        siteId: ''
      }
    }
  }
  
  /**
   * _previous_ids Cookieを削除するServer Action
   */
  export async function deleteUserIds() {
    const cookieStore = await cookies()
    const cookie_name = SITE_EN + '_previous_ids'
    cookieStore.delete(cookie_name)
    
    return { success: true }
  }
  
  /**
   * 汎用：セキュアにCookieにデータを保存するServer Action
   */
  export async function setSecureCookie(key: string, value: string) {
    const cookieStore = await cookies()
    const encrypted = lightEncrypt(value)
    
    cookieStore.set(key, encrypted, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/apply',
    })
    
    return { success: true }
  }
  
  /**
   * 汎用：Cookieからデータを取得するServer Action
   */
  export async function getSecureCookie(key: string) {
    const cookieStore = await cookies()
    const cookie = cookieStore.get(key)
    
    if (!cookie?.value) return null
    
    try {
      return lightDecrypt(cookie.value)
    } catch (error) {
      console.error('Failed to decrypt cookie:', error)
      return null
    }
  }
  
  /**
   * 汎用：Cookieを削除するServer Action
   */
  export async function deleteSecureCookie(key: string) {
    const cookieStore = await cookies()
    cookieStore.delete(key)
    
    return { success: true }
  }