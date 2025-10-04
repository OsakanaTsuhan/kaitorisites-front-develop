import BannerSection from "@/components/toppageSections/BannerSection";
import RateSection from "@/components/toppageSections/RateSection";
import SimulationSection from "@/components/toppageSections/SimulationSection";
import GroupSitesSection from "@/components/toppageSections/GroupSitesSection";
import { getSetting } from "@/lib/api";
import HeroMobile from "@/components/toppageSections/HeroMobile";
import HeroDesktop from "@/components/toppageSections/HeroDesktop";
import FeatureSection from "@/components/toppageSections/FeatureSection";
import StepSection from "@/components/toppageSections/StepSection";
import HeroStatic from "@/components/toppageSections/HeroStatic";

export default async function Home() {
  try {

    const setting = await getSetting();
    
    const buyingRates = setting.rate_setting;
    const siteSetting = setting.site_setting;
    
    if(buyingRates.length <= 0) {
      // フォールバック表示（SEO構造は維持）
      return <StaticFallbackHome />
    }
    

    return (
      <div className="relative m-0 p-0 overflow-x-hidden">
        <div className="z-10">
          <div className="hidden lg:block">
            <HeroDesktop appleRate={buyingRates[0]} siteSetting={siteSetting[0]} />
          </div>
          <div className="lg:hidden">
            <HeroMobile appleRate={buyingRates[0]} siteSetting={siteSetting[0]} />
          </div>
          <BannerSection />
          <RateSection isVisible={true} buyingRates={buyingRates} />
          <SimulationSection brandRates={buyingRates} />
          <StepSection siteSetting={siteSetting[0]} />
          <FeatureSection />
          <BannerSection />
          <GroupSitesSection />
        </div>
      </div>
    );
  } catch (error) {
    console.error('エラーが発生しました:', error);
    return <StaticFallbackHome />
  }

  function StaticFallbackHome() {
    return (
      <div className="relative m-0 p-0 overflow-x-hidden">
        <div className="z-10">
          <HeroStatic  />
          <BannerSection />
          <FeatureSection />
          <BannerSection />
          <GroupSitesSection />
        </div>
      </div>
    )
  }
}

