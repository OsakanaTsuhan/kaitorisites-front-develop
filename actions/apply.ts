'use server'; 

import { FormState } from '@/context/ApplyFormContext';
import { secureApiCall } from '@/lib/jwt';
import { ContactApiResponse } from './response';

// フォームデータを引数として受け取る
export async function submitApplication(formData: FormState, finalRate: number) {
  
  const totalAmount = formData.giftCards.reduce((sum, card) => sum + parseInt(card.amount), 0);
  const transferAmount = Math.floor(totalAmount * finalRate / 100);
  // make amount int
  const gifts = formData.giftCards.map(card => ({
    "code": card.code,
    "amount": parseInt(card.amount)
  }));

  const multipartData = new FormData();
  multipartData.append('declared_repeat', formData.usageType === 'new' ? "1" : "2");
  multipartData.append('site', 'site17');
  // brand name's first letter to uppercase
  multipartData.append('brand', formData.selectedBrand.charAt(0).toUpperCase() + formData.selectedBrand.slice(1));
  multipartData.append('total_amount', totalAmount.toString());
  multipartData.append('transfer_amount', transferAmount.toString());
  multipartData.append('name', formData.personalInfo.name);
  multipartData.append('mail', formData.personalInfo.email);
  multipartData.append('tel', formData.personalInfo.phone);
  multipartData.append('bank', formData.bankInfo.bank);
  multipartData.append('branch_name', formData.bankInfo.branch_name);
  multipartData.append('branch_no', formData.bankInfo.branch_no);
  multipartData.append('account_type', formData.bankInfo.account_type);
  multipartData.append('bank_no', formData.bankInfo.bank_no);
  multipartData.append('bank_name', formData.bankInfo.bank_name);
  
  multipartData.append('coupon', formData.couponCode);
  multipartData.append('remarks', formData.remarks);
  multipartData.append('ad', formData.ad);
  multipartData.append('affiliate', formData.affiliate);
  multipartData.append('ip', formData.ip);
  multipartData.append('gifts', JSON.stringify(gifts));

  if (formData.idImages.front) {
    multipartData.append('front_file', formData.idImages.front, formData.idImages.front.name);
  }
  if (formData.idImages.back) {
    multipartData.append('back_file', formData.idImages.back, formData.idImages.back.name);
  }


  try {
    const result = await secureApiCall<ContactApiResponse>('/apply', {
      method: 'POST',
      body: multipartData,
    });

    if (result.message) {
      return { 
        success: true, 
        message: result.message,
      };
    } else {
      return { 
        success: false, 
        message: '申込み中にエラーが発生しました。'
      };
    }
  } catch (error) {
    // console.error(error);
    return { 
      success: false, 
      message: '申込み中にエラーが発生しました。'
    };
  }
}