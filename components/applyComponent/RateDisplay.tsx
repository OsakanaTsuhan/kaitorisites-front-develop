"use client"

import React from 'react';
import { UsageType } from '@/types/apply';

const RateDisplay = ({ rate, usageType, couponRateUp }: { rate: number, usageType: UsageType, couponRateUp: number }) => {
  const finalRate = couponRateUp > 0 ? rate + couponRateUp : rate;
  const hasCoupon = couponRateUp > 0;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        買取率
        {hasCoupon && (
          <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            クーポン適用中
          </span>
        )}
      </h3>
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-800 mb-2">{finalRate.toFixed(1)}%</div>
        
        {hasCoupon && (
          <div className="text-sm text-green-600 mb-2 font-medium">
            +{couponRateUp.toFixed(1)}% クーポン適用
          </div>
        )}
        
        <div className="text-sm text-gray-500">{usageType === 'new' ? '初めて' : 'リピート'}のご利用</div>
      </div>
    </div>
  );
};

export default RateDisplay;