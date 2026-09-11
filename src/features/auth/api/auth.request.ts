import { cuidaApiClient } from "@/shared/api/cuida.api";
import { SignInRequest } from "../schemas/signin.schema";
import { SignInResponse } from "../types/auth.response";

class AuthRequest {
  async login(data: SignInRequest) {
    const response = await cuidaApiClient.post<SignInResponse>(
      "/auth/login",
      data,
    );

    return response.data;
  }
}

export const authRequest = new AuthRequest();
