"use client"

import React from 'react';

interface RememberMeFormProps {
  isRememmber: boolean;
  onIsRememmberChange: (isRememmber: boolean) => void;
}

const RememberMeForm = ({ 
  isRememmber, 
  onIsRememmberChange 
}: RememberMeFormProps) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        データ保存設定
      </h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            checked={isRememmber}
            onChange={() => onIsRememmberChange(!isRememmber)}
            className="w-5 h-5 text-accent bg-gray-100 border-gray-300 rounded focus:ring-accent focus:ring-2"
          />
          <label htmlFor="remember-me" className="ml-3 text-sm font-medium text-gray-700">
            次回のお客様情報を自動入力する
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ※ チェックを入れると、次回の申し込み時にお客様情報とお振込み先情報を直近の申込情報から自動で入力可能です。
          セキュリティのため、暗号化して保存されます。
        </p>
      </div>
    </div>
  );
};

export default RememberMeForm;
