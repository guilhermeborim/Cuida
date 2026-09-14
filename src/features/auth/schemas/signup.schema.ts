import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome."),
  email: z.string().trim().pipe(z.email("Informe um e-mail válido.")),
  phone: z.string().trim().min(1, "Informe seu telefone com DDD."),
  password: z.string().min(1, "Crie uma senha."),
});

export type SignUpRequest = z.infer<typeof signUpSchema>;
