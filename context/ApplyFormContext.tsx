// context/ApplyFormContext.tsx
'use client';

import { IDImages, UsageType } from '@/types/apply';
import { BuyingRate } from '@/types/setting';
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';


type GiftCard = {
  code: string;
  amount: string;
};

export type FormState = {
  selectedBrand: string;
  usageType: UsageType;
  giftCards: GiftCard[];
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  bankInfo: {
    bank: string,
    branch_name: string,
    branch_no: string,
    account_type: string,
    bank_no: string,
    bank_name: string,
  };
  idImages: IDImages;
  couponRateUp: number;
  couponCode: string;
  ad: string;
  affiliate: string;
  ip: string;
  remarks: string;
  buyingRates: BuyingRate[];
};

// Contextの型定義
type ApplyFormContextType = {
  formData: FormState;
  setFormData: (data: Partial<FormState>) => void;
  resetFormData: () => void;
};

const ApplyFormContext = createContext<ApplyFormContextType | undefined>(undefined);

// Context Provider
export function ApplyFormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormDataState] = useState<FormState>({
    selectedBrand: '',
    usageType: 'new',
    giftCards: Array(5).fill({ code: '', amount: '' }),
    personalInfo: {
      name: '',
      email: '',
      phone: ''
    },
    bankInfo: {
      bank: '',
      branch_name: '',
      branch_no: '',
      account_type: '',
      bank_no: '',
      bank_name: '',
    },
    idImages: { front: null, back: null },
    couponRateUp: 0.0,
    couponCode: '',
    ad: '',
    affiliate: '',
    ip: '',
    remarks: '',
    buyingRates: []
  });

  const setFormData = (data: Partial<FormState>) => {
    setFormDataState(prev => ({ ...prev, ...data }));
  };

  const resetFormData = useCallback(() => {
    setFormDataState({
      selectedBrand: '',
      usageType: 'new',
      giftCards: Array(5).fill({ code: '', amount: '' }),
      personalInfo: {
        name: '',
        email: '',
        phone: ''
      },
      bankInfo: {
        bank: '',
        branch_name: '',
        branch_no: '',
        account_type: '',
        bank_no: '',
        bank_name: '',
      },
      idImages: { front: null, back: null },
      couponRateUp: 0.0,
      couponCode: '',
      ad: '',
      affiliate: '',
      ip: '',
      remarks: '',
      buyingRates: []
    });
  }, []);

  return (
    <ApplyFormContext.Provider value={{ formData, setFormData, resetFormData }}>
      {children}
    </ApplyFormContext.Provider>
  );
}

// カスタムフック
export function useApplyForm() {
  const context = useContext(ApplyFormContext);
  if (context === undefined) {
    throw new Error('useApplyForm must be used within a ApplyFormProvider');
  }
  return context;
}