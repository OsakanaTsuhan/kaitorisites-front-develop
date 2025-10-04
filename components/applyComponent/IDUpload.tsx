"use client"

import React, { useState } from 'react';
import { IDImages, UsageType } from '@/types/apply';
import { resizeImageIfNeeded, formatFileSize } from '@/util/imageResize';

const validExtensions = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

const IDUpload = ({ idImages, onIdImagesChange, usageType }: { idImages: IDImages, onIdImagesChange: (idImages: IDImages) => void, usageType: UsageType }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [fileSizes, setFileSizes] = useState<{
    front?: { original: number; resized: number };
    back?: { original: number; resized: number };
  }>({});
  
  if (usageType !== 'new') return null;

  const handleFileChange = async (side: string, file: File) => {
    if(!file) return;
    if (!validExtensions.includes(file.type)) {
      alert("無効な画像ファイルです");
      return;
    }

    setIsResizing(true);
    
    try {
      // Resize image if it's larger than 1MB
      const resizeResult = await resizeImageIfNeeded(file, {
        maxSizeInMB: 1,
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.8
      });

      if (resizeResult.success && resizeResult.file) {
        // Store file size information
        setFileSizes(prev => ({
          ...prev,
          [side]: {
            original: resizeResult.originalSize,
            resized: resizeResult.newSize
          }
        }));

        // Show resize notification if file was resized
        if (resizeResult.originalSize !== resizeResult.newSize) {
          const originalSize = formatFileSize(resizeResult.originalSize);
          const newSize = formatFileSize(resizeResult.newSize);
        }
        
        onIdImagesChange({ ...idImages, [side]: resizeResult.file });
      } else {
        alert(`画像の処理に失敗しました。再度お試しください。`);
      }
    } catch (error) {
      alert(`画像の処理中にエラーが発生しました。他の画像をお試しください。`);
    } finally {
      setIsResizing(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-accent">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        身分証明書の画像
        {isResizing && (
          <span className="ml-2 text-sm text-blue-600 flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            画像を処理中...
          </span>
        )}
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
              {idImages.front && fileSizes.front && (
                <div className="text-xs text-gray-500 mt-2">
                  <div>元のサイズ: {formatFileSize(fileSizes.front.original)}</div>
                  <div>リサイズ後: {formatFileSize(fileSizes.front.resized)}</div>
                  {fileSizes.front.original !== fileSizes.front.resized && (
                    <div className="text-green-600 font-medium">
                      リサイズ済み ✓
                    </div>
                  )}
                </div>
              )}
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
              {idImages.back && fileSizes.back && (
                <div className="text-xs text-gray-500 mt-2">
                  <div>元のサイズ: {formatFileSize(fileSizes.back.original)}</div>
                  <div>リサイズ後: {formatFileSize(fileSizes.back.resized)}</div>
                  {fileSizes.back.original !== fileSizes.back.resized && (
                    <div className="text-green-600 font-medium">
                      リサイズ済み ✓
                    </div>
                  )}
                </div>
              )}
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