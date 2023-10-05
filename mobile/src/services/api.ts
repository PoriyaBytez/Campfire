import axios, { AxiosInstance } from "axios";

import { setupInterceptorTo } from "./setupInterceptor";
import { ResponseMapper } from "./types";

const instance: AxiosInstance = axios.create({
  baseURL: "http://52.205.222.199:3000", //config.apiURL,
  timeout: 1000 * 30,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance: AxiosInstance = setupInterceptorTo(instance);

export const isAxiosError = (err: any): ResponseMapper<any> => {
  if (axios.isAxiosError(err)) {
    if (err.response && err.response.data) {
      if (err.response.status === 404)
        return { statusCode: 404, message: err.message } as ResponseMapper<any>;
      return err.response.data as ResponseMapper<any>;
    }
    return { statusCode: err.code, message: err.message } as  ResponseMapper<any>;
  }
  return { statusCode: err.code, message: err.message } as  ResponseMapper<any>;
};
