'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BackGroundPattern from '../figures/BackGroundPattern';
import { LINE_LINK } from '@/util/appConst';

const BannerSection = () => {
  
  return (
    <section className="pb-16 px-4 relative sm:px-6 lg:px-8 bg-primary -mt-1 ">
      {/* Background Pattern */}
      <BackGroundPattern />
      <div className="max-w-4xl mx-auto space-y-8 relative">
        {/* Banner 1 */}
        <Link target="_blank" href="https://kaitori-laboratory.com/giftcard-ranking/review/?sitename=%E8%B2%B7%E5%8F%96%E3%82%B9%E3%82%A4%E3%83%BC%E3%83%88&thankscoupon=true&_gl=1*fdz3b*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg5NTUxOTYkbzgwJGcxJHQxNzU4OTU1MjI3JGoyOSRsMCRoMA.." className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/platina-banner_v2.png" alt="Banner 1" width={1000} height={1000} className="pt-6 lg:pt-24 relative" priority/>
          {/* <div className="absolute top-0 left-0 ">口コミを投稿して</div> */}
          {/* <div className="absolute top-17 left-23 lg:top-55 lg:left-60 text-xl lg:text-5xl font-bold text-primary">口コミ</div> */}
          <div className="absolute top-[40%] md:top-[46%] left-[27%] text-xl md:text-3xl lg:text-5xl font-bold text-primary">口コミ</div>
        </Link>

        {/* Banner 2 */}
        <Link href="/apply?isCouponed=true" className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/coupon_repeat_v2.png" alt="Banner 2" width={1000} height={1000} className="mt-6 lg:mt-24 relative" priority/>
          <div className="absolute top-[65%] md:top-[70%] left-[30%] text-base lg:text-4xl font-bold text-[#383838]">買取率UP</div>
        </Link>

         {/* Banner 3 */}
         <Link target="_blank" href="https://kaitori-laboratory.com/kaitori-marathon/?_gl=1*ynjut0*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg5NTUxOTYkbzgwJGcxJHQxNzU4OTU1NTM3JGo0MCRsMCRoMA.." className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/best_urawaza_2.png" alt="Banner 3" width={1000} height={1000} className="mt-6 lg:mt-24" priority/>
          <div className="absolute top-[23%] md:top-[34%] left-[38%] text-2xl md:text-4xl lg:text-6xl font-bold text-[#ff6896]">買取</div>
          <div className="absolute top-[44%] md:top-[52%] left-[2%] text-sm md:text-base lg:text-3xl font-bold text-[#ff6896]">高額</div>
          <div className="absolute top-[57%] md:top-[65%] left-[2%]  text-base md:text-lg lg:text-4xl font-bold text-[#ff6896]">買取</div>
        </Link>

        {/* Banner 4 */}
        {/* <Link href={LINE_LINK} className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/btn_line_v2.png" alt="Banner 4" width={1000} height={1000} className="mt-6 lg:mt-24" priority/>
        </Link> */}

         {/* Banner 5 */}
         <Link href="/apply?isCouponed=true" className="relative group cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <Image src="/images/banner/btn_app_v2.png" alt="Banner 5" width={1000} height={1000} className="mt-6 lg:mt-24" priority/>
        </Link>
      </div>
    </section>
  );
};

export default BannerSection;