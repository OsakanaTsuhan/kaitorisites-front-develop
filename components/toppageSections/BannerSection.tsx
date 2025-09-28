'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackGroundPattern from '../figures/BackGroundPattern';
import Features from './Feature';

const BannerSection = () => {
  const LINK_LINK = process.env.NEXT_PUBLIC_LINK_LINK;
  return (
    <section className="pb-16 px-4 relative sm:px-6 lg:px-8 bg-primary -mt-1 ">
        {/* <div className="absolute top-1/8 left-2 w-6 h-4 bg-gradient-to-r from-pink-300 to-pink-500 rounded-full opacity-60 animate-bounce shadow-lg transform rotate-25" style={{animationDelay: '9s'}}></div>
        <div className="absolute top-3/8 right-1 w-7 h-5 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full opacity-65 animate-bounce shadow-lg transform -rotate-25" style={{animationDelay: '9.5s'}}></div>
        <div className="absolute bottom-1/8 left-1 w-5 h-3 bg-gradient-to-r from-green-300 to-green-500 rounded-full opacity-55 animate-bounce shadow-lg transform rotate-35" style={{animationDelay: '10s'}}></div>
        <div className="absolute bottom-3/8 right-2 w-8 h-6 bg-gradient-to-r from-purple-300 to-purple-500 rounded-full opacity-70 animate-bounce shadow-lg transform -rotate-35" style={{animationDelay: '10.5s'}}></div>
        <div className="absolute top-5/8 left-3 w-6 h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full opacity-60 animate-bounce shadow-lg transform rotate-45" style={{animationDelay: '11s'}}></div>
        <div className="absolute top-7/8 right-3 w-7 h-5 bg-gradient-to-r from-red-300 to-red-500 rounded-full opacity-65 animate-bounce shadow-lg transform -rotate-45" style={{animationDelay: '11.5s'}}></div>
        <div className="absolute bottom-5/8 left-2 w-5 h-3 bg-gradient-to-r from-cyan-300 to-cyan-500 rounded-full opacity-55 animate-bounce shadow-lg transform rotate-55" style={{animationDelay: '12s'}}></div>
        <div className="absolute bottom-7/8 right-1 w-6 h-4 bg-gradient-to-r from-violet-300 to-violet-500 rounded-full opacity-60 animate-bounce shadow-lg transform -rotate-55" style={{animationDelay: '12.5s'}}></div>
 */}

      {/* Background Pattern */}
      <BackGroundPattern />
      <div className="max-w-4xl mx-auto space-y-8">
        

        {/* Banner 1 */}
        <Link target="_blank" href="https://kaitori-laboratory.com/giftcard-ranking/review/?sitename=%E8%B2%B7%E5%8F%96%E3%82%B9%E3%82%A4%E3%83%BC%E3%83%88&thankscoupon=true&_gl=1*fdz3b*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg5NTUxOTYkbzgwJGcxJHQxNzU4OTU1MjI3JGoyOSRsMCRoMA.." className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/platina-banner_v2.png" alt="Banner 1" width={1000} height={1000} className="pt-6 lg:pt-24" />
        </Link>

        {/* Banner 2 */}
        <Link href="/apply?isCouponed=true" className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/coupon_repeat_v2.png" alt="Banner 1" width={1000} height={1000} className="mt-6 lg:mt-24" />
        </Link>

         {/* Banner 3 */}
         <Link target="_blank" href="https://kaitori-laboratory.com/kaitori-marathon/?_gl=1*ynjut0*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg5NTUxOTYkbzgwJGcxJHQxNzU4OTU1NTM3JGo0MCRsMCRoMA.." className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/best_urawaza_2.png" alt="Banner 1" width={1000} height={1000} className="mt-6 lg:mt-24" />
        </Link>

        {/* Banner 4 */}
        {LINK_LINK && (
        <Link href={LINK_LINK} className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/btn_line_v2.png" alt="Banner 1" width={1000} height={1000} className="mt-6 lg:mt-24" />
        </Link>
        )}

         {/* Banner 5 */}
         <Link href="/apply" className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/btn_app_v2.png" alt="Banner 1" width={1000} height={1000} className="mt-6 lg:mt-24" />
        </Link>
      </div>
      {/* <Features /> */}
    </section>
  );
};

export default BannerSection;