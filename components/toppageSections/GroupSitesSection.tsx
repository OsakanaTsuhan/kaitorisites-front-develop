'use client'

"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import BackGroundPattern from '../figures/BackGroundPattern';
import { sites } from '@/util/groupsites';
import PageHeader from '../PageHeader';




export default function GroupSitesSection() {
  return (
    <section className="py-16 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <BackGroundPattern />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" >
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16">
        グループサイト
        </h2>
         <div className="mb-12 max-w-3xl mx-auto">
          <Link
              href={`https://kaitori-laboratory.com/giftcard-ranking`}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-slate-50 rounded-lg hover:opacity-80 transition-opacity duration-300 transition-all duration-300 text-center"
            >
              <Image src={`/images/group/gekiatsu-banner.gif`} alt={`otkg`} width={100} height={100} className="w-full h-full object-contain" />
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