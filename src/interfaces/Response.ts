export interface Response<D> {
  success: boolean;
  message: string;
  data: D;
}