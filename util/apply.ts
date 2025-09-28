import { BuyingRate } from "@/types/setting";
import { UsageType } from "@/types/apply";

export const calcRate = (selectedRate: BuyingRate | undefined, usageType: UsageType) => {
    if (!selectedRate) {
        return 0;
    }
    const currentRate = usageType === 'new' 
    ? selectedRate.new_user || 0
    : selectedRate.repeat_user || 0;
    return currentRate;
}

// 率を小数点第一位まで表示する関数
export const FormatRate = (rate: number | string): string => {
  const numRate = typeof rate === 'string' ? parseFloat(rate) : rate;
  return numRate.toFixed(1);
};
