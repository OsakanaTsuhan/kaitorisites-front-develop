'use server';

import { ContactType } from '@/types/contact';
import { secureApiCall } from '@/lib/jwt';
import { ContactApiResponse, ContactResponse } from './response';
import { SITE_NO } from '@/util/appConst';


export async function submitContact({
    name,
    replyMethod,
    mail,
    tel,
    message
}: ContactType): Promise<ContactResponse> {

  const formData = new FormData();
  formData.append('site', SITE_NO);
  formData.append('name', name);
  formData.append('reply_method', replyMethod);
  formData.append('mail', mail);
  formData.append('tel', tel);
  formData.append('message', message);

  try {
    const result = await secureApiCall<ContactApiResponse>('/contact', {
      method: 'POST',
      body: formData,
    });


    if (result.message) {
      return { 
        success: true, 
        message: result.message,
      };
    } else {
      return { 
        success: false, 
        message: 'お問い合わせ中にエラーが発生しました。'
      };
    }
  } catch (error) {    
    // Extract error message from the error
    let errorMessage = 'お問い合わせ中にエラーが発生しました。';
    
    if (error instanceof Error) {
      // If it's an API error with a message, use that
      if (error.message.includes('API Error:')) {
        errorMessage = `サーバーエラー: ${error.message}`;
      } else {
        errorMessage = error.message;
      }
    }
    
    return { 
      success: false, 
      message: errorMessage
    };
  }
}