

import { BuyingRate } from "@/types/setting";
import { GetStaticRatesData } from "@/lib/dummydata";
import { BASE_SITE } from "@/util/appConst";

const IS_CI_BUILD = process.env.CI === 'true' && 
                   process.env.NODE_ENV === 'production' &&
                   !process.env.VERCEL_ENV

// 60秒ごとにデータを再検証（キャッシュを更新）
export async function getBuyingRate(): Promise<BuyingRate[]> {

  const site = BASE_SITE;
  
   // CI環境でのビルド時はスタティックデータを使用
   if (IS_CI_BUILD) {
    console.log('CI環境ビルド時: スタティックデータを使用')
    return GetStaticRatesData(site)
  }

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


  try {
    const res = await fetch(BACKEND_URL + '/setting?site='+ site , {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      // 取得失敗時にエラーを投げる
      throw new Error('買取率の取得に失敗しました');
    }

    return res.json();
  } catch (error) {
    console.error('API呼び出し失敗、スタティックデータにフォールバック:', error)
    // 実行時エラーでも同じデータを使用
    return GetStaticRatesData(site)
  }
}