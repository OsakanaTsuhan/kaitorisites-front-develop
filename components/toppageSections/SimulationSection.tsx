"use client"
import React, { useState } from 'react';
import { BuyingRate } from '@/types/setting';
import Image from 'next/image';
import PageHeader from '../PageHeader';

const SimulationSection = ({brandRates}: {brandRates: BuyingRate[]}) => {
  const [selectedBrand, setSelectedBrand] = useState('apple');
  const [faceValue, setFaceValue] = useState(50000);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentBrand = brandRates.find(brand => brand.brand === selectedBrand) as BuyingRate;
  const newUserBuybackAmount = Math.floor(faceValue * (currentBrand.new_user / 100));
  const repeatUserBuybackAmount = Math.floor(faceValue * (currentBrand.repeat_user / 100));

  // 券種変更
  const handleBrandChange = (ticketKey: string) => {
    setSelectedBrand(ticketKey);
    setIsDropdownOpen(false);
  };

  // 率を小数点第一位まで表示する関数
  const formatRate = (rate: number | string): string => {
    const numRate = typeof rate === 'string' ? parseFloat(rate) : rate;
    return numRate.toFixed(1);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-light">
      <style jsx>{`
        .text-fruit-gradient {
          background: linear-gradient(to bottom, #FF6E8A, #ff99ad);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .slider-no-focus:focus {
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
        }
        .slider-no-focus::-webkit-slider-thumb {
          appearance: none !important;
          width: 40px !important;
          height: 40px !important;
          border-radius: 50% !important;
          background: url('/images/brands/icon_${selectedBrand}.png') center/contain no-repeat !important;
          background-color: white !important;
       
          cursor: pointer !important;
          outline: none !important;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
        }
        .slider-no-focus::-moz-range-thumb {
          width: 40px !important;
          height: 40px !important;
          border-radius: 50% !important;
          background: url('/images/brands/icon_${selectedBrand}.png') center/contain no-repeat !important;
          background-color: white !important;
          border: 3px solid #ec4899 !important;
          cursor: pointer !important;
          outline: none !important;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
        }
        .slider-no-focus::-webkit-slider-track {
          height: 8px !important;
          border-radius: 4px !important;
        }
        .slider-no-focus::-moz-range-track {
          height: 8px !important;
          border-radius: 4px !important;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-1 lg:px-6">
         <div className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-12 relative">
            <span className="text-gray-800">買取</span>
            <span className="text-fruit-gradient">シミュレーション</span>
            <div className="absolute top-[-45px] right-[10px] lg:top-[-60px] lg:right-[200px] bg-[#15d600] text-white p-2 lg:p-3 rounded-full text-xs lg:text-sm font-semibold shadow-lg z-10 speech-bubble">
                LINE
            </div>
          </div>
          <p className="text-base lg:text-lg text-center mb-18 text-gray-600">
            LINE申込での買取額をシミュレーションしてみましょう
          </p>

    
        {/* Simulation Form */}
        <div className="bg-white border-8 border-primary rounded-2xl px-8 lg:px-24 py-16 lg:py-24 lg:pb-24 relative mt-36 lg:mt-72">
          <div className="w-full flex justify-center absolute lg:top-[-325px] top-[-198px] left-0 right-0 z-0">
            <Image src="/images/simulation_v2.png" alt="Banner 1" width={300} height={300} className="w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] object-contain" />
          </div>
          
          {/* 券種選択 */}
          <div className="mb-6 relative z-10">
            
            <label className="block text-sm font-medium text-gray-700 mb-2">
              券種を選択
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full lg:w-1/2 h-12 lg:h-18 px-4 bg-white border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors text-lg flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="relative w-8 h-8 lg:w-10 lg:h-10 mr-3 lg:mr-4 rounded-full overflow-hidden">
                    <Image 
                      src={`/images/brands/icon_${selectedBrand}.png`} 
                      alt={`${selectedBrand} logo`} 
                      width={32} 
                      height={32}
                      className="object-contain w-8 h-8 lg:w-10 lg:h-10 cursor-pointer"
                    />
                  </div>
                  <span className="capitalize">{selectedBrand}</span>
                </div>
                <svg 
                  className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 w-full lg:w-1/2 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {brandRates.map((brandRate, index) => (
                    <button
                      key={index}
                      onClick={() => handleBrandChange(brandRate.brand)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center transition-colors"
                    >
                      <div className="relative w-8 h-8 mr-3 rounded-full overflow-hidden">
                        <Image 
                          src={`/images/brands/icon_${brandRate.brand}.png`} 
                          alt={`${brandRate.brand} logo`} 
                          width={32} 
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="capitalize">{brandRate.brand}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 額面スライダー */}
          <div className="my-8 lg:my-12">
            <label className="block font-medium text-gray-700 mb-4">
              ギフト券額面:
              <span className="text-2xl font-bold text-gray-700"> ¥{faceValue.toLocaleString()}</span>
            </label>
            <div className="flex items-center space-x-4">
              {/* Minus Button */}
              <button
                type="button"
                onClick={() => setFaceValue(Math.max(1000, faceValue - 1000))}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer"
                disabled={faceValue <= 1000}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              {/* Range Slider */}
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={faceValue}
                  onChange={(e) => setFaceValue(Number(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-no-focus"
                  style={{
                    outline: 'none',
                    boxShadow: 'none',
                    background: `linear-gradient(to right, #FF6E8A 0%, #FF6E8A ${((faceValue - 1000) / (500000 - 1000)) * 100}%, #e5e7eb ${((faceValue - 1000) / (500000 - 1000)) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
              
              {/* Plus Button */}
              <button
                type="button"
                onClick={() => setFaceValue(Math.min(500000, faceValue + 1000))}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer"
                disabled={faceValue >= 500000}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>¥1,000</span>
              <span>¥500,000</span>
            </div>
          </div>

          {/* 結果表示 */}
          <div className="bg-white rounded-xl py-6">
            {currentBrand && (
              <div className="text-center">
                {/* 両率の比較表示 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-rose-50 border-2 border-rose-200">
                    <div className="text-sm lg:text-base text-gray-600 mb-2 font-bold">初回</div>
                    <div className="text-2xl lg:text-3xl font-bold text-rose-600 mb-1">
                      ¥{newUserBuybackAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      買取率: {formatRate(currentBrand.new_user)}%
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border-2 border-blue-200">
                    <div className="text-sm lg:text-base text-gray-600 mb-2 font-bold">2回目以降</div>
                    <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-1">
                      ¥{repeatUserBuybackAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      買取率: {formatRate(currentBrand.repeat_user)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* warning */}
            <div className="text-sm text-gray-500 mt-1 text-center">
              ※表示価格はLINE申込みの場合です
            </div>
        </div>

      </div>
    </section>
  );
};

export default SimulationSection;