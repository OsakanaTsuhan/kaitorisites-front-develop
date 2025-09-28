import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import RulesComponent from "@/components/RulesComponent";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: '利用規約', 
  description: 'お魚通販.com株式会社の利用規約です。',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const breadcrumbs = [
  { label: 'ホーム', href: '/' },
  { label: '利用規約', href: '/rules' },
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
        name: '利用規約',
        item: `${BASE_URL}/rules`, // 環境変数を使用
      },
    ],
  };

export default function RulesPage() {
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
        <PageHeader title="利用規約" />

        {/* Rules Form */}
        <RulesComponent />
      </div>
    </div>
  );
}