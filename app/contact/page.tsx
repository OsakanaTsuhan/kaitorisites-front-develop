import ContactComponent from "@/components/contactComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Script from "next/script";
import { BASE_URL } from "@/util/appConst";

export const metadata: Metadata = {
  title: 'お申し込み内容の確認', 
  description: 'お魚通販.com株式会社のお申し込み内容の確認です。',
};

// SSRを強制 + キャッシュ無効化
export const dynamic = 'force-dynamic'

const breadcrumbs = [
  { label: 'ホーム', href: '/' },
  { label: 'お問い合わせ', href: '/contact' },
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
    ],
  };

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary-light py-16">
      <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/* Header */}
        <PageHeader title="お問い合わせ" />
        <ContactComponent />
      </div>
    </div>

  );
}