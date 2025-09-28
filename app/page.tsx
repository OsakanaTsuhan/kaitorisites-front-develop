import BannerSection from "@/components/toppageSections/BannerSection";
import RateSection from "@/components/toppageSections/RateSection";
import SimulationSection from "@/components/toppageSections/SimulationSection";
import GroupSitesSection from "@/components/toppageSections/GroupSitesSection";
import { getBuyingRate } from "@/lib/api";
import HeroMobile from "@/components/toppageSections/HeroMobile";
import HeroDesktop from "@/components/toppageSections/HeroDesktop";
import FeatureSection from "@/components/toppageSections/FeatureSection";
import StepSection from "@/components/toppageSections/StepSection";

// 完全にSSRに切り替え（静的生成を無効化）
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const buyingRates = await getBuyingRate();
  
  if(buyingRates.length <= 0) {
    return <div>No buying rates found</div>;
  }

  return (
    <div className="relative m-0 p-0 overflow-x-hidden">
      <div className="z-10">
        <div className="hidden lg:block">
          <HeroDesktop appleRate={buyingRates[0]} />
        </div>
        <div className="lg:hidden">
          <HeroMobile appleRate={buyingRates[0]} />
        </div>
        <BannerSection />
        <RateSection isVisible={true} buyingRates={buyingRates} />
        <SimulationSection brandRates={buyingRates} />
        <StepSection />
        <FeatureSection />
        <GroupSitesSection />
      </div>
    </div>
  );
}