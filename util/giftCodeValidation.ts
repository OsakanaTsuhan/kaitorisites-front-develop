// util/giftCodeValidation.ts

export interface giftCodePatterns {
  pattern: RegExp;
  description: string;
  example: string;
  minAmount?: number;
  maxAmount?: number;
  amountType?: number[];
}

export interface GiftCard {
  code: string;
  amount: string;
}

export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
}

// ブランド別ギフトコードの検証ルール
const GIFT_CODE_PATTERNS: Record<string, giftCodePatterns> = {
  apple: {
    pattern: /^X[A-Z0-9]{15}$/,
    description: 'Appleギフトカードは「X」で始まる16文字の英数字です',
    example: 'XA12345678901234',
    minAmount: 500,
    maxAmount: 250000
  },
  amazon: {
    pattern: /^[A-Z0-9]{4}-[A-Z0-9]{6}-[A-Z0-9]{4,5}$/,
    description: 'Amazonギフトカードは「-」で区切られた16~7文字の英数字です',
    example: 'A123-4567AA-8901',
    minAmount: 500,
    maxAmount: 300000
  },
  googleplay: {
    pattern: /^[A-Z0-9]{16}$/,
    description: 'Google Playギフトカードは16文字の英数字です',
    example: '0MVKZ24FPD8ZSA2S',
    minAmount: 500,
    maxAmount: 50000
  },
  rakuten: {
    pattern: /^[A-Z0-9]{10}$/,
    description: '楽天ギフトカードは10文字の英数字です',
    example: 'R123456789012',
    minAmount: 500,
    maxAmount: 50000
  },
  nintendo: {
    pattern: /^[A-Z0-9]{16}$/,
    description: 'Nintendoギフトカードは16文字の英数字です',
    example: 'E0M1X5M48QPQCKJC',
    amountType: [500, 1000, 1500, 2000, 3000, 5000, 9000]
  },
  playstation: {
    pattern: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/,
    description: 'PlayStationギフトカードは「-」で区切られた英数字です',
    example: 'FNNG-MFNC-KQA8',
    minAmount: 500,
    maxAmount: 300000
  },
  netflix: {
    pattern: /^NAA[A-Z0-9]{10,20}$/,
    description: 'NetflixギフトカードはNAAで始まる英数字です',
    example: 'NAA73C9MZ3UJ9XE4',
    minAmount: 2000,
    maxAmount: 30000
  },
  line: {
    pattern: /^[A-Za-z0-9]{9,18}$/, // 文字数不明
    description: 'LINEギフトカードは半角英数字で大文字・小文字から成り立っています',
    example: 'QUUK2B6WBRLM',
    minAmount: 500,
    maxAmount: 50000
  },
  paypay: {
    pattern: /^[A-Z0-9]{16}$/,
    description: 'PayPayギフトカードは16文字の英数字です',
    example: 'WU3MU8EVTLEUCXUH',
    minAmount: 500,
    maxAmount: 50000
  },
  nanaco: {
    pattern: /^[A-Za-z0-9]{16}$/,
    description: 'NANACOギフトカードは16文字の英数字です',
    example: '0rFUP9V8HAdJKTV2',
    minAmount: 500,
    maxAmount: 50000
  },
  webmoney: {
    pattern: /^[A-Za-z0-9]{16}$/,
    description: 'WebMoneyギフトカードは16文字の英数字です',
    example: 'v3wc77qcmyaagsd8',
    minAmount: 500,
    maxAmount: 50000
  },
   bitcash: {
     pattern: /^[あ-ん]{16}$/, // ひらがな16文字
     description: 'BitCashギフトカードは16文字のひらがなです',
     example: 'あいうえおかきくけこさしすせそたち',
     minAmount: 500,
     maxAmount: 50000
   },
   tcnext: {
    pattern: /^[0-9]{16}-[0-9]{4}$/,
    description: '図書カードNEXTギフトカードは [カード番号16桁] - [PIN番号4桁] の書式です',
    example: '1091612365206586-2008',
    minAmount: 500,
    maxAmount: 50000
  },
   quopay: {
    pattern: /^[A-Za-z0-9]{16}$/,
    description: 'QUOカードPayギフトカードは16文字の英数字です',
    example: 'QUUK2B6WBRLM',
    minAmount: 500,
    maxAmount: 50000
  },
  ubereats: {
    pattern: /^NAA[A-Z0-9]{13}$/,
    description: 'UberEatsギフトカードはNAAで始まる16文字の英数字です',
    example: 'NAAP4JGT6YMTXS3H',
    minAmount: 500,
    maxAmount: 50000
  },
  majica: {
    pattern: /^https:\/\/donki\.e-gift\.co\/c\/[A-Za-z0-9]{10,50}\/1$/,
    description: 'Majicaギフト券は「https://donki.e-gift.co/c/」から始まり「/1」で終わる英数字です',
    example: 'https://donki.e-gift.co/c/9K2m4Kgv85j1SEAM/1',
    minAmount: 500,
    maxAmount: 50000
  },
  booklive: {
    pattern: /^[A-Za-z0-9]{16}-[0-9]{4}$/,
    description: 'BookLiveギフト券は [カード番号16桁] - [PIN番号4桁] の書式です',
    example: '7130109011280986-6738',
    minAmount: 1000,
    maxAmount: 20000
  },
  meta: {
    pattern: /^[A-Za-z0-9]{16}$/,
    description: 'Metaギフトカードは16文字の英数字です',
    example: 'NABLE5J5492W9MME',
  },
  xwin: {
    pattern: /^[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}$/,
    description: 'XBOX/Windowsギフトカードは「-」で区切られた英数字です',
    example: 'WDC7H-N6JPD-WV6C9-7BVHV-JQH4D',
    minAmount: 1500,
    maxAmount: 10000
  },
  nike: {
    pattern: /^[0-9]{19}-[0-9]{6}$/,
    description: 'Nikeギフト券は [カード番号19桁] - [PIN番号6桁] の書式です',
    example: '6364335141014046309-732528',
    minAmount: 1500,
    maxAmount: 10000
  },
  jcb: {
    pattern: /^[0-9]{16}-[0-9]{8}$/,
    description: 'JCBギフト券は [カード番号16桁] - [PIN番号8桁] の書式です',
    example: '4561234567890123-12345678',
    minAmount: 1000,
    maxAmount: 10000
  }
};

