"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { LINE_LINK } from '@/util/appConst';

const Header = () => {
  // current path
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header - Desktop Only */}
      <header className={`hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary-light backdrop-blur-md border-b border-accent shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div>
                {(isScrolled || (!isScrolled && pathname !== '/')) && (
                  <Link href="/" className="relative text-gray-700 hover:text-pink-500 font-medium transition-colors group">
                    <Image src="/images/logo.webp" alt="Logo" width={100} height={100} />
                  </Link>
                )}
            </div>

            {/* Buttons */}
           <div>
           <button
              className="ml-8 px-6 py-2 bg-accent text-black cursor-pointer font-semibold rounded-full hover:opacity-80 shadow-lg"
              onClick={() => router.push('/apply')}
            >
              お申込み
            </button>
            <button
              className="ml-8 px-6 py-2  bg-accent text-black cursor-pointer font-semibold rounded-full hover:opacity-80 shadow-lg"
              onClick={() => router.push('/contact')}
            >
              お問い合わせ
            </button>
           </div>
          </div>
        </div>
      </header>

      {/* Mobile Hamburger Menu */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button 
          className="bg-white rounded-xl shadow-lg border border-accent p-3 hover:shadow-xl transition-shadow"
          onClick={toggleMenu}
        >
          <div className="w-6 h-6 flex flex-col justify-center space-y-1">
            <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 `}></span>
            <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 `}></span>
            <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 `}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-accent z-100 shadow-2xl transform transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2"></div>
            <button 
              onClick={toggleMenu}
              className="p-2 text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-4 mb-8">
            <Link 
              href="/" 
              className="flex items-center px-4 text-gray-700 hover:bg-orange-100 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
              ホーム
            </Link>
            <Link 
              href="/apply?isCouponed=true" 
              className="flex items-center px-4 text-gray-700 hover:bg-orange-100 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
              お申込み
            </Link>
                <Link 
              href="/rules" 
              className="flex items-center px-4 text-gray-700 hover:bg-orange-100 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
              利用規約
            </Link>
            <Link 
              href="/privacypolicy" 
              className="flex items-center px-4 text-gray-700 hover:bg-orange-100 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              個人情報保護方針
            </Link>
            <Link 
              href="/contact" 
              className="flex items-center  px-4 text-gray-700 hover:bg-orange-100 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                お問い合わせ
            </Link>
            <Link 
              href="/aboutus" 
              className="flex items-center px-4 text-gray-700 hover:bg-orange-100 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                運営会社情報
            </Link>
          </nav>


          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-primary-light">
            <div className="flex space-x-4 mt-4">
              {LINE_LINK && (
              <Link href={LINE_LINK} className="w-200  rounded-full flex items-center justify-center">
                <Image src="/images/btn_line.webp" alt="LINE mobile" width={200} height={200} />
              </Link>
              )}
              <Link href="/apply" className="w-200 rounded-full flex items-center justify-center">
                <Image src="/images/btn_app.webp" alt="apply mobile" width={200} height={200} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;