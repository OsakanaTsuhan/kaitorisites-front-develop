"use client"

import React from 'react';
import { GiftCard } from '@/types/apply';

const GiftCardForm = ({ giftCards, onGiftCardsChange }: { giftCards: GiftCard[], onGiftCardsChange: (giftCards: GiftCard[]) => void }) => {
  // Ensure we always have at least 5 gift card forms
  const displayCards = giftCards.length >= 5 ? giftCards : [
    ...giftCards,
    ...Array(5 - giftCards.length).fill(null).map(() => ({ code: '', amount: '' }))
  ];

  const addGiftCard = () => {
    onGiftCardsChange([...displayCards, { code: '', amount: '' }]);
  };

  const updateGiftCard = (index: number, field: string, value: string) => {
    // Create a new array that matches displayCards length
    const updated = displayCards.map((card, i) => 
      i === index ? { ...card, [field]: value } : card
    );
    
    // Remove gift cards that have both empty number and amount
    const filtered = updated.filter(card => 
      !(card.code.trim() === '' && card.amount.trim() === '')
    );
    
    onGiftCardsChange(filtered);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        ギフト券情報
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 block text-sm font-medium text-gray-700 mb-1">ギフト券番号</div>
          <div className="block text-sm font-medium text-gray-700 mb-1">額面（円）</div>
        </div>
        {displayCards.map((card, index) => (
          <div key={index} className="bg-gray-50 rounded-xl">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                
                <input
                  type="text"
                  placeholder="例) XA1234567890"
                  value={card.code}
                  onChange={(e) => updateGiftCard(index, 'code', e.target.value)}
                  className="w-full px-2 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="例) 10000"
                  value={card.amount}
                  onChange={(e) => updateGiftCard(index, 'amount', e.target.value)}
                  onWheel={(e) => e.currentTarget.blur()}
                  className="w-full px-2 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addGiftCard}
          className="w-full lg:w-2/3  px-4 py-3 bg-accent text-black font-medium rounded-xl hover:opacity-80 cursor-pointer flex items-center justify-center"
        >
          <span className="text-xl mr-2">+</span>
          ギフト券を追加
        </button>
      </div>
    </div>
  );
};

export default GiftCardForm;