export interface BaseResponse<TData> {
  success: boolean;
  message: string;
  data: TData;
}