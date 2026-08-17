import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { Platform } from "react-native";
import { useUserStore } from "../store/authStore";

const getBaseURL = () => {
  return Platform.select({
    ios: process.env.EXPO_PUBLIC_IOS_API_URL,
    android: process.env.EXPO_PUBLIC_ANDROID_API_URL,
  });
};

export const baseURL = getBaseURL();

export class CuidaApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL,
    });

    this.setupInterceptors();
  }
  getInstance() {
    return this.instance;
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem("cuida-auth");

        if (userData) {
          const {
            state: { token },
          } = JSON.parse(userData);

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          try {
            const userData = await AsyncStorage.getItem("cuida-auth");
            if (!userData) {
              throw new Error("Usuário não autenticado");
            }
          } catch {
            this.handleUnauthorized();
            return Promise.reject("Sessão expirada, faça o login novamente.");
          }
        }

        if (error.response && error.response.data) {
          return Promise.reject(new Error(error.response.data.message));
        } else {
          return Promise.reject(new Error("Falha na requisição"));
        }
      },
    );
  }

  private async handleUnauthorized() {
    const { logout } = useUserStore.getState();

    delete this.instance.defaults.headers.common.Authorization;
    logout();
  }
}

export const cuidaApiClient = new CuidaApiClient().getInstance();
