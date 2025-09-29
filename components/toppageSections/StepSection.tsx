"use client"

  import { steps } from '@/util/featurestep';
import BackGroundPattern from '../figures/BackGroundPattern';

  export default function StepSection() {
    return (
      <section className="py-20 px-4 bg-primary relative">
      {/* Background Pattern */}
      <BackGroundPattern />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
              ご利用の
              <span className="text-fruit-light-gradient">
                3ステップ
              </span>
            </h2>
          </div>
  
          {/* Steps - Desktop: Horizontal, Mobile: Vertical */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8 md:gap-0">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center">
                {/* Step Card */}
                <div className={`h-[400px] lg:h-[450px] relative overflow-hidden border-2 ${step.borderColor} shadow-lg bg-primary-light backdrop-blur-sm rounded-xl p-8 text-center w-full md:w-80`}>
                  {/* Step Number */}
                  <div className={`inline-flex items-center justify-center px-2 py-1 rounded-xl bg-gradient-to-r ${step.gradient} text-white text-xl font-bold mb-6 shadow-lg`}>
                    STEP<br/>{step.number}
                  </div>
                  
  
                  {/* Step Content */}
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-left">
                    {step.description}
                  </p>
                </div>
  
                {/* Arrow */}
                {index < steps.length - 1 && (
                  <>
                    {/* Desktop Arrow - Horizontal */}
                    <div className="hidden md:block mx-6">
                      <div className="w-0 h-0 border-l-[32px] border-primary-light border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent"></div>
                    </div>
  
                    {/* Mobile Arrow - Vertical */}
                    <div className="md:hidden flex justify-center my-6">
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