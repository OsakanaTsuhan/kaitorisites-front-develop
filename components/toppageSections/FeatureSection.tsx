'use client'

import Image from 'next/image';
import { features } from '@/util/featurestep';
  
  export default function FeatureSection() {
    return (
      <section className="py-20 px-4 bg-primary-light">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              買取スイートの
              <span className="text-fruit-gradient">
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
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 text-balance leading-tight">
                            {feature.title}
                        </h3>
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
                            className="mt-[-30px] w-30 h-30 rounded-full object-cover "
                            width={1000}
                            height={1000}
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