"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-accent text-black">

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black mb-4">サイトメニュー</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                 お申込み
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  利用規約
                </Link>
              </li>
              <li>
                <Link href="/privacypolicy" className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  個人情報保護方針
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/aboutus" className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  運営会社情報
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-black mb-4">厳選ランキング集</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://kaitori-laboratory.com/giftcard-ranking/?_gl=1%2A5w0hj7%2A_gcl_au%2AMTk1MzYyMzczNC4xNzUyNzM4NDkz%2A_ga%2AOTcxNzkwODExLjE3NDQwOTI1NTE.%2A_ga_DLQ7YMGM6Z%2AczE3NTg3MDIzODckbzc2JGcxJHQxNzU4NzA0NjU2JGo0OSRsMCRoMA.."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  買取サイトらぼ
                </Link>
              </li>
              <li>
                <Link
                  href="https://kaitori-o-kini.com/blog/?_gl=1%2A18cp3q7%2A_gcl_au%2AMTk1MzYyMzczNC4xNzUyNzM4NDkz%2A_ga%2AOTcxNzkwODExLjE3NDQwOTI1NTE.%2A_ga_DLQ7YMGM6Z%2AczE3NTg3MDIzODckbzc2JGcxJHQxNzU4NzA0NjU2JGo0OSRsMCRoMA..%2A_ga_GK949DCDCZ%2AczE3NTg3MDIzODckbzU2JGcxJHQxNzU4NzA0NjU5JGo0NiRsMCRoMA.."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                  おーきにランキング
                </Link>
              </li>
              <li>
                <Link
                  href="https://kaitori-garage.com/giftcard-report/?_gl=1*1agyjkj*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg3MDIzODckbzc2JGcxJHQxNzU4NzA0NjU2JGo0OSRsMCRoMA.."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
                  ガレージランキング
                </Link>
              </li>
              <li>
                <Link
                  href="https://kaitori-best.com/?_gl=1%2Af59qep%2A_gcl_au%2AMTk1MzYyMzczNC4xNzUyNzM4NDkz%2A_ga%2AOTcxNzkwODExLjE3NDQwOTI1NTE.%2A_ga_DLQ7YMGM6Z%2AczE3NTg3MDIzODckbzc2JGcxJHQxNzU4NzA0NjU2JGo0OSRsMCRoMA..%2A_ga_GK949DCDCZ%2AczE3NTg3MDIzODckbzU2JGcxJHQxNzU4NzA0ODI2JGo4JGwwJGgw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  ベストランキング
                </Link>
              </li>
              <li>
                <Link
                  href="https://kaitoritoprank.com/?_gl=1*1agyjkj*_gcl_au*MTk1MzYyMzczNC4xNzUyNzM4NDkz*_ga*OTcxNzkwODExLjE3NDQwOTI1NTE.*_ga_DLQ7YMGM6Z*czE3NTg3MDIzODckbzc2JGcxJHQxNzU4NzA0NjU2JGo0OSRsMCRoMA.."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:opacity-80 flex items-center">
                <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  トップランク
                </Link>
              </li>
            </ul>
          </div>

          {/* image */}
          <div className="space-y-4 w-full h-full">
            <Image src="/images/footer.png" alt="Footer Image" width={1000} height={1000} className="w-[500px] h-[300px] object-contain" />
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-primary-light"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-black text-center text-sm">
          © kaitori-sweet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;