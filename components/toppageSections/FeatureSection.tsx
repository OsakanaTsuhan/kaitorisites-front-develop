'use client'

import Image from 'next/image';
import { features } from '@/util/features';
import { SITE_NAME } from '@/util/appConst';
  
  export default function FeatureSection() {
    return (
      <section className="py-20 px-4 bg-primary-light">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              {SITE_NAME}の
              <span className="block md:inline text-fruit-gradient">
                4つの特徴
              </span>
            </h2>
          </div>
  
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative overflow-hidden border-2 ${feature.borderColor} shadow-lg bg-white backdrop-blur-sm rounded-lg`}
              >
                <div className="relative p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-1">
                      {/* Point Badge */}
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold tracking-wider bg-primary text-white border-0 mb-3 rounded-full`}
                      >
                        {feature.point}
                      </span>
                      <div className="text-xl md:text-2xl font-bold text-gray-900 text-balance leading-tight mb-4">
                        {feature.title.split('\n').map((line, index) => (
                          <span key={index}>
                            {line}
                            {index < feature.title.split('\n').length - 1 && <><br className="md:hidden" /><span className="hidden md:inline"></span></>}
                          </span>
                      ))}
                      </div>
                    </div>
                    <div className="flex-shrink-0 relative">
                      {/* Pop-out effect container */}
                      <div className="relative w-24 h-24">
                        {/* Background circle with gradient */}
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${feature.gradient} opacity-20 blur-sm scale-110`}></div>
                        
                        {/* Main image with pop-out effect */}
                        <div className="absolute inset-0 z-10 border-4 border-white shadow-xl rounded-full">
                          <Image
                            src={`${feature.characterImage}`}
                            alt={`${feature.point} character`}
                            className="mt-[-45px] w-33 rounded-full object-contain"
                            width={1000}
                            height={1000}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            quality={90}
                          />
                          <Image
                            src={"/images/char-name.webp"}
                            alt={`character-name`}
                            className="absolute -bottom-2 -right-5 w-13 h-13 rounded-full object-contain"
                            width={1000}
                            height={1000}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                            quality={90}
                          />
                        </div>
                      </div>
                    </div>
                    
                  </div>
  
                  {/* Content */}
                  
                  <p className="text-gray-600 leading-relaxed text-pretty">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }