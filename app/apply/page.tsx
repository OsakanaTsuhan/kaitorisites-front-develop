import ApplyComponent from "@/components/applyComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { getBuyingRate } from "@/lib/api";
import { Metadata } from 'next';
import Script from "next/script";
import { BASE_URL } from "@/util/appConst";

export const metadata: Metadata = {
  title: 'お申し込み', 
  description: 'お魚通販.com株式会社のお申し込みです。',
};

// SSRを強制 + キャッシュ無効化
export const dynamic = 'force-dynamic'

const breadcrumbs = [
  { label: 'ホーム', href: '/' },
  { label: 'お申し込み', href: '/apply' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: `${BASE_URL}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'お申し込み',
      item: `${BASE_URL}/apply`,
    },
  ],
};

export default async function Apply({searchParams}: {searchParams: Promise<{brand: string, isCouponed: boolean}>}) {
  const resolvedSearchParams = await searchParams;
  const buyingRates = await getBuyingRate();

  const sampleCoupons = [
    {
      code: "123456",
      rateUp: 0.5,
      isMain: true
    },
  ];

  if(buyingRates.length <= 0) {
    return <div>No buying rates found</div>;
  }

  return (
    <div className="min-h-screen bg-primary-light py-16">
      <Script
          id="breadcrumbs-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <PageHeader title="お申し込み" />
        <ApplyComponent 
          brand={resolvedSearchParams.brand} 
          buyingRates={buyingRates} 
          coupons={sampleCoupons} 
          isCouponed={resolvedSearchParams.isCouponed || false} 
          ad={""} 
          affiliate={""} 
        />
      </div>
    </div>
  );
}