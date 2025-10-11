"use client"

import React from 'react';

interface PreviousDataSelectorProps {
  usePreviousData: boolean;
  isSearching: boolean;
  onGetPreviousData: () => void;
  onNewInput: () => void;
}

const PreviousDataSelector = ({ 
  usePreviousData, 
  isSearching, 
  onGetPreviousData, 
  onNewInput 
}: PreviousDataSelectorProps) => {
  return (
    <div className="backdrop-blur-sm rounded-2xl p-6 ">
      {/* <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        前回の申し込み情報
      </h3> */}
      <div className="space-y-4">
        {usePreviousData ? (
          <div className="text-center">
            <button 
              onClick={onNewInput}
              className="w-full px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:opacity-80 transition-opacity cursor-pointer border-2 border-gray-200 focus:border-rose-500 focus:outline-none"
            >
              前回の申し込み情報を使用しない
            </button>
          </div>
        ) : (
          <div className="text-center">
            <button 
              disabled={isSearching} 
              onClick={onGetPreviousData}
              className="w-full px-6 py-3 bg-[#43FFCE] text-black font-semibold rounded-xl hover:opacity-80 transition-opacity cursor-pointer border-2 border-gray-200 focus:border-rose-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  検索中...
                </span>
              ) : (
                '前回の申し込み情報を使用する'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousDataSelector;
