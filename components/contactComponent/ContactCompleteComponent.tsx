"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const ContactCompleteComponent = () => {
  const router = useRouter();
  const handleBackToHome = () => {
    router.push('/');
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
        {/* Success Icon */}
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
        お問い合わせを<br className="sm:hidden" />
        受付いたしました
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleBackToHome}
          className="px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-gray-600 transition-all duration-300 shadow-lg"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  );
};

export default ContactCompleteComponent;