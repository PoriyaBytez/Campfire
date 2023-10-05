/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getLocalAccessToken, getLocalRefreshToken, updateAccessToken } from "./token";
import { axiosInstance } from "./api";

const onRequest = async (
  config: InternalAxiosRequestConfig<any>
): Promise<InternalAxiosRequestConfig<any>> => {
  const token = await getLocalAccessToken();
  console.log("CONFIG", config.url, config.baseURL);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => Promise.reject(error);

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (error: AxiosError) => {
  let retry = false;
  console.log("RESPONSE", error.response);
  const originalConfig: AxiosRequestConfig = error.config!!;
  if (originalConfig.url !== "/auth/login" && error.response) {
    if (error.response.status === 401 && !retry) {
      retry = true;
      try {
        const res = await axiosInstance.post("/auth/getToken", {
          refreshToken: await getLocalRefreshToken(),
        });
        const { data } = res.data;
        await updateAccessToken(data.accessToken, data.refreshToken);
        return axiosInstance(originalConfig);
      } catch (ex) {
        return Promise.reject(ex);
      }
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorTo = (axiosObj: AxiosInstance): AxiosInstance => {
  axiosObj.interceptors.request.use(onRequest, onRequestError);
  axiosObj.interceptors.response.use(onResponse);
  return axiosObj;
};
