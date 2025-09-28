'use client'

import React from 'react';
import { coiny } from "./font";

const Features = () => {
  return (
    <div className="w-full mx-auto">
    {/* Features Grid - Always 3 columns */}
    <div className="max-w-6xl py-24 mx-auto relative grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 [text-shadow:_2px_2px_0_white,_-2px_2px_0_white,_2px_-2px_0_white,_-2px_-2px_0_white]">
      
      {/* Feature 1 - 24時間対応 */}
      <div className="text-center group flex justify-center">
        <div className="border-primary-light border-3 border-solid w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] rounded-full flex items-center justify-center">
        <div className=" w-[160px] h-[160px] lg:w-[230px] lg:h-[230px]  bg-gradient-to-r from-gradation-from to-gradation-to  rounded-full p-3 sm:p-4 lg:p-6 shadow-lg flex items-center justify-center">
         
          {/* Title */}
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-1 sm:mb-2">
            <p className={`${coiny.className}
                text-[80px] lg:text-[120px] leading-none text-secondary
                [-webkit-text-stroke:6px_#0e9500] [text-stroke:6px_#0e9500]
                drop-shadow-[10px_8px_0_rgba(0,0,0,0.35)]`}>24h</p>対応
          </div>
          </div>
        </div>
      </div>

      {/* Feature 2 - 30分振込 */}
      <div className="text-center group flex justify-center">
        <div className="border-primary-light border-3 border-solid w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] rounded-full flex items-center justify-center">
        <div className=" w-[160px] h-[160px] lg:w-[230px] lg:h-[230px]  bg-gradient-to-r from-gradation-from to-gradation-to  rounded-full p-3 sm:p-4 lg:p-6 shadow-lg flex items-center justify-center">
        
        {/* Title */}
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-1 sm:mb-2">
            <div className="flex items-baseline justify-center">
              <span className={`${coiny.className}
                text-[80px] lg:text-[120px] leading-none text-secondary
                [-webkit-text-stroke:6px_#0e9500] [text-stroke:6px_#0e9500]
                drop-shadow-[10px_8px_0_rgba(0,0,0,0.35)]`} >30</span>
                    <span className="ml-3">分</span>
            </div>振込
          </div>
        </div>
        </div>
      </div>

      {/* Feature 3 - 手数料0円 */}
      <div className="text-center group flex justify-center">
        <div className="border-primary-light border-3 border-solid w-[180px] h-[180px] lg:w-[250px] lg:h-[250px] rounded-full flex items-center justify-center">
        <div className=" w-[160px] h-[160px] lg:w-[230px] lg:h-[230px]  bg-gradient-to-r from-gradation-from to-gradation-to  rounded-full p-3 sm:p-4 lg:p-6 shadow-lg flex items-center justify-center">
        {/* Title */}
          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary mb-1 sm:mb-2">
            手数料<p className={`${coiny.className}
                text-[80px] lg:text-[120px] leading-none text-secondary
                [-webkit-text-stroke:6px_#0e9500] [text-stroke:6px_#0e9500]
                drop-shadow-[10px_8px_0_rgba(0,0,0,0.35)]`} >0</p>円
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Features;