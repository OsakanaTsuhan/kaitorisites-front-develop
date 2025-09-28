import PrivacyPolicyComponent from "@/components/PrivacyPolicyComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: '個人情報保護方針', 
  description: 'お魚通販.com株式会社の個人情報保護方針です。',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function PrivacyPolicyPage() {

  const breadcrumbs = [
    { label: 'ホーム', href: '/' },
    { label: '個人情報保護方針', href: '/privacypolicy' },
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
        name: '個人情報保護方針',
        item: `${BASE_URL}/privacypolicy`, // 環境変数を使用
      },
    ],
  };

  return (
    <div className="min-h-screen bg-primary-light py-16">
      <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/* Header */}
        <PageHeader title="個人情報保護方針" />
        {/* Privacy Policy Form */}          
        <PrivacyPolicyComponent />
      </div>
    </div>
  );
}