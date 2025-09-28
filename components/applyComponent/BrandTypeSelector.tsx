"use client"

import React from 'react';
import Image from 'next/image';
import { BuyingRate } from '@/types/setting';

const BrandTypeSelector = ({ selectedBrand, onBrandChange, buyingRates }: { selectedBrand: string, onBrandChange: (brand: string) => void, buyingRates: BuyingRate[] }) => {

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        券種選択
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {buyingRates.map((brand) => (
          <button
            key={brand.brand}
            onClick={() => onBrandChange(brand.brand)}
            className={`p-2 lg:p-4 rounded-xl border-2 transition-all duration-200 flex items-center cursor-pointer ${
              selectedBrand === brand.brand
                ? 'border-rose-500 bg-rose-50 text-rose-700'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="relative w-8 h-8 lg:w-10 lg:h-10 mr-3 rounded-full overflow-hidden shadow-md">
              <Image src={`/images/brands/icon_${brand.brand}.png`} alt={`${brand.brand} logo`} width={1000} height={1000} className="w-full h-full object-cover" />
            </div>
            <div className="text-sm font-medium">{brand.brand_name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandTypeSelector;