import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";
import {redirectToRoute} from "../store/redirect/redirect";
import Routes from "../routes";

const BASE_URL = `https://6.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export enum HttpCode {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const createAPI = (onUnauthorized: () => void, onNotFound: () => void): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response: AxiosResponse) => response;

  const onFail = (error: AxiosError) => {
    const {response} = error;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
      throw error;
    }


    if (response.status === HttpCode.NOT_FOUND) {
      onNotFound();
      throw error;
    }

    throw error;
  };

  axiosInstance.interceptors.response.use(onSuccess, onFail);

  return axiosInstance;
};
