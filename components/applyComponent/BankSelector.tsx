"use client"
import React from 'react';
import { BankInfo } from '@/types/apply';

const BankSelector = ({ selectedBank, onBankChange, onClose }: { selectedBank: BankInfo, onBankChange: (bank: BankInfo) => void, onClose: () => void }) => {

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
       お振込み先口座情報
      </h3>
      <div className="space-y-4">
        <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">振込銀行</label>
              <button className="w-[100px] mr-2 bg-[#43FFCE] p-1 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors  my-2 cursor-pointer" onClick={() => onClose()}>
                選択
              </button>
              <span>{selectedBank.bank || '未選択'}</span>
        </div>
        
        
        
        <div>
          <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700 mb-2">支店名</label>
          <input
            type="text"
            id="branch_name"
            value={selectedBank.branch_name || ''}
            onChange={(e) => onBankChange({ ...selectedBank, branch_name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
            placeholder="ダンス支店"
          />
          </div>
          <div>
          <label htmlFor="branch_no" className="block text-sm font-medium text-gray-700 mb-2">支店番号</label>
          <input
            type="text"
            id="branch_no"
            value={selectedBank.branch_no || ''}
            onChange={(e) => onBankChange({ ...selectedBank, branch_no: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
            placeholder="208"
          />
          </div>
          <div>
          
          {/* <label htmlFor="account_type" className="block text-sm font-medium text-gray-700 mb-2">口座種別</label>
          <select
            id="account_type"
            value={selectedBank.account_type || '普通'}
            onChange={(e) => onBankChange({ ...selectedBank, account_type: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
          >
            <option value="普通">普通</option>
            <option value="当座">当座</option>
          </select> */}
          </div>
          <div>
          <label htmlFor="bank_no" className="block text-sm font-medium text-gray-700 mb-2">口座番号</label>
          <input
            type="text"
            id="bank_no"
            value={selectedBank.bank_no || ''}
            onChange={(e) => onBankChange({ ...selectedBank, bank_no: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
            placeholder="1234567"
          />
          </div>
          <div>
          <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-2">口座名義</label>
          <input
            type="text"
            id="bank_name"
            value={selectedBank.bank_name || ''}
            onChange={(e) => onBankChange({ ...selectedBank, bank_name: e.target.value })}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
            placeholder="ヤマダタロウ"
          />
        </div>
        {/* <p className="text-xs text-gray-500 mt-2">
          ※ 普通口座以外をご希望の場合はお問い合わせください
        </p> */}
      </div>
    </div>
  );
};

export default BankSelector;