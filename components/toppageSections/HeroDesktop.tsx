"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BuyingRate, SiteSetting } from '@/types/setting';
import { coiny } from './font';
import {  } from '@/util/apply';
import { LINE_RATE_UP } from '@/util/appConst';

const HeroDesktop = ({appleRate, siteSetting}: {appleRate: BuyingRate, siteSetting: SiteSetting}) => {
  const [showRepeatRate, setShowRepeatRate] = useState(false);

  const newUserLineRate = appleRate.new_user + LINE_RATE_UP;
  const repeatUserLineRate = appleRate.repeat_user + LINE_RATE_UP;


  useEffect(() => {
    // 3秒おきにnew_userとrepeat_userの率を切り替える
    const interval = setInterval(() => {
      setShowRepeatRate(prev => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative h-auto bg-primary mb-0">
    {/* <div className="relative h-auto mb-0 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url(/images/background.jpg)'}}> */}
      {/* Custom styles */}
      <style jsx>{`
        
        .star-rotate {
          animation: rotate 8s linear infinite;
        }
        
        .star-rotate-reverse {
          animation: rotate-reverse 10s linear infinite;
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
          stroke-width: 1;
          fill: none;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.8));
        }
      `}</style>
      
     

      {/* Main Content - Vertically Centered */}
      <div className="relative z-10 max-w-7xl mx-auto h-screen  flex items-center justify-between bg-primary">
       {/* Rotating Stars - 4 Large Stars Scattered */}
       <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-4 star-rotate">
          <svg width="240" height="240" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-4 star-rotate-reverse">
          <svg width="200" height="200" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-50 star-rotate">
          <svg width="220" height="220" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute bottom-16 right-8 star-rotate-reverse">
          <svg width="260" height="260" viewBox="0 0 24 24" className="star-outline">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>
    
        {/* Colorful Sweet Beans - Spread across the entire page */}
        <div className="absolute bottom-20 left-10 w-8 h-5 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full opacity-80 animate-bounce shadow-xl transform rotate-12"></div>
        <div className="absolute top-8 right-8 w-6 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-70 animate-bounce shadow-xl transform -rotate-12" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-16 left-1/4 w-7 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-60 animate-bounce shadow-xl transform rotate-45" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-20 right-1/4 w-5 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-50 animate-bounce shadow-lg transform -rotate-45" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-32 left-8 w-6 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-60 animate-bounce shadow-lg transform rotate-12" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 right-12 w-5 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-50 animate-bounce shadow-lg transform -rotate-12" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute top-48 left-1/3 w-7 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-75 animate-bounce shadow-lg transform rotate-30" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-156 right-1/3 w-6 h-4 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full opacity-65 animate-bounce shadow-lg transform -rotate-30" style={{animationDelay: '3.5s'}}></div>
        <div className="absolute top-64 left-1/2 w-5 h-3 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full opacity-55 animate-bounce shadow-lg transform rotate-60" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-72 right-1/2 w-6 h-4 bg-gradient-to-r from-rose-400 to-rose-600 rounded-full opacity-70 animate-bounce shadow-lg transform -rotate-60" style={{animationDelay: '4.5s'}}></div>
        <div className="absolute top-180 left-2/3 w-5 h-3 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full opacity-60 animate-bounce shadow-lg transform rotate-15" style={{animationDelay: '5s'}}></div>
        <div className="absolute top-88 right-2/3 w-7 h-4 bg-gradient-to-r from-violet-400 to-violet-600 rounded-full opacity-65 animate-bounce shadow-lg transform -rotate-15" style={{animationDelay: '5.5s'}}></div>
        <div className="absolute top-96 left-3/4 w-6 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full opacity-70 animate-bounce shadow-lg transform rotate-45" style={{animationDelay: '6s'}}></div>
        <div className="absolute top-104 right-3/4 w-5 h-3 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-60 animate-bounce shadow-lg transform -rotate-45" style={{animationDelay: '6.5s'}}></div>
        <div className="absolute top-112 left-4/5 w-4 h-3 bg-gradient-to-r from-lime-400 to-lime-600 rounded-full opacity-55 animate-bounce shadow-lg transform rotate-75" style={{animationDelay: '7s'}}></div>
        <div className="absolute top-120 right-4/5 w-5 h-3 bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 rounded-full opacity-65 animate-bounce shadow-lg transform -rotate-75" style={{animationDelay: '7.5s'}}></div>
        <div className="absolute top-150 left-25 w-6 h-4 bg-gradient-to-r from-sky-400 to-sky-600 rounded-full opacity-60 animate-bounce shadow-lg transform rotate-20" style={{animationDelay: '8s'}}></div>
        <div className="absolute top-136 right-1/5 w-5 h-3 bg-gradient-to-r from-orange-300 to-orange-500 rounded-full opacity-70 animate-bounce shadow-lg transform -rotate-20" style={{animationDelay: '8.5s'}}></div>
      
         {/* Left Section - Logo */}
         <div className="flex-1 flex justify-center items-center">
             <div className="relative w-full h-300px flex items-center justify-center">
               <Image 
                 src="/images/hero-cheer.webp" 
                 alt="Hero Image" 
                 width={1500}
                 height={1500}
                 className="w-[1500px] h-[1500px] ml-[-450px] object-contain z-15"
                 priority
               />
               <Image 
                src="/images/char-name.png" 
                alt="character-name" 
                width={100}
                height={100}
                className="absolute w-[100px] h-[100px] ml-[250px] -left-100 bottom-130 object-contain"
                priority
              />
             </div>
         </div>

         {/* Center Section - Main Content */}
         <div className="flex-1 flex justify-center items-center">
           <div className="relative group">
             {/* Main Logo */}
             <Image 
               src="/images/logo.png" 
               alt="Hero Logo" 
               width={600}
               height={600}
               className="absolute top-[-180px] left-1/2 transform -translate-x-1/2 w-[320px] h-[320px] object-contain z-10"
               priority
             />
             
             {/* Main Background Image */}
             <Image 
               src="/images/hero-rate__bg.png" 
               alt="Hero Background" 
               width={400}
               height={400}
               className="w-[600px] h-[600px] mt-10 object-contain"
               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
               quality={90}
               priority
             />
             
             {/* Left Decoration */}
             <Image 
               src="/images/hero-text.png" 
               alt="Hero Text" 
               width={180}
               height={180}
               className="absolute top-2/5 left-[-120px] w-[180px] h-[180px] object-contain transform -translate-y-1/2"
               priority
             />
             
             {/* Right Decoration */}
             <Image 
               src="/images/hero-line.png" 
               alt="Hero Line" 
               width={180}
               height={180}
               className="absolute top-2/5 right-[-100px] w-[180px] h-[180px] object-contain transform -translate-y-1/2"
               priority
             />
             
             {/* Rate Display */}
             <div className="absolute top-4/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
               <div className={` leading-none text-white
                   [-webkit-text-stroke:2px_#ff6b2e] [text-stroke:2px_#ff6b2e]
                   flex items-center justify-center relative`}>
                  
                  {/* New User Rate */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    !showRepeatRate ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className={`${coiny.className} text-[180px]`}>{Math.floor(newUserLineRate)}</div>
                    <div>
                      <div className="text-[60px]">.
                        <span  className={`${coiny.className} text-[80px]`}>{String(newUserLineRate).split('.')[1]}</span>
                      </div>
                      <div className={`${coiny.className} text-[60px]`}>%</div>
                    </div>
                  </div>
                  
                  {/* Repeat User Rate */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    showRepeatRate ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className={`${coiny.className} text-[180px]`}>{Math.floor(repeatUserLineRate)}</div>
                    <div>
                      <div className="text-[60px]">.
                        <span  className={`${coiny.className} text-[80px]`}>{String(repeatUserLineRate).split('.')[1]}</span>
                      </div>
                      <div className={`${coiny.className} text-[60px]`}>%</div>
                    </div>
                  </div>
               </div>
             
               
               {/* Badge */}
               <div className="w-[250px] bg-white text-center text-xl  rounded-full px-4 py-1 flex items-center relative mt-18">
                 <div className="w-1/4 flex justify-center">
                   <Image src="/images/brands/icon_apple.png" alt="Apple" width={1000} height={1000} className="w-12 h-12 object-contain rounded-full" priority />
                 </div>
                 
                 {/* New User Badge */}
                 <div className={`w-3/4 -ml-2 transition-opacity font-bold text-center duration-500 ${
                   !showRepeatRate ? 'text-[#35cca4]' : 'text-primary'
                 }`}>
                   {showRepeatRate ? '2回目以降' : '初回'}
                 </div>
               </div>
             </div>
             
             {/* Transfer Time Feature */}
             <div className="absolute bottom-[-100px] w-full mx-auto">
               <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                 <div className="text-center text-white flex items-center justify-center">
                   <div className="text-base opacity-90">お振込みまで</div>
                   <div className="font-bold text-accent text-6xl mx-2">{siteSetting.transfer_time || 30}</div>分
                 </div>
               </div>
             </div>
           </div>
         </div>

         {/* Right Section - Campaign Info */}
         <div className="flex-1 flex justify-center items-center">
           <div className="relative text-center">
            <Image 
                src="/images/hero-point.webp" 
                alt="Hero Image" 
                width={700}
                height={700}
                className="w-[1000px] h-[1000px] ml-[250px] object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                quality={90}
                priority
              />
              <Image 
                src="/images/char-name.png" 
                alt="character-name" 
                width={100}
                height={100}
                className="absolute w-[100px] h-[100px] ml-[250px] -right-50 bottom-80 object-contain"
                priority
              />
           </div>
         </div>        
       </div>
     </div>
   );
 };

export default HeroDesktop;