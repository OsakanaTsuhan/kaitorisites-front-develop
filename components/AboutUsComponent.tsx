"use client"
import React from 'react';

const AboutUsComponent = () => {
  return (
     <div className="company-card rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 xl:p-16">   
      <div className="space-y-8 sm:space-y-12 lg:space-y-16">
        {/* 社名 */}
        <div className="info-grid">
          <div className="info-label">
            <h2 className="text-base sm:text-lg font-medium text-gray-500 tracking-wide mb-2 md:mb-0">社名</h2>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 mb-2 sm:mb-3 tracking-tight">お魚通販.com株式会社</h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-light">Osakanatsuhan.com,Inc.</p>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* 古物商許可 */}
        <div className="info-grid">
          <div className="info-label">
            <h2 className="text-base sm:text-lg font-medium text-gray-500 tracking-wide mb-2 md:mb-0">古物商許可</h2>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900 mb-2 sm:mb-3 tracking-tight">東京都公安委員会許可</h3>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-mono">第308841707262号</p>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* 営業所所在地 */}
        <div className="info-grid">
          <div className="info-label">
            <h2 className="text-base sm:text-lg font-medium text-gray-500 tracking-wide mb-2 md:mb-0">営業所所在地</h2>
          </div>
          <div>
            <div className="text-lg sm:text-xl lg:text-2xl font-light text-gray-900 mb-4 sm:mb-6 leading-relaxed tracking-tight">
              〒194-0022<br />
              東京都町田市森野1-8-1<br />
              MOAビル4F
            </div>
            
            {/* Google Map */}
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg mb-4 sm:mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3246.3277601068953!2d139.4391440515874!3d35.54560668012911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018feb1f8e03bb9%3A0x1dba7097747feee1!2z44CSMTk0LTAwMjIg5p2x5Lqs6YO955S655Sp5biC5qOu6YeO77yR5LiB55uu77yY4oiS77yRIO-8re-8r--8oeODk-ODqw!5e0!3m2!1sja!2sjp!4v1677808462133!5m2!1sja!2sjp"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full sm:h-80 lg:h-96"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* お問い合わせ（電話番号） */}
        <div className="info-grid">
          <div className="info-label">
            <h2 className="text-base sm:text-lg font-medium text-gray-500 tracking-wide mb-2 md:mb-0">お問い合わせ</h2>
          </div>
          <div>
            <a 
              href="tel:042-732-3588"
              className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-mono tracking-wider hover:underline transition-colors duration-200 cursor-pointer"
            >
              042-732-3588
            </a>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">受付時間：平日 9:00～19:00</p>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Email */}
        <div className="info-grid">
          <div className="info-label">
            <h2 className="text-base sm:text-lg font-medium text-gray-500 tracking-wide mb-2 md:mb-0">メールアドレス</h2>
          </div>
          <div>
            <a 
              href="mailto:kaitori@kaitori-sweet.com"
              className="text-base sm:text-lg lg:text-2xl font-light hover:underline transition-colors duration-200 cursor-pointer font-mono break-all"
            >
              kaitori@kaitori-sweet.com
            </a>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* 事業内容 */}
        <div className="info-grid">
          <div className="info-label">
            <h2 className="text-base sm:text-lg font-medium text-gray-500 tracking-wide mb-2 md:mb-0">事業内容</h2>
          </div>
          <div>
            <p className="text-base sm:text-lg text-gray-800 font-light">金券、チケット及び商品券の買取サービス</p>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* 営業時間 */}
        <div className="info-grid">
          <div className="info-label">
            <h2 className="text-base sm:text-lg font-medium text-gray-500 tracking-wide mb-2 md:mb-0">営業時間</h2>
          </div>
          <div>
            <p className="text-base sm:text-lg font-light text-gray-800 mb-2">年中無休 24時間受付</p>
            <p className="text-sm sm:text-base text-gray-500">土日祝日のお振込みも可能です</p>
          </div>
        </div>
      </div>
   </div>
  );
};

export default AboutUsComponent;