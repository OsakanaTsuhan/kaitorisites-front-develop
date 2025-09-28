// レスポンス型定義
export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    submittedAt: string;
  };
}

export interface ContactApiResponse {
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}