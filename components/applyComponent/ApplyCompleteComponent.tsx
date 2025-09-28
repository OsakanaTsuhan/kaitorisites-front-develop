"use client"
import { useApplyForm } from '@/context/ApplyFormContext';
import React from 'react';

const ApplicationCompleteComponent = () => {
  const { setFormData } = useApplyForm();

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
    ip: '',
    remarks: '',
    buyingRates: []
  });
  
  const handleBackToHome = () => {
    // 実際のアプリケーションでは、ホームページにリダイレクト
    console.log('Navigate to home page');
    alert('ホームページに戻ります');
  };

  const handleNewApplication = () => {
    // 実際のアプリケーションでは、新しい申込みページにリダイレクト
    console.log('Navigate to new application page');
    alert('新しい申込みページに移動します');
  };

   

  return (
  
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-200">
        <style jsx>{`
        .text-fruit-gradient {
          background: linear-gradient(45deg, #F871A0, #F97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .success-animation {
          animation: successPulse 2s ease-in-out infinite;
        }
        
        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
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
              className="px-8 py-4 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition-all duration-300 shadow-lg"
            >
              ホームに戻る
            </button>
            <button
              onClick={handleNewApplication}
              className="px-8 py-4 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              新しい申込み
            </button>
          </div>
      </div>
  );
};

export default ApplicationCompleteComponent;