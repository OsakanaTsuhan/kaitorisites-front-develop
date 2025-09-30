"use client"

import { UsageType } from '@/types/apply';
import React from 'react';

const UsageTypeSelector = ({ usageType, onUsageTypeChange }: { usageType: UsageType, onUsageTypeChange: (usageType: UsageType) => void }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        ご利用回数選択
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onUsageTypeChange('new')}
          className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            usageType === 'new'
               ? 'border-rose-500 bg-rose-50 text-rose-700'
                : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-base lg:text-lg ">初回</div>
        </button>
        <button
          onClick={() => onUsageTypeChange('repeat')}
          className={`p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
            usageType === 'repeat'
                ? 'border-rose-500 bg-rose-50 text-rose-700'
                : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="text-base lg:text-lg ">2回目以降</div>
        </button>
      </div>
    </div>
  );
};

export default UsageTypeSelector;