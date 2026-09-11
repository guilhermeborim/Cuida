import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { Platform } from "react-native";

import { useUserStore } from "../store/authStore";

type ApiErrorResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

const getBaseURL = () => {
  const url = Platform.select({
    ios: process.env.EXPO_PUBLIC_IOS_API_URL,
    android: process.env.EXPO_PUBLIC_ANDROID_API_URL,
  });

  if (!url) {
    throw new Error("URL da API não configurada.");
  }

  return url;
};

export const baseURL = getBaseURL();

class CuidaApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  getInstance() {
    return this.instance;
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const userData = await AsyncStorage.getItem("cuida-auth");

        if (!userData) {
          return config;
        }

        try {
          const parsedUserData = JSON.parse(userData);

          const token = parsedUserData?.state?.token;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch {
          await AsyncStorage.removeItem("cuida-auth");
        }

        return config;
      },

      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => response,

      async (error: AxiosError<ApiErrorResponse>) => {
        const status = error.response?.status;
        const url = error.config?.url;

        const isLoginRequest = url?.includes("/auth/login");

        if (status === 401 && !isLoginRequest) {
          await this.handleUnauthorized();

          return Promise.reject(
            new Error("Sessão expirada. Faça o login novamente."),
          );
        }

        if (error.response) {
          const message = this.getApiErrorMessage(error.response.data);

          return Promise.reject(new Error(message));
        }

        if (error.request) {
          return Promise.reject(
            new Error("Não foi possível conectar ao servidor."),
          );
        }

        return Promise.reject(
          new Error("Não foi possível realizar a requisição."),
        );
      },
    );
  }

  private getApiErrorMessage(data?: ApiErrorResponse) {
    if (!data?.message) {
      return "Ocorreu um erro inesperado.";
    }

    if (Array.isArray(data.message)) {
      return data.message.join("\n");
    }

    return data.message;
  }

  private async handleUnauthorized() {
    const { logout } = useUserStore.getState();

    delete this.instance.defaults.headers.common.Authorization;

    logout();
  }
}

export const cuidaApiClient = new CuidaApiClient().getInstance();
