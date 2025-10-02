export type BankType = '0' | '1' | '2' | '3' | '4' | '5';

export interface Bank {
  b_type: BankType;      // 銀行タイプ
  b_code: string;        // 銀行コード（ゼロ詰め "0001" など）
  b_name: string;        // 銀行名（正式名）
  b_kana: string;        // 銀行名（カナ）
}


// メイン銀行のデータ
export const mainBanks: Bank[] = [
  { b_code: '9900', b_name: 'ゆうちょ銀行', b_kana: 'ゆ', b_type: '0' },
  { b_code: '0036', b_name: '楽天銀行', b_kana: 'ら', b_type: '0' },
  { b_code: '0005', b_name: '三菱UFJ銀行', b_kana: 'み', b_type: '0' },
  { b_code: '0033', b_name: 'PayPay銀行', b_kana: 'ぺ', b_type: '0' },
  { b_code: '0038', b_name: '住信SBIネット銀行', b_kana: 'み', b_type: '0' },
  { b_code: '0009', b_name: '三井住友銀行', b_kana: 'み', b_type: '0' },
  { b_code: '0001', b_name: 'みずほ銀行', b_kana: 'み', b_type: '0' },
  { b_code: '0010', b_name: 'りそな銀行', b_kana: 'り', b_type: '0' },
  { b_code: '0017', b_name: '埼玉りそな銀行', b_kana: 'さ', b_type: '0' },
  { b_code: '0039', b_name: 'auじぶん銀行', b_kana: 'え', b_type: '0' },
  { b_code: '0034', b_name: 'セブン銀行', b_kana: 'せ', b_type: '0' },
];

// その他の金融機関タイプ
export const bankTypes = [
  { id: 'etc', name: 'その他銀行', b_type: '0' },
  { id: 'shinkin', name: '信用金庫', b_type: '1' },
  { id: 'shinkumi', name: '信用組合', b_type: '2' },
  { id: 'nokyo', name: '農協', b_type: '3' },
  { id: 'gyokyo', name: '漁協', b_type: '4' },
  { id: 'roukin', name: '労働金庫', b_type: '5' },
];

// ひらがな文字のリスト
export const hiraganaChars = [
  ['あ', 'い', 'う', 'え', 'お'],
  ['か', 'き', 'く', 'け', 'こ'],
  ['さ', 'し', 'す', 'せ', 'そ'],
  ['た', 'ち', 'つ', 'て', 'と'],
  ['な', 'に', 'ぬ', 'ね', 'の'],
  ['は', 'ひ', 'ふ', 'へ', 'ほ'],
  ['ま', 'み', 'む', 'め', 'も'],
  ['や', '', 'ゆ', '', 'よ'],
  ['ら', 'り', 'る', 'れ', 'ろ'],
  ['わ', 'を', 'ん'],
];

export const dakutenChars = [
  ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
  ['だ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'],
  ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
];