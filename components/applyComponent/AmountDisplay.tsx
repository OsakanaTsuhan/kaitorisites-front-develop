import React, { useState } from 'react';
import { Coupon } from '@/types/setting';

const AmountDisplay = ({ totalAmount, buybackAmount, rate, couponRateUp, onCouponRateUpChange, onCouponCodeChange, couponCode, coupons }: { totalAmount: number, buybackAmount: number, rate: number, couponRateUp: number, onCouponRateUpChange: (rateUp: number) => void, onCouponCodeChange: (code: string) => void, couponCode: string, coupons: Coupon[] }) => {
 
  const [couponError, setCouponError] = useState('');

  // クーポン適用後の買取率と買取額を計算
  const finalRate = couponRateUp > 0 ? rate + couponRateUp : rate;
  const finalBuybackAmount = couponRateUp > 0 ? Math.floor(totalAmount * (finalRate / 100)) : buybackAmount;

  // 率を小数点第一位まで表示する関数
  const formatRate = (rate: number): string => {
    return rate.toFixed(1);
  };

  // クーポンコード検証
  const handleCouponApply = () => {
    if (coupons.find(coupon => coupon.coupon_code === couponCode)) {
      onCouponCodeChange(couponCode);
      onCouponRateUpChange(coupons.find(coupon => coupon.coupon_code === couponCode)?.rateUp || 0);
      setCouponError('');
    } else if (couponCode.trim() === '') {
      setCouponError('クーポンコードを入力してください');
    } else {
      setCouponError('無効なクーポンコードです');
    }
  };

  // クーポンリセット
  const handleCouponReset = () => {
    onCouponRateUpChange(0);
    onCouponCodeChange('');
    setCouponError('');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center">
        金額詳細
      </h3>
      
      <div className="space-y-4">
        {/* 額面合計 */}
        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm">ギフト券額面合計</h4>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            ¥{totalAmount.toLocaleString()}
          </div>
        </div>
        
        {/* 買取額 */}
        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2 text-sm">買取額</h4>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            ¥{finalBuybackAmount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {totalAmount.toLocaleString()}円 × {formatRate(finalRate)}%
            {couponRateUp > 0 && (
              <div className="text-xs text-gray-500 mt-1">
                クーポン適用: +{coupons.find(coupon => coupon.coupon_code === couponCode)?.rateUp}%
              </div>
            )}
          </div>
        </div>

        {/* クーポン適用欄 */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-4 text-sm">
            クーポンコード
          </h4>
          
          {couponRateUp <= 0? (
            <div className="space-y-3">
              <div className="flex lg:flex-row flex-col gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => onCouponCodeChange(e.target.value)}
                  placeholder="クーポンコードを入力"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none transition-colors"
                />
                <button
                  onClick={handleCouponApply}
                  className="px-6 py-2 bg-accent cursor-pointer text-black font-semibold rounded-lg hover:opacity-80 transition-colors"
                >
                  適用
                </button>
              </div>
              
              {couponError && (
                <div className="text-sm text-red-500 px-3 py-2 ">
                  {couponError}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-green-600">
                    +{coupons.find(coupon => coupon.coupon_code === couponCode)?.rateUp}% クーポン適用済み ✓
                    </div>
                    <div className="text-sm text-gray-600">
                      クーポン: {coupons.find(coupon => coupon.coupon_code === couponCode)?.coupon_code}
                    </div>
                  </div>
                  <button
                    onClick={handleCouponReset}
                    className="text-xs text-gray-500 hover:text-gray-700 underline"
                  >
                    解除
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmountDisplay;