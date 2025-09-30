import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BankInfo } from '@/types/apply';
import { GetBanksOptions } from '@/util/bankoptions';
import { BankArray } from '@/util/bankArray';
import { BankOption } from '@/util/bankoptions';



// メイン銀行のデータ
const mainBanks: BankOption[] = [
  { code: '9900', name: 'ゆうちょ銀行' },
  { code: '0036', name: '楽天銀行' },
  { code: '0005', name: '三菱UFJ銀行' },
  { code: '0033', name: 'PayPay銀行' },
  { code: '0038', name: '住信SBIネット銀行' },
  { code: '0009', name: '三井住友銀行' },
  { code: '0001', name: 'みずほ銀行' },
  { code: '0010', name: 'りそな銀行' },
  { code: '0017', name: '埼玉りそな銙' },
  { code: '0039', name: 'auじぶん銀行' },
  { code: '0034', name: 'セブン銀行' },
];

// その他の金融機関タイプ
const bankTypes = [
  { id: 'etc', name: 'その他銀行' },
  { id: 'shinkin', name: '信用金庫' },
  { id: 'shinkumi', name: '信用組合' },
  { id: 'nokyo', name: '農協' },
  { id: 'gyokyo', name: '漁協' },
  { id: 'roukin', name: '労働金庫' },
];

