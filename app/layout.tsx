import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ApplyFormProvider } from "@/context/ApplyFormContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = '買取スイート';
const description = 'AppleギフトカードやAmazonギフト券など各種電子ギフト券を高換金率でスピード買取。手数料無料・最短即日振込で安心の現金化サービス。';
const url = process.env.NEXT_PUBLIC_BASE_URL || 'https://kaitori-sweet.com';
const imagesUrl = `${url}/images/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(url), // 相対URLを絶対URLに変換するためのベースUR
  title: {
    // サイト全体のデフォルトタイトル（トップページ用）
    default: siteName, 
    // 各ページのタイトルに付与するテンプレート
    template: '%s | ' + siteName, 
  },
  description: description,
  openGraph: {
    title: siteName,
    description: description,
    url: url,
    siteName: siteName,
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: imagesUrl,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: description,
    site: '@your_twitter_handle',
    creator: '@your_twitter_handle',
    images: [imagesUrl],
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ApplyFormProvider>
        {children}
        </ApplyFormProvider>
        <Footer />
      </body>
    </html>
  );
}
