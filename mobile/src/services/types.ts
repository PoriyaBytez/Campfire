export type TokenData = {
  accessToken: string;
  refreshToken: string;
};

export type ResponseMapper<T> = {
  code?: number;
  message?: string;
  data?: T;
};