export type Setting = {
  rate_setting: BuyingRate[];
  site_setting: SiteSetting;
  coupons: Coupon[];
  };

export type BuyingRate = {
    site: string;
    brand: string;
    new_user: number;
    repeat_user: number;
    special_user: number;
    brand_name: string;
  };
  
export type SiteSetting = {
    site: string;
    site_name: string;
    site_url: string;
    transfer_time: number;
  };

  export type Coupon = {
    coupon_code: string;
    coupon_name: string;
    rateUp: number;
  };
  