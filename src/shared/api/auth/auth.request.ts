import { cuidaApiClient } from "@/shared/api/cuida.api";

export class AuthRequest {
  async login(email: string, password: string) {
    const { data } = await cuidaApiClient.post("/auth/login", {
      email,
      password,
    });

    return data;
  }
}

export const authRequest = new AuthRequest();
