import AboutUsComponent from "@/components/AboutUsComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: '会社概要', 
  description: 'お魚通販.com株式会社の事業内容と会社概要です。',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function AboutUs() {
  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: '会社概要', href: '/aboutus' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: `${BASE_URL}/`, // 環境変数を使用
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '会社概要',
        item: `${BASE_URL}/aboutus`, // 環境変数を使用
      },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light py-10 sm:py-16 lg:py-20">
      <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/* Header */}
        <PageHeader title="運営会社情報" />
        <AboutUsComponent />
      </div>
    </div>
  );
}