// 個別ギフトコードの検証
export const validateGiftCode = (code: string, brand: string): ValidationResult => {
  const trimmedCode = code.trim();
  
  // 空の場合は有効（必須チェックは別途行う）
  if (trimmedCode === '') {
    return { isValid: true, errorMessage: '' };
  }
  
  // ブランドの検証ルールを取得
  const brandRule = GIFT_CODE_PATTERNS[brand as keyof typeof GIFT_CODE_PATTERNS];
  
  if (!brandRule) {
    return { 
      isValid: false, 
      errorMessage: `未対応のブランドです: ${brand}` 
    };
  }
  
  // パターンマッチング
  if (!brandRule.pattern.test(trimmedCode)) {
    return { 
      isValid: false, 
      errorMessage: `${brandRule.description}（例: ${brandRule.example}）` 
    };
  }
  
  return { isValid: true, errorMessage: '' };
};

// ギフトカード配列の検証
export const validateGiftCards = (giftCards: GiftCard[], selectedBrand: string): ValidationResult => {
  // 空のギフトカードをフィルタリング
  const validCards = giftCards.filter(card => 
    card.code.trim() !== '' && card.amount.trim() !== ''
  );
  
  // 有効なカードがない場合
  if (validCards.length === 0) {
    return { 
      isValid: false, 
      errorMessage: 'ギフトカード情報を入力してください' 
    };
  }
  
  // 各カードの検証
  for (const card of validCards) {
    const codeValidation = validateGiftCode(card.code, selectedBrand);
    if (!codeValidation.isValid) {
      return codeValidation;
    }
    
    // 金額の検証
    const amount = parseInt(card.amount);
    if (isNaN(amount) || amount <= 0) {
      return { 
        isValid: false, 
        errorMessage: '有効な金額を入力してください' 
      };
    }
    
    // ブランド別の金額制限を取得
    const brandRule = GIFT_CODE_PATTERNS[selectedBrand as keyof typeof GIFT_CODE_PATTERNS];
    if (!brandRule) return { isValid: false, errorMessage: '未対応のブランドです' };

    if (brandRule.minAmount && amount < brandRule.minAmount) {
      return { 
        isValid: false, 
        errorMessage: `こちらのギフト券の金額は${brandRule.minAmount}円以上で入力してください` 
      };
    }
    
    if (brandRule.maxAmount && amount > brandRule.maxAmount) {
      return { 
        isValid: false, 
        errorMessage: `こちらのギフト券の金額は${brandRule.maxAmount.toLocaleString()}円以下で入力してください` 
      };
    }

    if (brandRule.amountType && !brandRule.amountType.includes(amount)) {
      return { 
        isValid: false, 
        errorMessage: `こちらのギフト券の金額は${brandRule.amountType.join('、')}円で入力してください` 
      };
    }
  }
  
  return { isValid: true, errorMessage: '' };
};

// ブランド別の検証ルール情報を取得
export const getBrandValidationInfo = (brand: string) => {
  return GIFT_CODE_PATTERNS[brand as keyof typeof GIFT_CODE_PATTERNS] || null;
};

// 全ブランドの検証ルールを取得
export const getAllBrandValidationInfo = () => {
  return GIFT_CODE_PATTERNS;
};