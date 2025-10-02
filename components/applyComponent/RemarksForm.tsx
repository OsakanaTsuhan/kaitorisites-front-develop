"use client"

import Link from 'next/link';
import React from 'react';

const RemarksForm = ({ remarks, onRemarksChange }: { remarks: string, onRemarksChange: (remarks: string) => void }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        備考
      </h3>
      <div>
        <textarea
          placeholder="ご要望、その他お伝えしたいことがございましたらご記入ください"
          value={remarks}
          onChange={(e) => onRemarksChange(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors resize-none"
        />
        <p className="text-xs text-gray-500 mt-2">
          ※ ご質問は<Link href="/contact" target="_blank" className="text-rose-500">お問い合わせ</Link>からお願い致します
        </p>
      </div>
    </div>
  );
};

export default RemarksForm;