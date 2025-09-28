"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BlogSection = () => {
  const router = useRouter();
  // サンプルブログデータ
  const blogArticles = [
    {
      id: 1,
      title: "Amazonギフト券の買取率が上昇中！今がチャンス",
      excerpt: "2024年に入ってからAmazonギフト券の需要が高まっており、買取率も軒並み上昇傾向にあります。この記事では最新の相場動向と高額買取のコツをご紹介します。",
      image: "",
      date: "2024年3月15日",
      category: "相場情報",
      readTime: "5分",
      author: "田中編集部",
      slug: "amazon-gift-card-rate-up"
    },
    {
      id: 2,
      title: "初回利用者必見！安全なギフト券買取サービスの選び方",
      excerpt: "ギフト券買取を初めて利用する方に向けて、詐欺に遭わないための安全な業者の見分け方や、チェックすべきポイントを分かりやすく解説します。",
      image: "",
      date: "2024年3月12日",
      category: "初心者ガイド",
      readTime: "7分",
      author: "佐藤編集部",
      slug: "safe-gift-card-service-guide"
    },
    {
      id: 3,
      title: "iTunesカードからApple Gift Cardへの変更点まとめ",
      excerpt: "AppleがiTunesカードをApple Gift Cardに統合したことで、買取市場にも変化が起きています。新しいカードの特徴と買取時の注意点をまとめました。",
      image: "",
      date: "2024年3月10日",
      category: "業界ニュース",
      readTime: "4分",
      author: "山田編集部",
      slug: "itunes-to-apple-gift-card"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-light">
      {/* Custom fruit colors */}
      <style jsx>{`
        .text-fruit-gradient {
          background: linear-gradient(45deg, #F871A0, #F97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-fruit-gradient">ブログ</span>
            <span className="text-gray-800">最新記事</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ギフト券買取に関する最新情報やお役立ち情報をお届けします
          </p>
        </div>

        {/* Blog Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogArticles.map((article, index) => (
            <article 
              key={article.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => {
                // 実際のアプリケーションでは、ここでブログ詳細ページに遷移
                console.log(`Navigate to blog: ${article.slug}`);
                alert(`ブログ記事「${article.title}」に遷移します`);
              }}
            >
              {/* Article Image */}
              <div className="relative overflow-hidden">
                {(article.image && article.image !== "") ? (
                   <img 
                   src={article.image }
                   alt={article.title}
                   className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <Image 
                    src={"/images/noimage.png"}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    width={1000}
                    height={1000}
                  />
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                    article.category === '相場情報' ? 'bg-rose-500' :
                    article.category === '初心者ガイド' ? 'bg-blue-500' :
                    'bg-green-500'
                  }`}>
                    {article.category}
                  </span>
                </div>
                
                {/* Read Time Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-700">
                    📖 {article.readTime}
                  </span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                  {article.title}
                </h3>
                
                {/* Excerpt */}
                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">✍️</span>
                    </div>
                    <span>{article.author}</span>
                  </div>
                  <time dateTime={article.date}>
                    {article.date}
                  </time>
                </div>
                
                {/* Read More Link */}
                <div className="flex items-center text-rose-600 font-medium group-hover:text-rose-700 transition-colors">
                  <span>続きを読む</span>
                  <svg 
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button 
            className="px-8 py-4 bg-accent text-black cursor-pointer font-semibold rounded-full hover:opacity-80 shadow-lg"
            onClick={() => router.push('/blog')}
          >
            すべての記事を見る
          </button>
        </div>

      </div>
    </section>
  );
};

export default BlogSection;