import ContactCompleteComponent from "@/components/contactComponent/ContactCompleteComponent";
import PageHeader from "@/components/PageHeader";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";
import Script from "next/script";
import { BASE_URL } from "@/util/appConst";

export const metadata: Metadata = {
  title: 'お問い合わせ完了', 
  description: 'お魚通販.com株式会社のお問い合わせ完了です。',
};

// SSRを強制 + キャッシュ無効化
export const dynamic = 'force-dynamic'

const breadcrumbs = [
  { label: 'ホーム', href: '/' },
  { label: 'お問い合わせ', href: '/contact' },
  { label: 'お問い合わせ完了', href: '/contact/complete' },
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
      name: 'お問い合わせ',
      item: `${BASE_URL}/contact`, // 環境変数を使用
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'お問い合わせ完了',
      item: `${BASE_URL}/contact/complete`, // 環境変数を使用
    },
  ],
};

export default function ContactCompletePage() {
  return (
    <div className="min-h-screen bg-primary-light flex items-center justify-center px-4">
      <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      <div className="max-w-4xl mx-auto text-center">
        {/* Breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/* Header */}
        <PageHeader title="お問い合わせ完了" />
        {/* Main Content */}
        <ContactCompleteComponent />
      </div>
    </div>
  );
}