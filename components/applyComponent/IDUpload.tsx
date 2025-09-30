"use client"

import React from 'react';
import { IDImages, UsageType } from '@/types/apply';

const validExtensions = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const IDUpload = ({ idImages, onIdImagesChange, usageType }: { idImages: IDImages, onIdImagesChange: (idImages: IDImages) => void, usageType: UsageType }) => {
  if (usageType !== 'new') return null;

  const handleFileChange = (side: string, file: File) => {
    if(!file) return;
    if (!validExtensions.includes(file.type)) {
      alert("無効な画像ファイルです");
      return;
    }
    onIdImagesChange({ ...idImages, [side]: file });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        身分証明書の画像
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">表面</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('front', e.target.files?.[0] as File)}
              className="hidden"
              id="front-upload"
            />
            <label htmlFor="front-upload" className="cursor-pointer">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-sm text-gray-600">
                {idImages.front ? idImages.front.name : 'クリックして画像をアップロード'}
              </div>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">裏面</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-rose-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange('back', e.target.files?.[0] as File)}
              className="hidden"
              id="back-upload"
            />
            <label htmlFor="back-upload" className="cursor-pointer">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-sm text-gray-600">
                {idImages.back ? idImages.back.name : 'クリックして画像をアップロード'}
              </div>
            </label>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ※ 免許証で住所変更のある方は裏面もお送りください
        </p>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4">
        <p className="text-sm text-yellow-800">
          <span className="font-semibold">📌 アップロード可能な身分証明書：</span><br/>
          運転免許証、健康保険証、パスポート、マイナンバーカード、住民基本台帳カード
        </p>
      </div>
    </div>
  );
};

export default IDUpload;