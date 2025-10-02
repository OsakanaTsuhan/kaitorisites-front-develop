import { NextResponse } from 'next/server';
import type { Bank } from '@/types/bank';
// JSONを静的import（Edge対応・高速）
import banksData from '@/data/banks.json';

export const runtime = 'edge'; // 省略可（NodeでもOK）

// 正規化（全角/半角、大文字/小文字のゆらぎを抑える）
const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKC') // 全角→半角など
    .trim();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('b_type');   // 銀行タイプ（完全一致）
  const code = searchParams.get('b_code');   // 銀行コード（前方一致/部分一致など調整可）
  const name = searchParams.get('b_name');   // 銀行名（部分一致）
  const kana = searchParams.get('b_kana');   // 銀行名（カナ）

  let result = (banksData as Bank[]);

  if (type && type !== 'all') {
    const t = normalize(type);
    result = result.filter(b => normalize(b.b_type) === t);
  }
  if (code) {
    const c = normalize(code);
    // 前方一致: startsWith に変更も可
    result = result.filter(b => normalize(b.b_code).includes(c));
  }
  if (name) {
    const n = normalize(name);
    result = result.filter(b => normalize(b.b_name).includes(n));
  }
  if (kana) {
    const k = normalize(kana);
    result = result.filter(b => normalize(b.b_kana).includes(k));
  }
  // よく使うページング（任意）
  const page = Number(searchParams.get('page') ?? 1);
  const size = Math.min(Number(searchParams.get('size') ?? 50), 200);
  const start = (page - 1) * size;
  const slice = result.slice(start, start + size);

  return NextResponse.json({
    total: result.length,
    page,
    size,
    items: slice,
  });
}
