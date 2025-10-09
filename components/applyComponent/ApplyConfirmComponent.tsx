"use client"
import React, { useEffect, useState } from 'react';
import { useApplyForm } from '@/context/ApplyFormContext';
import { submitApplication } from '@/actions/apply'; // Server Actionsをインポート
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { calcRate } from '@/util/apply';
import { BuyingRate } from '@/types/setting';
import Image from 'next/image';
import { getUserIP } from '@/lib/getUserIP';

const ApplicationConfirmComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ipaddress, setIpaddress] = useState<string>('unknown');
  const [successSubmit, setSuccessSubmit] = useState(false);
  const cardsPerPage = 10;
 
  const router = useRouter();
  const { formData } = useApplyForm();

  useEffect(() => {
    // Get user's IP address
    const fetchIP = async () => {
      const ip = await getUserIP();
      setIpaddress(ip);
    };
    fetchIP();
  }, []); 
 

  // Check for missing data and redirect if needed
  React.useEffect(() => {
    if(formData.selectedBrand === '') { // データなしの場合
      alert("問題が発生しましたので、申込画面からやり直してください");
      router.push('/apply');
    }
  }, [formData.selectedBrand, router]);

  if(formData.selectedBrand === '') {
    return null;
  }



  const handleSubmit = async () => {
    setIsSubmitting(true);

    // const result  = {success: true, message: '申込みが完了しました！'};
    try {
      const result = await submitApplication(formData, finalRate, ipaddress);

      if (result.success) {
        setSuccessSubmit(true);
        // 完了ページにリダイレクト
        router.push('/apply/complete');
      } else {
        alert(result.message);
      }
      
    } catch (error) {
      alert('申込み処理中にエラーが発生しました。もう一度お試しください。');
    }finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/apply');
  };

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">申込み情報が見つかりません</h2>
          <p className="text-gray-600 mb-8">申込み画面からやり直してください</p>
          <button 
            onClick={() => alert('申込み画面に戻ります')}
            className="px-8 py-3 bg-rose-600 text-white font-semibold rounded-full hover:bg-rose-700 transition-colors"
          >
            申込み画面へ戻る
          </button>
        </div>
      </div>
    );
  }

  // 空のギフトカードをフィルタリング
  const validGiftCards = formData.giftCards.filter(card => 
    card.code.trim() !== '' && card.amount.trim() !== ''
  );

  // ページネーション計算
  const totalCards = validGiftCards.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = validGiftCards.slice(startIndex, endIndex);

  // 金額計算（クーポン適用考慮）
  const totalAmount = validGiftCards.reduce((sum, card) => sum + parseInt(card.amount), 0);
  const selectedRate = formData.buyingRates.find((rate: BuyingRate) => rate.brand === formData.selectedBrand);
  
  if(!selectedRate) {
    alert("問題が発生しましたので、申込画面からやり直してください");
    router.push('/apply');
  }
  const finalRate = formData.couponRateUp > 0 ? calcRate(selectedRate, formData.usageType) + formData.couponRateUp : calcRate(selectedRate, formData.usageType);
  // const finalRate = calcRate(selectedRate, formData.usageType) + (formData.couponRateUp || 0);
  const finalBuybackAmount = Math.floor(totalAmount * (finalRate / 100));

  // 率を小数点第一位まで表示する関数
  const formatRate = (rate: number): string => {
    return rate.toFixed(1);
  };

  return (
    
    <div className="space-y-8">
      <div className="text-lg lg:text-xl text-gray-600 mt-6 w-full text-center">
        <div className="font-semibold text-rose-600 my-2">お申し込みはまだ完了していません</div>
        <span className="text-sm lg:text-base">ご入力いただいたお申込内容をご確認いただき、問題ないようでしたら「申し込む」ボタンを押してください。内容を修正したい場合は「修正する」ボタンを押してください。</span>
      </div>
    <style jsx>{`
    .text-fruit-gradient {
      background: linear-gradient(45deg, #F871A0, #F97316);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}</style>
      {/* 券種・利用回数・買取率 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          券種・買取情報
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">券種</div>
            <div className="text-lg font-semibold text-gray-800 flex items-center justify-center">
              <div className="w-10 h-10 mr-2 rounded-full">
              <Image src={`/images/brands/icon_${formData.selectedBrand}.webp`} alt={formData.selectedBrand} width={100} height={100} className="rounded-full shadow-md" />
              </div>
              <div className="text-lg font-semibold text-gray-800">{formData.buyingRates.find(rate => rate.brand === formData.selectedBrand)?.brand_name}</div>
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">ご利用回数</div>
            <div className="text-lg font-semibold text-gray-800">
              {formData.usageType === 'new' ? '初回' : '2回目以降'}
            </div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">最終買取率</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatRate(finalRate)}%
              {formData.couponRateUp > 0.0 && (
                <div className="text-xs text-green-600 mt-1 font-medium">
                  (クーポン{formatRate(formData.couponRateUp)}%up)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ギフト券情報 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            ギフト券情報
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              全{totalCards}枚（{startIndex + 1}-{Math.min(endIndex, totalCards)}を表示）
            </div>
            {/* ページネーション - 右上配置 */}
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  前
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-2 py-1 text-xs rounded transition-colors ${
                        currentPage === pageNum
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  次
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-3">
          {currentCards.map((card, index) => (
            <div key={startIndex + index} className="p-3 bg-gray-50 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex-1">
                  <div className="font-medium text-gray-800 text-sm break-all">
                    {card.code}
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-lg font-semibold text-gray-800">¥{parseInt(card.amount).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 金額詳細 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          金額詳細
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">額面合計</div>
            <div className="text-3xl font-bold text-gray-800">
              ¥{totalAmount.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">買取額</div>
            <div className="text-4xl font-bold text-rose-600 mb-2">
              ¥{finalBuybackAmount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* お客様情報 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          お客様情報
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">お名前</div>
            <div className="font-semibold text-gray-800">{formData.personalInfo.name}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">メールアドレス</div>
            <div className="font-semibold text-gray-800">{formData.personalInfo.email}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">電話番号</div>
            <div className="font-semibold text-gray-800">{formData.personalInfo.phone}</div>
          </div>
        </div>
      </div>

      {/* 振込先情報 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        お振込み先口座情報
        </h3>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">銀行名</div>
          <div className="font-semibold text-gray-800">{formData.bankInfo.bank}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">支店名</div>
          <div className="font-semibold text-gray-800">{formData.bankInfo.branch_name}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">支店番号</div>
          <div className="font-semibold text-gray-800">{formData.bankInfo.branch_no}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">口座種別</div>
          <div className="font-semibold text-gray-800">{formData.bankInfo.account_type}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">口座番号</div>
          <div className="font-semibold text-gray-800">{formData.bankInfo.bank_no}</div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="text-sm text-gray-600 mb-1">口座名義</div>
          <div className="font-semibold text-gray-800">{formData.bankInfo.bank_name}</div>
        </div>
      </div>

      {/* 身分証明書（初回のみ表示） */}
      {formData.usageType === 'new' && formData.idImages && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            身分証明書
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-2 text-center">表面</div>
              {formData.idImages.front ? (
                <div className="space-y-2">
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(formData.idImages.front)} 
                      alt="身分証明書（表面）"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-gray-700 font-semibold text-sm">✓ アップロード済み</div>
                    <div className="text-xs text-gray-500 mt-1">{formData.idImages.front.name}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">画像なし</span>
                </div>
              )}
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-gray-600 mb-2 text-center">裏面</div>
              {formData.idImages.back ? (
                <div className="space-y-2">
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={URL.createObjectURL(formData.idImages.back)} 
                      alt="身分証明書（裏面）"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-gray-700 font-semibold text-sm">✓ アップロード済み</div>
                    <div className="text-xs text-gray-500 mt-1">{formData.idImages.back.name}</div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">画像なし</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 備考 */}
      {formData.remarks && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            その他情報
          </h3>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="text-sm text-gray-600 mb-1">備考</div>
            <div className="text-gray-800">{formData.remarks}</div>
          </div>
        </div>
      )}

      {/* 利用規約同意 */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          利用規約への同意
        </h3>
        <div className="text-sm lg:text-base flex items-center space-x-5">
          <input
            type="checkbox"
            id="terms-agreement"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 text-rose-600 bg-gray-100 border-gray-300 rounded focus:ring-rose-500 focus:ring-2 cursor-pointer"
          />
          <label htmlFor="terms-agreement" className="text-gray-700">
            <Link href="/rules" target="_blank" className="font-semibold text-rose-600 hover:text-rose-700 underline">利用規約</Link>と
            <Link href="/privacypolicy" target="_blank" className="font-semibold text-rose-600 hover:text-rose-700 underline">個人情報保護方針</Link>
            に同意する
          </label>
          
        </div>
        <p className="text-sm text-gray-600 mt-4">利用規約と個人情報保護方針に同意をしていただけない場合は、お申し込みが完了しません。</p>
      </div>

      {/* ボタンエリア */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !agreedToTerms}
          className={`px-12 py-4 font-bold rounded-full transition-all duration-300 shadow-lg text-lg ${
            !agreedToTerms 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-accent text-black hover:opacity-80 hover:shadow-xl cursor-pointer'
          } ${isSubmitting ? 'opacity-50 transform-none' : ''}`}
        >
          {isSubmitting || successSubmit ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              申し込み中...
            </span>
          ) : (
            '申し込む'
          )}
        </button>
        <button
          onClick={handleBack}
          disabled={isSubmitting}
          className="px-8 py-4 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 cursor-pointer"
        >
          修正する
        </button>
      </div>
      
    </div>
  );
};

export default ApplicationConfirmComponent;