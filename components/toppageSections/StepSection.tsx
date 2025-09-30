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
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center">
                {/* Step Card */}
                <div className={`min-h-[350px] lg:min-h-[350px] relative overflow-hidden border-2 ${step.borderColor} shadow-lg bg-primary-light backdrop-blur-sm rounded-xl p-8 text-center w-full lg:w-96 ${index > 0 ? 'lg:ml-0' : ''}`}>
                  {/* Step Number */}
                  <div className={`inline-flex items-center justify-center px-2 py-1 rounded-xl bg-gradient-to-r ${step.gradient} text-white text-xl font-bold mb-6 shadow-lg`}>
                    STEP<br/>{step.number}
                  </div>
                  
  
                  {/* Step Content */}
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
                    {step.title.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < step.title.split('\n').length - 1 && <><br className="lg:hidden" /><span className="hidden lg:inline"> </span></>}
                      </span>
                    ))}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-left">
                    {parseTextWithLinks(step.description).map((line, index) => (
                      <span key={index}>
                        {line.parts.map((part, partIndex) => (
                          part.type === 'link' ? (
                            <a 
                              key={partIndex}
                              href={part.url} 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                            >
                              {part.content}
                            </a>
                          ) : (
                            <span key={partIndex}>{part.content}</span>
                          )
                        ))}
                        {index < parseTextWithLinks(step.description).length - 1 && <><br className="lg:hidden" /><span className="hidden lg:inline"> </span></>}
                      </span>
                    ))}
                  </p>
                </div>
  
                {/* Arrow */}
                {index < steps.length - 1 && (
                  <>
                    {/* Desktop Arrow - Horizontal */}
                    <div className="hidden lg:block mx-6">
                      <div className="w-0 h-0 border-l-[32px] border-primary-light border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent"></div>
                    </div>

                    {/* Mobile Arrow - Vertical */}
                    <div className="lg:hidden flex justify-center my-6">
                      <div className="w-0 h-0 border-t-[32px] border-t-primary-light border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent"></div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }