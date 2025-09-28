'use client'
import React, { useState, useEffect } from 'react';
import { BuyingRate } from '@/types/setting';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormatRate } from '@/util/apply';

const lineBuyingRates = [
  {
    brand: 'apple',
    brand_name: 'Apple',
    new_user: 95.5,
    repeat_user: 90.5
  },
  {
    brand: 'amazon',
    brand_name: 'Amazon',
    new_user: 95.5,
    repeat_user: 90.5
  },
  {
    brand: 'rakuten',
    brand_name: 'Rakuten',
    new_user: 95.5,
    repeat_user: 90.5
  },
  {
    brand: 'googleplay',
    brand_name: 'Google Play',
    new_user: 95.5,
    repeat_user: 90.5
  },
  
]

const RateSection = ({isVisible, buyingRates}: {isVisible: boolean, buyingRates: BuyingRate[]}) => {
  const LINK_LINK = process.env.NEXT_PUBLIC_LINK_LINK;
  const [showRepeatRate, setShowRepeatRate] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // 3秒おきにnew_userとrepeat_userの率を切り替える
    const interval = setInterval(() => {
      setShowRepeatRate(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-light">
      {/* Custom fruit colors */}

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            現在の<span className="text-fruit-gradient">買取率</span>
          </h2>
        </div>

        {/* Rate Grid - 2 columns on mobile, 4 columns on desktop */}
        <div >
          
          <div className={`grid gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        } grid-cols-2 lg:grid-cols-4`}>
          {lineBuyingRates.map((rate, index) => (
            <div
              key={index}
              className="relative rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-orange-100 group cursor-pointer"
              style={{
                background: 'linear-gradient(to bottom, #86efac, white)'
              }}
              onClick={() => {
                // router.push(`/apply?brand=${rate.brand}`);
                // router.push(`/apply?brand=${rate.brand}`);
                router.push(LINK_LINK || '');
              }}
            >
                <div className="absolute top-[-10px] right-[-10px] bg-[#15d600] text-white p-2 lg:p-3 rounded-full text-xs lg:text-sm font-semibold shadow-lg z-10 speech-bubble">
                  LINE
                </div>
              {/* Brand Header */}
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden shadow-md">
                  <Image src={`/images/brands/icon_${rate.brand}.png`} alt={`${rate.brand} logo`} width={1000} height={1000} />
                </div>
                <div className="flex flex-col items-start">
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-primary transition-colors">
                    {rate.brand_name}
                  </h3>
                </div>
              </div>
              
              {/* Rate Display with Animation */}
              <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden">
                {/* New User Rate */}
                <div className={`pb-1 absolute inset-0 flex flex-col items-center justify-center rate-transition ${
                  !showRepeatRate ? 'rate-active' : 'rate-enter'
                }`}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fruit-gradient mb-2">
                    <span className="text-6xl sm:text-7xl lg:text-8xl">{FormatRate(rate.new_user)}</span>%
                  </div>
                  <div className="py-1 px-2 rounded-lg text-sm text-white bg-[#35cca4]">
                    初回
                  </div>
                </div>
                
                {/* Repeat User Rate */}
                <div className={`pb-1 absolute inset-0 flex flex-col items-center justify-center rate-transition ${
                  showRepeatRate ? 'rate-active' : 'rate-enter'
                }`}>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fruit-gradient mb-2">
                    <span className="text-6xl sm:text-7xl lg:text-8xl">{FormatRate(rate.repeat_user)}</span>%
                  </div>
                  <div className="py-1 px-2 rounded-lg text-sm text-white bg-primary">
                    2回目以降
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className={`grid gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 transition-all duration-700 delay-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        } grid-cols-2 lg:grid-cols-4`}>
            {buyingRates.map((rate, index) => (
              <div
                key={index}
                className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-orange-100 group cursor-pointer"
                onClick={() => {
                  router.push(`/apply?brand=${rate.brand}`);
                }}
              >
                {/* Brand Header */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-10 h-10 mr-3 rounded-full overflow-hidden shadow-md">
                    <Image src={`/images/brands/icon_${rate.brand}.png`} alt={`${rate.brand} logo`} width={1000} height={1000} />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-primary transition-colors">
                      {rate.brand_name}
                    </h3>
                  </div>
                </div>
                
                {/* Rate Display with Animation */}
                <div className="relative h-24 sm:h-28 lg:h-32 overflow-hidden">
                  {/* New User Rate */}
                  <div className={`pb-1 absolute inset-0 flex flex-col items-center justify-center rate-transition ${
                    !showRepeatRate ? 'rate-active' : 'rate-enter'
                  }`}>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fruit-gradient mb-2">
                      <span className="text-6xl sm:text-7xl lg:text-8xl">{FormatRate(rate.new_user)}</span>%
                    </div>
                    <div className="py-1 px-2 rounded-lg text-sm text-white bg-[#35cca4]">
                      初回
                    </div>
                  </div>
                  
                  {/* Repeat User Rate */}
                  <div className={`pb-1 absolute inset-0 flex flex-col items-center justify-center rate-transition ${
                    showRepeatRate ? 'rate-active' : 'rate-enter'
                  }`}>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fruit-gradient mb-2">
                      <span className="text-6xl sm:text-7xl lg:text-8xl">{FormatRate(rate.repeat_user)}</span>%
                    </div>
                    <div className="py-1 px-2 rounded-lg text-sm text-white bg-primary">
                      2回目以降
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RateSection;