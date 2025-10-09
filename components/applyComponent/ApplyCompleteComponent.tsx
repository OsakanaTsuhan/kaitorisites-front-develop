"use client"
import { useApplyForm } from '@/context/ApplyFormContext';
import { useRouter } from 'next/navigation';
import React from 'react';

const ApplicationCompleteComponent = () => {
  const { setFormData, formData } = useApplyForm();
  const router = useRouter();

  if(formData.selectedBrand !== '') {
    // formDataの中身を空に
    setFormData({
      selectedBrand: '',
      usageType: 'new',
      giftCards: [],
      personalInfo: {
        name: '',
        email: '',
        phone: ''
      },
      bankInfo: {
        bank: '',
        branch_name: '',
        branch_no: '',
        account_type: '',
        bank_no: '',
        bank_name: ''
      },
      idImages: {
        front: null,
        back: null
      },
      couponRateUp: 0,
      couponCode: '',
      ad: '',
      affiliate: '',
      remarks: '',
      buyingRates: [],
      previousOrderId: ''
    });
  }
  const handleBackToHome = () => {
    router.push('/');
  };

  

  return (
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-200 text-center">
           <div className="success-animation mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
            ギフト券買取の申込みを<br className="sm:hidden" />
            受付いたしました
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBackToHome}
              className="px-8 py-4 bg-accent font-semibold rounded-full cursor-pointer duration-300 shadow-lg"
            >
              ホームに戻る
            </button>
          </div>
      </div>
  );
};

export default ApplicationCompleteComponent;