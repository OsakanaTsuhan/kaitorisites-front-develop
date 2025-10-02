import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ApplyFormProvider } from "@/context/ApplyFormContext";
import RouteResetHandler from "@/components/RouteResetHandler";
import { BASE_URL, SITE_NAME } from "@/util/appConst";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = 'AppleギフトカードやAmazonギフト券など各種電子ギフト券を高換金率でスピード買取。手数料無料・最短即日振込で安心の現金化サービス。';
const url = BASE_URL;
const imagesUrl = `${url}/images/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(url), // 相対URLを絶対URLに変換するためのベースUR
  title: {
    // サイト全体のデフォルトタイトル（トップページ用）
    default: SITE_NAME, 
    // 各ページのタイトルに付与するテンプレート
    template: '%s | ' + SITE_NAME, 
  },
  description: description,
  openGraph: {
    title: SITE_NAME,
    description: description,
    url: url,
    siteName: SITE_NAME,
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: imagesUrl,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
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
          <RouteResetHandler />
          {children}
        </ApplyFormProvider>
        <Footer />
      </body>
    </html>
  );
}
