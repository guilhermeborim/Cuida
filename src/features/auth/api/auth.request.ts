import { cuidaApiClient } from "@/shared/api/cuida.api";
import { SignInRequest } from "../schemas/signin.schema";
import { SignUpRequest } from "../schemas/signup.schema";
import { SignInResponse } from "../types/auth.response";

class AuthRequest {
  async login(data: SignInRequest) {
    const response = await cuidaApiClient.post<SignInResponse>(
      "/auth/login",
      data,
    );

    return response.data;
  }

  async register(data: SignUpRequest) {
    const response = await cuidaApiClient.post("/user/register", data);

    return response.data;
  }

  async checkEmail(email: string) {
    const response = await cuidaApiClient.get<boolean>(`/user/email/${email}`);

    return response.data;
  }

  async checkPhone(phone: string) {
    const response = await cuidaApiClient.get<boolean>(`/user/phone/${phone}`);

    return response.data;
  }
}

export const authRequest = new AuthRequest();
