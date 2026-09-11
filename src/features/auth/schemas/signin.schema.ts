import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("E-mail deve ser válido!"),
  password: z.string().min(4, "Mínimo de 4 números!"),
});

export type SignInRequest = z.infer<typeof signInSchema>;
