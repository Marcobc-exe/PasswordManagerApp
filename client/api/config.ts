import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { clearTokens, getAccessToken } from "../helpers/helpers";
import { refreshAccessToken } from "./token.api";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

type RetryableAxiosRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  skipAuthRefresh?: boolean;
};

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

function PromiseError(error: AxiosError) {
  return Promise.reject(error);
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    const originalRequest = error.config as
      | RetryableAxiosRequestConfig
      | undefined;

    if (!originalRequest) return PromiseError(error);
    if (originalRequest.skipAuthRefresh) return PromiseError(error);
    if (error.response?.status !== 401) return PromiseError(error);
    if (originalRequest._retry) return PromiseError(error);

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest as AxiosRequestConfig);
    } catch (refreshError) {
      clearTokens();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    }
  },
);
