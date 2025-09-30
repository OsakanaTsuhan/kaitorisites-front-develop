"use client"
import { submitContact } from '@/actions/contact';
import { ContactType } from '@/types/contact';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const ContactComponent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactType>({
    name: '',
    replyMethod: '',
    mail: '',
    tel: '',
    message: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    replyMethod: '',
    mail: '',
    tel: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialChatQuestion, setInitialChatQuestion] = useState('');

  const replyOptions = [
    { value: 'none', label: '返信不要' },
    { value: 'mail', label: 'メール返信' },
    { value: 'tel', label: '電話対応希望' }
  ];

  const frequentQuestions = [
    { text: '買取までの流れを教えて', icon: '📋' },
    { text: '買取率はどのくらいですか？', icon: '💰' },
    { text: '必要な書類は何ですか？', icon: '📄' },
    { text: '対応時間はいつですか？', icon: '⏰' },
    { text: '手数料はかかりますか？', icon: '💳' }
  ];

  const handleQuestionClick = (question: string) => {
    setInitialChatQuestion(question);
    setIsChatOpen(true);
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // エラーをクリア
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      replyMethod: '',
      mail: '',
      tel: '',
      message: ''
    };

    let hasErrors = false;

    // お名前チェック
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
      hasErrors = true;
    }

    // 返信方法チェック
    if (!formData.replyMethod) {
      newErrors.replyMethod = 'ご希望の返信方法を選択してください';
      hasErrors = true;
    }

    // メールアドレスチェック（メール返信の場合は必須）
    if (!formData.mail.trim()) {
      newErrors.mail = 'メールアドレスを入力してください';
      hasErrors = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
      newErrors.mail = '正しいメールアドレスを入力してください';
      hasErrors = true;
    }

    // 電話番号チェック（電話対応の場合は必須）
    if (!formData.tel.trim()) {
      newErrors.tel = '電話番号を入力してください';
      hasErrors = true;
    } else if (!/^[\d\-\+\(\)\s]+$/.test(formData.tel)) {
      newErrors.tel = '正しい電話番号を入力してください';
      hasErrors = true;
    }

    // お問い合わせ内容チェック
    if (!formData.message.trim()) {
      newErrors.message = 'お問い合わせ内容を入力してください';
      hasErrors = true;
    }

    setErrors(newErrors);
    if(hasErrors) {
      alert('エラーがあります。入力内容を確認してください');
    }
    return !hasErrors;
  };

  const handleSubmit = async () => {
    if(!window.confirm('お問い合わせを送信しますか？')) return;
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 実際のアプリケーションでは、ここでAPIを呼び出し
      console.log('Submitting contact form:', formData);
      
      const result = await submitContact(formData);
      if (result.success) {
        router.push('/contact/complete');
      } else {
        alert(result.message);
      }
      // フォームをリセット
      setFormData({
        name: '',
        replyMethod: '',
        mail: '',
        tel: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  
        <div className="">
          <div className="bg-white/90  shadow-lg border py-8 px-4 rounded-2xl lg:px-8  backdrop-blur-sm border-orange-200 space-y-6 mb-6">
            
            {/* 1. お名前 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                お名前
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
                placeholder="田中 太郎"
              />
              {errors.name && (
                <div className="mt-2 text-red-600 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.name}
                </div>
              )}
            </div>

            {/* 2. ご希望の返信方法 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ご希望の返信方法
              </label>
              <div className="grid grid-cols-3 gap-1 lg:gap-3">
                {replyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateField('replyMethod', option.value)}
                    className={`p-2 lg:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      formData.replyMethod === option.value
                        ? 'border-rose-500 bg-rose-50 text-rose-700'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg mb-1">
                        {option.value === 'none' && '🚫'}
                        {option.value === 'mail' && '📧'}
                        {option.value === 'tel' && '📞'}
                      </div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.replyMethod && (
                <div className="mt-2 text-red-600 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.replyMethod}
                </div>
              )}
            </div>

            {/* 3. メールアドレス */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                value={formData.mail}
                onChange={(e) => updateField('mail', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors border-gray-200 focus:border-rose-500`}
                placeholder="example@email.com"
              />
              {errors.mail && (
                <div className="mt-2 text-red-600 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.mail}
                </div>
              )}
            </div>

            {/* 4. 電話番号 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                電話番号
              </label>
              <input
                type="tel"
                value={formData.tel}
                onChange={(e) => updateField('tel', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors border-gray-200 focus:border-rose-500`}
                placeholder="09012345678"
              />
              {errors.tel && (
                <div className="mt-2 text-red-600 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.tel}
                </div>
              )}
            </div>

            {/* 5. お問い合わせ内容 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                お問い合わせ内容
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors resize-none"
                placeholder="お問い合わせ内容をご記入ください"
              />
              {errors.message && (
                <div className="mt-2 text-red-600 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.message}
                </div>
              )}
            </div>

            {/* 6. 送信ボタン */}
            {/* <div className="pt-4">
             
              
            </div> */}

          </div>

          <div className="text-center pt-8">
             <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-12 py-4 bg-accent text-black font-bold rounded-full hover:opacity-80 cursor-pointer shadow-lg hover:shadow-xl text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    送信中...
                  </span>
                ) : (
                  '送信する'
                )}
                </button>
          </div>
            {/* AI Chatbot Component */}
        {/* <AIChatbotComponent 
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          initialQuestion={initialChatQuestion}
        /> */}

        {/* Contact Info */}
        {/* <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200">
             <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3 text-center">
                💬 よくある質問（AIチャットで即座に回答）
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {frequentQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question.text)}
                    className="text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-sm text-blue-700 hover:text-blue-800 transition-colors flex items-center"
                  >
                    <span className="mr-2">{question.icon}</span>
                    <span className="truncate">{question.text}</span>
                  </button>
                ))}
              </div>
              <div className="text-center mt-3">
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  その他の質問もAIチャットで相談する
                </button>
              </div>
            </div>
          </div>
        </div> */}
        </div>
  );
};

export default ContactComponent;