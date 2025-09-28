import ApplicationCompleteComponent from "@/components/applyComponent/ApplyCompleteComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import Script from "next/script";
import { BASE_URL } from "@/util/appConst";

export const metadata: Metadata = {
  title: 'お申し込み内容の確認', 
  description: 'お魚通販.com株式会社のお申し込み内容の確認です。',
};


const breadcrumbs = [
  { label: 'ホーム', href: '/' },
  { label: 'お申し込み', href: '/apply' },
  { label: 'お申し込み内容の確認', href: '/apply/confirm' },
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
        name: 'お申し込み',
        item: `${BASE_URL}/apply`, // 環境変数を使用
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'お申し込み完了',
        item: `${BASE_URL}/apply/complete`, // 環境変数を使用
      },
    ],
  };


export default function CompletePage() {
  return (
    <div className="min-h-screen bg-primary-light flex items-center justify-center px-4">
      <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      <div className="max-w-lg mx-auto text-center">
        {/* Breadcrumbs */}
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/* Header */}
        <PageHeader title="申込み完了" />
        <ApplicationCompleteComponent />
    </div>
    </div>
  );
}