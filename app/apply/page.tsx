import ApplyComponent from "@/components/applyComponent";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import { getSetting } from "@/lib/api";
import { Metadata } from 'next';
import Script from "next/script";
import { BASE_URL, SORTED_BRANDS } from "@/util/appConst";

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

export default async function Apply({searchParams}: {searchParams: Promise<{brand: string, isCouponed: boolean, ad: string}>}) {
  const resolvedSearchParams = await searchParams;
  const setting = await getSetting();
  const buyingRates = setting.rate_setting;
  const coupons = setting.coupons;

  if(buyingRates.length <= 0) {
    return <div>問題が発生しました。ページを更新してください。</div>;
  }

  const sortedBuyingRates = buyingRates.sort((a, b) => SORTED_BRANDS.indexOf(a.brand) - SORTED_BRANDS.indexOf(b.brand));  

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
          buyingRates={sortedBuyingRates} 
          coupons={coupons} 
          isCouponed={resolvedSearchParams.isCouponed || false} 
          ad={resolvedSearchParams.ad || ""} 
          affiliate={""} 
        />
      </div>
    </div>
  );
}