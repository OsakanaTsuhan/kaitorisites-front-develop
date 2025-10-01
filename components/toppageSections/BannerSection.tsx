'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackGroundPattern from '../figures/BackGroundPattern';
const BannerSection = () => {
  
  return (
    <section className="pb-16 px-8 relative sm:px-6 lg:px-8 bg-primary -mt-1  z-1">
      {/* Background Pattern */}
      <BackGroundPattern />
      <div className="max-w-4xl mx-auto space-y-8 relative pt-12">
        {/* Banner 1 */}
        
        <div className="mb-0 w-full text-center text-primary-light flex items-end justify-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-0.5 h-4 lg:w-1 lg:h-8 bg-primary-light rotate-130 mt-4 lg:mt-8 rounded-full"></div>
            <div className="w-0.5 h-8 lg:w-1 lg:h-16 bg-primary-light rotate-155  rounded-full"></div>
          </div>
          <div className="mx-5 text-base md:text-2xl lg:text-4xl font-bold">口コミを投稿してクーポン GET </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-0.5 h-8 lg:w-1 lg:h-16 bg-primary-light rotate-35 rounded-full"></div>
            <div className="w-0.5 h-4 lg:w-1 lg:h-8 bg-primary-light rotate-50 mt-4  lg:mt-8 -ml-0.5 rounded-full"></div>
          </div>
        </div>
        <Link target="_blank" href="https://kaitori-laboratory.com/giftcard-ranking/review/?sitename=%E8%B2%B7%E5%8F%96%E3%82%B9%E3%82%A4%E3%83%BC%E3%83%88&thankscoupon=true&_gl=1*fdz3b*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg5NTUxOTYkbzgwJGcxJHQxNzU4OTU1MjI3JGoyOSRsMCRoMA.." className="block relative h-30 md:h-80 group cursor-pointer hover:opacity-80 transition-opacity duration-300 mb-4 md:mb-0">
          <Image src="/images/banner/platina-banner_v2.png" alt="Banner 1" fill className="object-contain" priority/>
          
          <div className="pt-12 absolute top-[-29%] md:top-[2%] left-[26%] md:left-[27%] text-xl md:text-3xl lg:text-5xl font-bold text-primary">口コミ</div>
        </Link>

        {/* Banner 2 */}
        <Link href="/apply?isCouponed=true" className="block relative h-30 md:h-80 group cursor-pointer hover:opacity-80 transition-opacity duration-300 mb-4 md:mb-0">
          <Image src="/images/banner/coupon_repeat_v2.png" alt="Banner 2" fill className="object-contain" priority/>
          <div className="absolute top-[56%] md:top-[58%] left-[26%] md:left-[30%] text-base lg:text-4xl font-bold text-[#383838]">買取率UP</div>
        </Link>

         {/* Banner 3 */}
         <Link target="_blank" href="https://kaitori-laboratory.com/kaitori-marathon/?_gl=1*ynjut0*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg5NTUxOTYkbzgwJGcxJHQxNzU4OTU1NTM3JGo0MCRsMCRoMA.." className="block relative h-30 md:h-80 group cursor-pointer hover:opacity-80 transition-opacity duration-300 mb-4 md:mb-0">
          <Image src="/images/banner/best_urawaza_2.png" alt="Banner 3" fill className="object-contain" priority/>
          <div className="absolute top-[10%] md:top-[17%] left-[37%] text-2xl md:text-4xl lg:text-6xl font-bold text-[#ff6896]">買取</div>
          <div className="absolute top-[34%] md:top-[38%] left-[1%] md:left-[2%] text-sm md:text-base lg:text-3xl font-bold text-[#ff6896]">高額</div>
          <div className="absolute top-[49%] md:top-[52%] left-[2%]  text-sm md:text-base lg:text-3xl font-bold text-[#ff6896]">買取</div>
        </Link>

        {/* Banner 4 */}
        {/* <Link href={LINE_LINK} className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/btn_line_v2.png" alt="Banner 4" width={1000} height={1000} className="mt-6 lg:mt-24" priority/>
        </Link> */}

         {/* Banner 5 */}
         <Link href="/apply?isCouponed=true" className="block relative h-30 md:h-80 group cursor-pointer hover:opacity-80 transition-opacity duration-300 mb-4 md:mb-0">
          <Image src="/images/banner/btn_app_v2.png" alt="Banner 5" fill className="object-contain" priority/>
        </Link>
      </div>
    </section>
  );
};

export default BannerSection;