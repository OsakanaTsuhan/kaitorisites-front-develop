"use client"
import React, { useState, useEffect } from 'react';
import BrandTypeSelector from './BrandTypeSelector';
import UsageTypeSelector from './UsageTypeSelector';
import RateDisplay from './RateDisplay';
import GiftCardForm from './GiftCardForm';
import AmountDisplay from './AmountDisplay';
import PersonalInfoForm from './PersonalInfoForm';
import BankSelector from './BankSelector';
import IDUpload from './IDUpload';
import RemarksForm from './RemarksForm';
import { useRouter } from 'next/navigation';
import { useApplyForm, FormState } from '@/context/ApplyFormContext';
import { BankInfo, GiftCard, IDImages, PersonalInfo, UsageType } from '@/types/apply';
import { BuyingRate, Coupon } from '@/types/setting';
import { validateGiftCards } from '@/util/giftCodeValidation';
import { calcRate } from '@/util/apply';
import BankModal from './BankModal';
import { LINE_RATE_UP } from '@/util/appConst';
import { getUserIP } from '@/lib/getUserIP';


const ApplyComponent = ({brand, buyingRates, coupons, ad, affiliate, isCouponed}: {brand: string | null | undefined, buyingRates: BuyingRate[], coupons: Coupon[], ad: string, affiliate: string, isCouponed: boolean}) => {
  const mainCoupon = process.env.NEXT_PUBLIC_MAIN_COUPON || '3abc7UP';
  const [ipaddress, setIpaddress] = useState<string>('unknown');
  const router = useRouter();
  const { formData, setFormData } = useApplyForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    SetFormData();
  }, [brand, isCouponed, ad])

  useEffect(() => {
    // Get user's IP address
    const fetchIP = async () => {
      const ip = await getUserIP();
      setIpaddress(ip);
    };
    fetchIP();
  }, []);

  const SetFormData = () => {
    // Only set brand if it's not already set in formData (preserve user's selection)
    const shouldSetBrand = !formData.selectedBrand || (brand && brand.trim() !== '');
    const brandToSet = shouldSetBrand ? (brand && brand.trim() !== '' ? brand : 'apple') : formData.selectedBrand;
    
    // Then handle coupon logic if needed
    if(ad) {
      setFormData({ ...formData, selectedBrand: brandToSet, couponCode: "ln1", couponRateUp: LINE_RATE_UP || 0, buyingRates: buyingRates });
    }else if(isCouponed) {
      const couponCode = coupons.find(coupon => mainCoupon === coupon.coupon_code)?.coupon_code;
      const couponRateUp = coupons.find(coupon => mainCoupon === coupon.coupon_code)?.rate_up;
      setFormData({ ...formData, selectedBrand: brandToSet, couponCode: couponCode || '', couponRateUp: couponRateUp || 0, buyingRates: buyingRates });
    } else {
      setFormData({ ...formData, selectedBrand: brandToSet, buyingRates: buyingRates });
    }
    
  };

  // Setter functions for context
  const setSelectedBrand = (brandValue: string) => setFormData({ ...formData, selectedBrand: brandValue });
  const setUsageType = (type: UsageType) => setFormData({ ...formData, usageType: type });
  const setGiftCards = (cards: GiftCard[]) => setFormData({ ...formData, giftCards: cards });
  const setPersonalInfo = (info: PersonalInfo) => setFormData({ ...formData, personalInfo: info });
  const setSelectedBank = (bank: BankInfo) => setFormData({ ...formData, bankInfo: { ...formData.bankInfo, ...bank } });
  const setIdImages = (images: IDImages) => setFormData({ ...formData, idImages: images });
  
  const setCouponRateUp = (rateUp: number) => setFormData({ ...formData, couponRateUp: rateUp });
  const setCouponCode = (code: string) => setFormData({ ...formData, couponCode: code });
  
  const setRemarks = (text: string) => setFormData({ ...formData, remarks: text });

  // エラー状態はコンポーネント内で管理
  const [errors, setErrors] = useState({
    brand: '',
    giftCards: '',
    personalInfo: {
      name: '',
      email: '',
      phone: ''
    },
    bank: '',
    idImages: '',
    couponRateUp: ''
  });

  // 3. 買取率計算（計算値として保持、formDataには保存しない）
  const selectedRate = buyingRates.find(rate => rate.brand === formData.selectedBrand);
  const currentRate = calcRate(selectedRate, formData.usageType);

  // 5. 額面合計計算
  const totalAmount = formData.giftCards.reduce((sum, card) => 
    sum + (parseInt(card.amount) || 0), 0
  );

  // 6. 買取額計算
  const buybackAmount = Math.floor(totalAmount * (currentRate / 100));

  // 確認ボタンの処理
  const handleConfirm = async () => {
    setIsSubmitting(true);
    // エラーをクリア
    setErrors({
      brand: '',
      giftCards: '',
      personalInfo: {
        name: '',
        email: '',
        phone: ''
      },
      bank: '',
      idImages: '',
      couponRateUp: ''
    });

    let hasErrors = false;
    const newErrors = {
      brand: '',
      giftCards: '',
      personalInfo: {
        name: '',
        email: '',
        phone: ''
      },
      bank: '',
      idImages: '',
      couponRateUp: ''
    };

    // バリデーション
    const giftCardValidation = validateGiftCards(formData.giftCards, formData.selectedBrand);
    
    if (!formData.selectedBrand) {
      newErrors.brand = '券種を選択してください';
      hasErrors = true;
    }
    
    if (!giftCardValidation.isValid) {
      newErrors.giftCards = giftCardValidation.errorMessage;
      hasErrors = true;
    }
    
    if (!formData.personalInfo.name.trim()) {
      newErrors.personalInfo.name = 'お名前を入力してください';
      hasErrors = true;
    }
    
    if (!formData.personalInfo.email.trim()) {
      newErrors.personalInfo.email = 'メールアドレスを入力してください';
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
      newErrors.personalInfo.email = '正しいメールアドレスを入力してください';
      hasErrors = true;
    }
    
    if (!formData.personalInfo.phone.trim()) {
      newErrors.personalInfo.phone = '電話番号を入力してください';
      hasErrors = true;
    } else if (!/^[\d\-\+\(\)\s]+$/.test(formData.personalInfo.phone)) {
      newErrors.personalInfo.phone = '正しい電話番号を入力してください';
      hasErrors = true;
    }
    
    if (!formData.bankInfo.bank) {
      newErrors.bank = '振込先銀行を選択してください';
      hasErrors = true;
    }
    
    if (formData.usageType === 'new' && (!formData.idImages.front)) {
      newErrors.idImages = '身分証明書の表面をアップロードしてください';
      hasErrors = true;
    }

    // エラーがある場合は表示して処理を停止
    if (hasErrors) {
      setErrors(newErrors);
      alert('エラーがあります。入力内容を確認してください');
      setIsSubmitting(false);
      return;
    }


    // フォームデータ作成 - rateは計算値を使用
    const submitData: FormState = {
      selectedBrand: formData.selectedBrand,
      usageType: formData.usageType,
      // rate: currentRate, // 計算値を直接使用
      giftCards: formData.giftCards,
      personalInfo: formData.personalInfo,
      bankInfo: formData.bankInfo,
      idImages: formData.usageType === 'new' ? formData.idImages : { front: null, back: null },
      couponRateUp: coupons.find(coupon => coupon.coupon_code === formData.couponCode)?.rate_up || 0, // デフォルト値を設定
      couponCode: formData.couponCode || '',
      ad: ad || '',
      affiliate: affiliate || '',
      ip: ipaddress,
      remarks: formData.remarks,
      buyingRates: formData.buyingRates
    };

    if(submitData.bankInfo.account_type === '') {
      submitData.bankInfo.account_type = '普通';
    }
    router.push('/apply/confirm');
    setIsSubmitting(false);
  };

  return (

  <div className="space-y-8">
      {/* 1. 券種選択 */}
      <div>
        <BrandTypeSelector 
          selectedBrand={formData.selectedBrand} 
          onBrandChange={setSelectedBrand}
          buyingRates={buyingRates}
        />
        {errors.brand && (
          <div className="mt-2 text-red-600 text-sm flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.brand}
          </div>
        )}
      </div>
      
      {/* 2. 利用回数選択 */}
      <UsageTypeSelector 
        usageType={formData.usageType} 
        onUsageTypeChange={setUsageType} 
      />
      
      {/* 3. 買取率表示 */}
      <RateDisplay 
        rate={currentRate}
        usageType={formData.usageType}
        couponRateUp={coupons.find(coupon => coupon.coupon_code === formData.couponCode)?.rate_up || 0}
      />
      
      {/* 4. ギフト券番号と額面入力 */}
      <div>
        <GiftCardForm 
          giftCards={formData.giftCards} 
          onGiftCardsChange={setGiftCards} 
        />
        {errors.giftCards && (
          <div className="mt-2 text-red-600 text-sm flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.giftCards}
          </div>
        )}
      </div>
      
      {/* 5. 額面合計表示 買取額表示 */}
      <AmountDisplay 
        totalAmount={totalAmount} 
        buybackAmount={buybackAmount}
        rate={currentRate}
        onCouponCodeChange={setCouponCode}
        couponCode={formData.couponCode}
        coupons={coupons}
      />
      
      {/* 6. 個人情報入力 */}
      <div>
        <PersonalInfoForm 
          personalInfo={formData.personalInfo} 
          onPersonalInfoChange={setPersonalInfo}
        />
        {(errors.personalInfo.name || errors.personalInfo.email || errors.personalInfo.phone) && (
          <div className="mt-2 space-y-1">
            {errors.personalInfo.name && (
              <div className="text-red-600 text-sm flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.personalInfo.name}
              </div>
            )}
            {errors.personalInfo.email && (
              <div className="text-red-600 text-sm flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.personalInfo.email}
              </div>
            )}
            {errors.personalInfo.phone && (
              <div className="text-red-600 text-sm flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.personalInfo.phone}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* 8. 振込先銀行選択 */}
      <div>
        <BankSelector
            selectedBank={formData.bankInfo}
            onBankChange={setSelectedBank}
            onClose={() => setIsOpen(true)}
          />
          <BankModal
            onBankChange={setSelectedBank}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        {errors.bank && (
          <div className="mt-2 text-red-600 text-sm flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.bank}
          </div>
        )}
      </div>
      
      {/* 9. 身分証アップロード（初回のみ） */}
      <div>
        <IDUpload 
          idImages={formData.idImages} 
          onIdImagesChange={setIdImages}
          usageType={formData.usageType}
        />
        {errors.idImages && (
          <div className="mt-2 text-red-600 text-sm flex items-center">
            <span className="mr-1">⚠️</span>
            {errors.idImages}
          </div>
        )}
      </div>
      
      {/* 10. クーポンコード入力 - AmountDisplayで設定するためコメントアウト */}
      {/* <CouponForm 
        couponCode={formData.couponCode || ''}
        couponRateUp={formData.couponRateUp || 0}
        onCouponCodeChange={setCouponCode}
        onCouponRateUpChange={setCouponRateUp}
      /> */}
      
      {/* 11. 備考欄 */}
      <RemarksForm 
        remarks={formData.remarks}
        onRemarksChange={setRemarks}
      />

      <div>
        IP: {ipaddress}
      </div>
      
      {/* 12. 内容確認ボタン */}
      <div className="text-center pt-8">
        <button
            onClick={handleConfirm}
            className="px-12 py-4 bg-accent text-black font-bold rounded-full hover:opacity-80 cursor-pointer shadow-lg hover:shadow-xl text-lg"
            disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              確認中...
            </span>
          ) : (
            '内容確認画面へ進む'
          )}
        </button>
      </div>
    </div>
  );
};

export default ApplyComponent;