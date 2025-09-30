import { Setting } from "@/types/setting";

// データを取得するAPIの型定義（例）

// 60秒ごとにデータを再検証（キャッシュを更新）
export async function   getSetting(): Promise<Setting> {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const res = await fetch(BACKEND_URL + '/setting?site=site16', {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    // 取得失敗時にエラーを投げる
    throw new Error('買取率の取得に失敗しました');
  }

  return res.json();
}