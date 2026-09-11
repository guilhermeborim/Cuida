import { cuidaApiClient } from "@/shared/api/cuida.api";
import { SignInRequest } from "../schemas/signin.schema";

class AuthRequest {
  async login(data: SignInRequest) {
    const response = await cuidaApiClient.post("/auth/login", data);

    return response.data;
  }
}

export const authRequest = new AuthRequest();
