'use client';

import { useEffect, useState } from 'react';

interface ColorBean {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDuration: number;
  animationDelay: number;
}

const ColorBeansBackground = () => {
  const [beans, setBeans] = useState<ColorBean[]>([]);

  const colors = [
    'bg-red-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-yellow-400',
    'bg-purple-400',
    'bg-pink-400',
    'bg-indigo-400',
    'bg-orange-400',
    'bg-teal-400',
    'bg-cyan-400',
    'bg-lime-400',
    'bg-emerald-400',
  ];

  useEffect(() => {
    const generateBeans = () => {
      const newBeans: ColorBean[] = [];
      const beanCount = 25; // ビーンズの数を半分に

      for (let i = 0; i < beanCount; i++) {
        newBeans.push({
          id: i,
          x: Math.random() * 100, // 0-100%の範囲
          y: Math.random() * 100, // 0-100%の範囲
          size: Math.random() * 20 + 10, // 10-30pxのサイズ
          color: colors[Math.floor(Math.random() * colors.length)],
          animationDuration: Math.random() * 3 + 2, // 2-5秒のアニメーション
          animationDelay: Math.random() * 2, // 0-2秒の遅延
        });
      }

      setBeans(newBeans);
    };

    generateBeans();
  }, []);

  return (
    <>
      {/* 背景として絶対配置し、他の要素の後ろに配置 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }}>
        {beans.map((bean) => (
          <div
            key={bean.id}
            className="absolute opacity-30 animate-bounce" // 透明度をさらに下げる
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
              width: `${bean.size}px`,
              height: `${bean.size * 1.3}px`, // 豆の縦長比率
              animationDuration: `${bean.animationDuration}s`,
              animationDelay: `${bean.animationDelay}s`,
              animationDirection: 'alternate',
              animationIterationCount: 'infinite',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* リアルな豆の形 */}
            <div 
              className={`w-full h-full ${bean.color} relative shadow-sm`} // 影を軽くする
              style={{
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            >
              {/* 豆の中央の線 */}
              <div 
                className="absolute inset-0 bg-black opacity-15" // 透明度を下げる
                style={{
                  width: '2px',
                  height: '70%',
                  left: '50%',
                  top: '15%',
                  transform: 'translateX(-50%)',
                  borderRadius: '1px',
                }}
              />
              {/* ハイライト効果 */}
              <div 
                className="absolute bg-white opacity-20" // 透明度を下げる
                style={{
                  width: '30%',
                  height: '40%',
                  left: '20%',
                  top: '15%',
                  borderRadius: '50%',
                  filter: 'blur(2px)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ColorBeansBackground;