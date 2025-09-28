'use server';

import { ContactType } from '@/types/contact';
  import { secureApiCall } from '@/lib/jwt';
  import { ContactApiResponse, ContactResponse } from './response';



export async function submitContact({
    name,
    replyMethod,
    mail,
    tel,
    message
}: ContactType): Promise<ContactResponse> {
  try {
    const result = await secureApiCall<ContactApiResponse>('/contact', {
      method: 'POST',
      body: JSON.stringify({
        name,
        reply_method: replyMethod,
        mail,
        tel,
        message
      }),
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
    console.error(error);
    return { 
      success: false, 
      message: 'お問い合わせ中にエラーが発生しました。'
    };
  }
}