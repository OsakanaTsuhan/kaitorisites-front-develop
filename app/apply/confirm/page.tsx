import ApplicationConfirmComponent from "@/components/applyComponent/ApplyConfirmComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { Metadata } from "next";
import Script from "next/script";


export const metadata: Metadata = {
  title: 'お申し込み内容の確認', 
  description: 'お魚通販.com株式会社のお申し込み内容の確認です。',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
        name: 'お申し込み内容の確認',
        item: `${BASE_URL}/apply/confirm`, // 環境変数を使用
      },
    ],
  };

export default function ConfirmPage() {
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
        <PageHeader title="お申し込み内容の確認" />       
        {/* Confirmation Sections */}
         <ApplicationConfirmComponent />
      </div>
    </div>
  );
}