"use client"

  import { steps } from '@/util/featurestep';
import BackGroundPattern from '../figures/BackGroundPattern';

// Function to parse text with links
const parseTextWithLinks = (text: string) => {
  // Split by line breaks first
  return text.split('\n').map((line, lineIndex) => {
    // Check if line contains link pattern [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(line)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: line.slice(lastIndex, match.index)
        });
      }
      
      // Add the link
      parts.push({
        type: 'link',
        content: match[1],
        url: match[2]
      });
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < line.length) {
      parts.push({
        type: 'text',
        content: line.slice(lastIndex)
      });
    }
    
    return { lineIndex, parts };
  });
};

  export default function StepSection() {
    return (
      <section className="py-20 px-4 bg-primary relative">
      {/* Background Pattern */}
      <BackGroundPattern />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 text-balance">
               買取スイートの
              <span className="block lg:inline text-fruit-light-gradient">
              買取3ステップ
              </span>
            </h2>
          </div>
          <p className="text-gray-600 text-center mb-8">
            <span>お申込みからお振込み完了まで、</span>
            <span className="block lg:inline">スマートフォン一つで完結する</span>
            <span className="block lg:inline">シンプルな3ステップです。</span>
          </p>
  
          {/* Steps - Desktop: Horizontal, Mobile: Vertical */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-start">
            {/* Step 1 */}
            <div className="flex flex-col lg:flex-row items-center">
              <div className="min-h-[350px] lg:min-h-[350px] relative overflow-hidden border-2 border-pink-200 shadow-lg bg-primary-light backdrop-blur-sm rounded-xl p-8 text-center w-full lg:w-96">
                <div className="inline-flex items-center justify-center px-2 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xl font-bold mb-6 shadow-lg">
                  STEP<br/>01
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
                  買取率・振込時間を確認
                </h3>
                <p className="text-gray-600 leading-relaxed text-left">
                  Appleギフトカードなどの買取率は、このページにある[【現在の買取率】](/#rate-section)欄にて確認いただけます。買取率は日々変動いたします。
                </p>
              </div>
              
              {/* Arrow */}
              <div className="hidden lg:block mx-6">
                <div className="w-0 h-0 border-l-[32px] border-primary-light border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent"></div>
              </div>
              <div className="lg:hidden flex justify-center my-6">
                <div className="w-0 h-0 border-t-[32px] border-t-primary-light border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent"></div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col lg:flex-row items-center">
              <div className="min-h-[350px] lg:min-h-[350px] relative overflow-hidden border-2 border-pink-200 shadow-lg bg-primary-light backdrop-blur-sm rounded-xl p-8 text-center w-full lg:w-96">
                <div className="inline-flex items-center justify-center px-2 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xl font-bold mb-6 shadow-lg">
                  STEP<br/>02
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
                  申込フォームに必要項目を入力
                </h3>
                <p className="text-gray-600 leading-relaxed text-left">
                  ギフト券の情報（種類や金額）、お名前、メールアドレス、お電話番号、そして買取代金のお振込み先となる銀行口座情報をご入力ください。初めてご利用になるお客様は、本人確認のため、運転免許証などの写真の添付をお願いしております。
                </p>
              </div>
              
              {/* Arrow */}
              <div className="hidden lg:block mx-6">
                <div className="w-0 h-0 border-l-[32px] border-primary-light border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent"></div>
              </div>
              <div className="lg:hidden flex justify-center my-6">
                <div className="w-0 h-0 border-t-[32px] border-t-primary-light border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent"></div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col lg:flex-row items-center">
              <div className="min-h-[350px] lg:min-h-[350px] relative overflow-hidden border-2 border-pink-200 shadow-lg bg-primary-light backdrop-blur-sm rounded-xl p-8 text-center w-full lg:w-96">
                <div className="inline-flex items-center justify-center px-2 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-400 text-white text-xl font-bold mb-6 shadow-lg">
                  STEP<br/>03
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
                  ギフト券買取代金のご入金を確認
                </h3>
                <p className="text-gray-600 leading-relaxed text-left">
                  振込完了のメールが届きましたら、お客様の銀行口座をご確認ください。金融機関によっては、着金にお時間がかかる場合がございます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }