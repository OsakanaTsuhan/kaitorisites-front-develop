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
import PreviousDataSelector from './PreviousDataSelector';
import RememberMeForm from './RememberMeForm';
import { LINE_RATE_UP, MAIN_BRAND } from '@/util/appConst';
import { searchPreviousData } from '@/actions/apply';
import { getUserIds } from '@/lib/secure';


const ApplyComponent = ({brand, buyingRates, coupons, ad, affiliate, cp}: {brand: string | null | undefined, buyingRates: BuyingRate[], coupons: Coupon[], ad: string, affiliate: string, cp: string}) => {

  const router = useRouter();
  const { formData, setFormData } = useApplyForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false)
  
  useEffect(() => {
    SetFormData();
  }, [brand, cp, ad])

  const SetFormData = () => {
    // Only set brand if it's not already set in formData (preserve user's selection)
    const shouldSetBrand = !formData.selectedBrand || (brand && brand.trim() !== '');
    const brandToSet = shouldSetBrand ? (brand && brand.trim() !== '' ? brand : MAIN_BRAND) : formData.selectedBrand;
    
    // Then handle coupon logic if needed
    if(ad) {
      setFormData({ ...formData, selectedBrand: brandToSet, couponCode: "ln1", couponRateUp: LINE_RATE_UP || 0, buyingRates: buyingRates });
    }else if(cp) {
      const couponCode = coupons.find(coupon => cp === coupon.coupon_code)?.coupon_code;
      const couponRateUp = coupons.find(coupon => cp === coupon.coupon_code)?.rate_up;
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
  const setIsRememmber = (isRememmber: boolean) => setFormData({ ...formData, isRememmber: isRememmber });

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

    if(formData.previousOrderId == '') {
    
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
      remarks: formData.remarks,
      buyingRates: formData.buyingRates,
      previousOrderId: formData.previousOrderId,
      isRememmber: formData.isRememmber
    };

    if(submitData.bankInfo.account_type === '') {
      submitData.bankInfo.account_type = '普通';
    }
    router.push('/apply/confirm');
    setIsSubmitting(false);
  };


  const handleGetPreviousData = async() => {

    setIsSearching(true);

    try {

      const { anonId, siteId } = await getUserIds();
      // console.log('anonId', anonId);
      // console.log('siteId', siteId);
      // alert('anonId:::' + anonId + ' siteId:::' + siteId);
      if(anonId === '' || siteId === '') {
        alert('前回のデータがありませんでした');
        setIsSearching(false);
        return;
      }
      
      const result = await searchPreviousData({ anonId, siteId });
      
      if (result.success) {
        const data = result.data;

        if(data.masked_name === '' || data.masked_mail === '' || data.masked_tel === '' || data.bank === '' || data.masked_branch_name === '' || data.masked_branch_no === '' || data.masked_bank_no === '' || data.masked_bank_name === '') {
          alert('前回のデータがありませんでした');
          setIsSearching(false);
          return;
        }
        
        // Set all data at once to avoid state update issues
        setFormData({
          ...formData,
          personalInfo: { 
            name: data.masked_name, 
            email: data.masked_mail, 
            phone: data.masked_tel 
          },
          bankInfo: {
            ...formData.bankInfo,
            bank: data.bank,
            branch_name: data.masked_branch_name,
            branch_no: data.masked_branch_no,
            account_type: '普通',
            bank_no: data.masked_bank_no,
            bank_name: data.masked_bank_name
          },
          previousOrderId: anonId
        });
      } else {
        alert(result.message);
      }
      
    } catch (error) {
      alert('前回のデータはありませんでした');
    }finally {
      setIsSearching(false);
    }
  }

  const handleNewInput = () => {
    setFormData({
      ...formData,
      personalInfo: { 
        name: '', 
        email: '', 
        phone: '' 
      },
      bankInfo: {
        ...formData.bankInfo,
        bank: '',
        branch_name: '',
        branch_no: '',
        account_type: '普通',
        bank_no: '',
        bank_name: ''
      },
      previousOrderId: ''
    });
  }

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

      {/* 前回の申し込み情報選択（リピート利用者のみ） */}
      {formData.usageType == "repeat" && (
        <PreviousDataSelector
          usePreviousData={formData.previousOrderId !== ''}
          isSearching={isSearching}
          onGetPreviousData={handleGetPreviousData}
          onNewInput={handleNewInput}
        />
      )}
      
      {/* 6. 個人情報入力 */}
      <div>
          <PersonalInfoForm 
            personalInfo={formData.personalInfo} 
            onPersonalInfoChange={setPersonalInfo}
            usePreviousData={formData.previousOrderId !== ''}
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
            usePreviousData={formData.previousOrderId !== ''}
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

      {/* 12. リメンバーミー利用 */}
      <RememberMeForm 
        isRememmber={formData.isRememmber}
        onIsRememmberChange={setIsRememmber}
      />
      
      {/* 13. 内容確認ボタン */}
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