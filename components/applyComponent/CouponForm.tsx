"use client"
import React from 'react';

const CouponForm = ({ couponCode, onCouponCodeChange }: { couponCode: string, onCouponCodeChange: (couponCode: string) => void }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        クーポンコード入力
      </h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">クーポンコード（任意）</label>
        <input
          type="text"
          placeholder="クーポンコードをお持ちの方はご入力ください"
          value={couponCode}
          onChange={(e) => onCouponCodeChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
        />
        <p className="text-xs text-gray-500 mt-2">
          ※ クーポンの併用、申し込み後の使用はできません
        </p>
      </div>
    </div>
  );
};

export default CouponForm;