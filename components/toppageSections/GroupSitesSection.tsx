'use client'

"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import BackGroundPattern from '../figures/BackGroundPattern';
import { sites } from '@/util/groupsites';


export default function GroupSitesSection() {
  return (
    <section className="pb-16 lg:py-16 bg-primary relative overflow-hidden  -mt-1">
      {/* Background Pattern */}
      <BackGroundPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" >
        <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-16">
        グループサイト
        </h2>
         <div className="mb-12 w-full">
          <Link
              href={`https://kaitori-laboratory.com/giftcard-ranking`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mx-auto relative w-full h-50 lg:w-160 lg:h-80 rounded-lg hover:opacity-80 transition-opacity duration-300 text-center bg-primary"
            >
              <Image src={`images/group/curtain_bg2_pc.webp`} alt={`otkg`} fill className="w-full h-full object-contain" />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="text-gray-600 lg:space-y-2">
                  <p className="text-base lg:text-3xl font-semibold">Appleギフトカード</p>
                  <p className="text-xl lg:text-4xl font-bold ">買取サイト</p>
                  <p className="text-xl lg:text-4xl font-bold ">ランキング</p>
                  <p className="text-base lg:text-3xl font-semibold ">2025/10/01 最新</p>
                  <div className="mt-2 lg:mt-4 relative bg-[#ff4870] text-white font-bold text-base lg:text-xl px-8 lg:px-12 py-1 lg:py-3 rounded-full  flex items-center gap-3 border-b-4 lg:border-b-8 border-b-[#dd2950]">
                    <span className="text-sm lg:text-xl">最新ランキングをチェック</span>
                    <svg
                      className="w-4 lg:w-6 h-4 lg:h-6 bg-white rounded-full p-1 text-[#ff4870]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
              </div>
            </Link>
         </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white rounded-2xl" style={{
        background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #43FFCE, #BFAEFF) border-box',
        border: '8px solid transparent'
      }}>     
           
          {sites.map((site) => (
            <Link
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block  rounded-lg hover:opacity-80 transition-opacity duration-300 text-center p-1 sm:p-4"
            >
              <Image 
                src={`/images/group/${site.site}.png`} 
                alt={site.name} 
                width={200} 
                height={200} 
                quality={100}
                className="w-full h-full object-contain"
                priority
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 