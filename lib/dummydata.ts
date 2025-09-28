import { BuyingRate } from "@/types/setting";

export function GetStaticRatesData(site: string) {
    const staticRatesData: BuyingRate[] = [
      {
        site: site,
        brand: 'apple',
        new_user: 85,
        repeat_user: 87,
        special_user: 90,
        brand_name: 'Apple'
      },
      {
        site: site,
        brand: 'amazon',
        new_user: 82,
        repeat_user: 84,
        special_user: 87,
        brand_name: 'Amazon'
      },
      {
        site: site,
        brand: 'nintendo',
        new_user: 88,
        repeat_user: 90,
        special_user: 92,
        brand_name: 'Nintendo'
      }
    ]
    return staticRatesData;
  }