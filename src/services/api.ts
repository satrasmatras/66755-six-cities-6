import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

const BASE_URL = `https://6.react.pages.academy/six-cities`;
const TIMEOUT = 5000;

export enum HttpCode {
  UNAUTHORIZED = 401
}

export const createAPI = (onUnauthorized: () => void): AxiosInstance => {
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

    throw error;
  };

  axiosInstance.interceptors.response.use(onSuccess, onFail);

  return axiosInstance;
};
