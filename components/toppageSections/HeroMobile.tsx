"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BuyingRate, SiteSetting } from '@/types/setting';
import { coiny } from './font';
import Link from 'next/link';
import { LINE_LINK, LINE_RATE_UP } from '@/util/appConst';
import { useRouter } from 'next/navigation';

const HeroMobile = ({appleRate, siteSetting}: {appleRate: BuyingRate, siteSetting: SiteSetting}) => {
  const [showRepeatRate, setShowRepeatRate] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  const newUserLineRate = appleRate.new_user + LINE_RATE_UP;
  const repeatUserLineRate = appleRate.repeat_user + LINE_RATE_UP;

  const router = useRouter();
  useEffect(() => {
    // 4秒おきにnew_userとrepeat_userの率を切り替える
    const interval = setInterval(() => {
      setShowRepeatRate(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBottomButton(scrollTop > 100); // Show button after scrolling 100px
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-auto bg-primary">
       {/* Custom styles for fast css implementation */}
       <style jsx>{`
        .star-rotate {
          animation: rotate 6s linear infinite;
        }
        
        .star-rotate-reverse {
          animation: rotate-reverse 8s linear infinite;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes rotate-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .star-outline {
          stroke: white;
          stroke-width: 0.5;
          fill: none;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
        }
              `}</style>
              

       {/* Rotating Stars */}
       <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 star-rotate">
          <svg width="150" height="150" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-15 right-0 star-rotate-reverse">
          <svg width="100" height="100" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-30 left-0 star-rotate">
          <svg width="100" height="100" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 -right-5 star-rotate-reverse">
          <svg width="120" height="120" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-28 w-8 h-5 bg-gradient-to-r from-pink-400/30 to-pink-600/30 rounded-full animate-bounce transform rotate-12"></div>
        <div className="absolute top-15 left-12 w-8 h-4 bg-gradient-to-r from-orange-400/40 to-orange-600/40 rounded-full animate-bounce transform -rotate-12" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-30 right-6 w-8 h-5 bg-gradient-to-r from-purple-400/35 to-purple-600/35 rounded-full animate-bounce transform rotate-45" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-8 w-10 h-6 bg-gradient-to-r from-yellow-400/50 to-yellow-600/50 rounded-full animate-bounce transform -rotate-45" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-45 right-10 w-8 h-5 bg-gradient-to-r from-yellow-400/40 to-yellow-600/40 rounded-full animate-bounce transform rotate-12" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-5 w-6 h-4 bg-gradient-to-r from-blue-400/45 to-blue-600/45 rounded-full animate-bounce transform -rotate-12" style={{animationDelay: '2.5s'}}></div>
      </div>

      {/* Content Stack - Completely different layout */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-0 pb-0">
        
        {/* Top Section - Badge and Title */}
        <div className="flex-1 flex flex-col justify-center text-center pt-8">
            <Image 
              src="/images/logo.webp" 
              alt="Hero Logo" 
              width={200}
              height={200}
              className="mx-auto object-contain w-[200px]"
            />
        </div>

        {/* Middle Section - Horizontal Image with Side Elements */}
        <div className="flex-1 flex items-center justify-center">
          <Image 
              src="/images/hero-rate__bg.webp" 
              alt="Hero Background" 
              width={600}
              height={600}
              className="relative w-110 h-110 object-contain max-w-[500px] mx-auto"
              priority={true}
            />
            <Image 
              src="/images/hero-text.webp" 
              alt="Hero Left Image" 
              width={600}
              height={600}
              className="w-[120px] h-[120px] sm:w-[150px] sm:h-[180px] object-contain absolute top-2/5 left-0 md:left-20"
            />
              <Image 
              src="/images/hero-line.webp" 
              alt="Hero Right Image" 
              width={600}
              height={600}
              className="w-[135px] h-[135px] sm:w-[150px] sm:h-[180px] object-contain absolute top-2/5 right-0 md:right-20"
            />
            <div className="absolute top-17/20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%]"  onClick={() => router.push('/apply?isCouponed=true')}>
              <div className={`leading-none text-white
                  [-webkit-text-stroke:2px_#ff6b2e] [text-stroke:2px_#ff6b2e]
                   flex items-center justify-center relative`}>
                
                {/* New User Rate */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  !showRepeatRate ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className={`${coiny.className} text-[140px] sm:text-[180px]`}>{Math.floor(newUserLineRate)}</div>
                  <div>
                    <div className="-mt-10 text-[80px] sm:text-[100px]">.
                      <span className={`${coiny.className} text-[60px] sm:text-[80px]`}>{String(newUserLineRate).split('.')[1]}</span>
                      </div>
                    {/* <div className="text-[60px] sm:text-[80px]">.3</div> */}
                    <div className={`${coiny.className} text-[40px] sm:text-[60px]`}>%</div>
                  </div>
                </div>
                
                {/* Repeat User Rate */}
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                  showRepeatRate ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className={`${coiny.className} text-[140px] sm:text-[180px]`}>{Math.floor(repeatUserLineRate)}</div>
                  <div>
                    <div className="-mt-10 text-[80px] sm:text-[100px]">.
                      <span className={`${coiny.className} text-[60px] sm:text-[80px]`}>{String(repeatUserLineRate).split('.')[1]}</span>
                      </div>
                    {/* <div className="text-[60px] sm:text-[80px]">.3</div> */}

                    <div className={`${coiny.className} text-[40px] sm:text-[60px]`}>%</div>
                  </div>
                </div>
              </div>
              
               {/* Badge */}
               <div className="bg-white text-center text-lg font-medium  rounded-full pl-4 py-1 flex items-center relative mt-14">
                 <div className="w-1/4 flex justify-center">
                   <Image src="/images/brands/icon_apple.webp" alt="Apple" width={1000} height={1000} className="w-10 h-10 object-contain rounded-full" />
                 </div>
                 
                 {/* New User Badge */}
                 <div className={`w-2/4 pl-2 transition-opacity font-bold  duration-500 ${
                   !showRepeatRate ? 'text-[#35cca4]' : 'text-primary'
                 }`}>
                   <div className="w-full text-center">{showRepeatRate ? '2回目以降' : '初回'}</div>
                 </div>
                 
                 {/* Repeat User Badge */}
                 {/* <div className={`absolute right-19 transition-opacity font-bold text-primary duration-500 ${
                   showRepeatRate ? 'opacity-100' : 'opacity-0'
                 }`}>
                   2回目以降
                 </div> */}
               </div>
            </div>
        </div>
      </div>
        {/* Bottom Section - Transfer Time Only */}
        <div className="flex-1 flex flex-col px-4 justify-end mt-10">
          {/* Transfer Time Feature */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 mb-1 mx-6 border border-white/20">
            <div className="text-center text-white flex items-center justify-center">
              <div className="text-base opacity-90">お振込みまで</div>
              <div className="font-bold text-accent text-4xl mx-2">{siteSetting.transfer_time || 30}</div>分
            </div>
          </div>
        </div>

        {/* Fixed Vertical Button - Right Side */}
        <div className={`fixed bottom-50 right-0 z-50 md:hidden ${
          showBottomButton ? 'opacity-0' : 'opacity-100'
        }`}>
          <Link href={LINE_LINK} className="block">
            <div className="bg-line text-white rounded-l-lg w-10 pb-10 pt-6">
              <div className="transform rotate-270 text-center">
                {/* <div className="text-sm font-bold whitespace-nowrap [writing-mode:vertical-rl]">申し込み</div> */}
                <div className={`${coiny.className}  text-xl tracking-widest font-bold whitespace-nowrap ml-[-15px]`}>LINE</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Fixed Bottom Button for Mobile */}
        <div className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-opacity duration-500 ease-in-out ${
          showBottomButton ? 'block' : 'hidden'
        }`}>
          <div className="bg-black/20 w-full p-1">
            <div className="flex justify-center">
              <Link href={LINE_LINK} className="w-100">
                <Image src="/images/line_footer.webp" alt="Apply" width={500} height={500} className="w-full h-auto" />
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HeroMobile;