// ひらがな文字のリスト
const hiraganaChars = [
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

const dakutenChars = [
  ['が', 'ぎ', 'ぐ', 'げ', 'ご', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ'],
  ['だ', 'で', 'ど', 'ば', 'び', 'ぶ', 'べ', 'ぼ'],
  ['ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'],
];

type ViewMode = 'main' | 'kana' | 'results';

const BankModal = ({ onBankChange, isOpen, onClose }: { onBankChange: (bank: BankInfo) => void, isOpen: boolean, onClose: () => void }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('main');
  const [selectedBankType, setSelectedBankType] = useState<string>('');
  const [bankCode, setBankCode] = useState<string>('');
  const [bankCodeError, setBankCodeError] = useState<string>('');
  const [searchResults, setSearchResults] = useState<BankOption[]>([]);
  const [searchChar, setSearchChar] = useState<string>('');

  // モーダルが閉じられた時の初期化
  useEffect(() => {
    if (!isOpen) {
      setViewMode('main');
      setSelectedBankType('');
      setBankCode('');
      setBankCodeError('');
      setSearchResults([]);
      setSearchChar('');
    }
  }, [isOpen]);

  // メイン銀行の選択
  const handleMainBankSelect = (name: string) => {
    
    onBankChange({
      bank: name,
      branch_name: '',
      branch_no: '',
      account_type: '',
      bank_no: '',
      bank_name: ''
    });
    onClose();
  };

  // 銀行タイプの選択（その他銀行、信用金庫など）
  const handleBankTypeSelect = (typeId: string) => {
    const bankType = bankTypes.find(type => type.id === typeId);
    setSelectedBankType(bankType?.name || '');
    setViewMode('kana');
  };

  // ひらがな文字による検索
  const handleCharacterSearch = (char: string, genre: string) => {
    setSearchChar(char);
 
    const banksOptions: BankOption[] = GetBanksOptions(char, genre);

    setSearchResults(banksOptions);
    setViewMode('results');
  };

  // 金融機関コードによる検索
  const handleCodeSearch = () => {
    setBankCodeError('');
    if (!bankCode) {
      setBankCodeError('金融機関コードを入力してください');
      return;
    }
    if (!/^\d{4}$/.test(bankCode)) {
      setBankCodeError('4桁の数字を入力してください');
      return;
    }

    const bk_name = BankArray[bankCode];
    setSearchResults([{ code: bankCode, name: bk_name || '' }]);
    setViewMode('results');
    // const foundBank: BankInfo = {
    //   bank: bk_name || '',
    //   branch_name: '',
    //   branch_no: '',
    //   account_type: '',
    //   bank_no: bankCode,
    //   bank_name: ''
    // };
    
    // onBankChange(foundBank);
    // onClose();
  };

  // 検索結果から銀行を選択
  const handleResultBankSelect = (code: string) => {
    const bk_name = BankArray[code];
    onBankChange({
      bank: bk_name || '',
      branch_name: '',
      branch_no: '',
      account_type: '',
      bank_no: '',
      bank_name: ''
    });
    onClose();
  };

  // 戻るボタンの処理
  const handleBack = () => {
    if (viewMode === 'results') {
      setViewMode('kana');
    } else if (viewMode === 'kana') {
      setViewMode('main');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        {/* メイン画面 */}
        {viewMode === 'main' && (
          <div>
            <h3 className="text-sm font-bold mb-4">金融機関を選択してください</h3>
            
            {/* メイン銀行リスト */}
            <ul className="space-y-2 mb-6 grid grid-cols-2 gap-2">
              {mainBanks.map((bank) => (
                <li
                  key={bank.code}
                  onClick={() => handleMainBankSelect(bank.name)}
                  className="flex items-center p-1 lg:p-3 border rounded hover:bg-gray-100 cursor-pointer text-xs lg:text-sm"
                >
                  <Image
                    src={`/img/bank/${bank.code}.png`}
                    alt=""
                    width={24}
                    height={24}
                    className="mr-3"
                  />
                  {bank.name}
                </li>
              ))}
            </ul>

            {/* 注意書き */}
            <p className="text-xs lg:text-sm text-gray-600 mb-4">
              <span className="text-red-500">※</span>
              上記以外の金融機関は以下より「金融機関名」または「金融機関コード」にて検索出来ます。
            </p>

            {/* その他の金融機関タイプ */}
            <ul className="grid grid-cols-2 gap-2 mb-4">
              {bankTypes.map((type) => (
                <li
                  key={type.id}
                  onClick={() => handleBankTypeSelect(type.id)}
                  className="p-1 lg:p-3 border rounded hover:bg-gray-100 cursor-pointer text-center "
                >
                  {type.name}
                </li>
              ))}
            </ul>

            {/* 金融機関コード検索 */}
            <div className="text-center">
              <div className="mb-2">
                {bankCodeError && (
                  <span className="text-red-500 text-sm">{bankCodeError}</span>
                )}
              </div>
              <label className="inline-block mr-2">金融機関コード：</label>
              <input
                type="text"
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                className="border rounded px-2 py-1 mr-2"
                maxLength={4}
              />
              <button
                onClick={handleCodeSearch}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
              >
                検索
              </button>
            </div>
          </div>
        )}

        {/* ひらがな選択画面 */}
        {viewMode === 'kana' && (
          <div>
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="text-blue-500 hover:text-blue-700 mr-4"
              >
                戻る
              </button>
              <h2 className="text-xl font-bold">{selectedBankType}</h2>
            </div>

            {/* ひらがな文字グリッド */}
            <div className="space-y-4">
              {hiraganaChars.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-2">
                  {row.map((char, charIndex) => (
                    <div key={charIndex} className="w-10 h-10">
                      {char && (
                        <button
                          onClick={() => handleCharacterSearch(char, selectedBankType)}
                          className="w-full h-full border rounded hover:bg-gray-100 cursor-pointer text-center"
                        >
                          {char}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* 濁点・半濁点文字 */}
              <div className="mt-6 space-y-2">
                {dakutenChars.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center space-x-2">
                    {row.map((char, charIndex) => (
                      <button
                        key={charIndex}
                        onClick={() => handleCharacterSearch(char, selectedBankType)}
                        className="w-10 h-10 border rounded hover:bg-gray-100 cursor-pointer text-center"
                      >
                        {char}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 検索結果画面 */}
        {viewMode === 'results' && (
          <div>
            <div className="flex items-center mb-4">
              <button
                onClick={handleBack}
                className="text-blue-500 hover:text-blue-700 mr-4"
              >
                戻る
              </button>
              <h2 className="text-xl font-bold">
                「{searchChar}」の検索結果
              </h2>
            </div>

            {searchResults.length === 0 ? (
              <p className="text-gray-600">該当する金融機関が見つかりませんでした。</p>
            ) : (
              <ul className="space-y-2">
                {searchResults.map((bank) => (
                  <li
                    key={bank.code}
                    onClick={() => handleResultBankSelect(bank.code)}
                    className="p-3 border rounded hover:bg-gray-100 cursor-pointer"
                  >
                    {bank.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BankModal;