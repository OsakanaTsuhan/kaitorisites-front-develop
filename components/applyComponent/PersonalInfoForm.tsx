"use client"

import React from 'react';
import { PersonalInfo } from '@/types/apply';
    
const PersonalInfoForm = ({ personalInfo, onPersonalInfoChange, usePreviousData }: { personalInfo: PersonalInfo, onPersonalInfoChange: (personalInfo: PersonalInfo) => void, usePreviousData: boolean }) => {
  const updateField = (field: string, value: string) => {
    onPersonalInfoChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className={`${usePreviousData ? 'bg-gray-100' : 'bg-white'}  backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        お客様情報入力
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">お名前</label>
          <input
            type="text"
            placeholder="田中 太郎"
            value={personalInfo.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
            required
            disabled={usePreviousData}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={personalInfo.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
            required
            disabled={usePreviousData}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
          <input
            type="tel"
            placeholder="09012345678"
            value={personalInfo.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
            required
            disabled={usePreviousData}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;