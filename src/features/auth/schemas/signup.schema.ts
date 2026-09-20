import { z } from "zod";
import { careRelationships } from "../types/care-relationship";

export const signUpSchema = z
  .object({
    name: z.string().trim().min(1, "Informe seu nome."),
    email: z.string().trim().pipe(z.email("Informe um e-mail válido.")),
    phone: z.string().trim().min(1, "Informe seu telefone com DDD."),
    password: z.string().min(1, "Crie uma senha."),
    option: z.enum(["self", "other"], "Escolha quem você quer cuidar."),
    relationship: z.enum(careRelationships).optional(),
    person: z.object({
      name: z.string().trim().optional(),
      cpf: z
        .string()
        .trim()
        .regex(/^\d{11}$/, "Informe um CPF com 11 dígitos."),
      emergencyPhone: z
        .string()
        .trim()
        .regex(/^\d{10,11}$/, "Informe um telefone de emergência com DDD."),
    }),
  })
  .superRefine((data, context) => {
    if (data.option === "other" && !data.relationship) {
      context.addIssue({
        code: "custom",
        path: ["person", "relationship"],
        message: "Escolha a relação com você.",
      });
    }
    if (data.option === "other" && !data.person.name) {
      context.addIssue({
        code: "custom",
        path: ["person", "name"],
        message: "Informe o nome da pessoa que receberá os cuidados.",
      });
    }
  })
  .transform((data) => ({
    ...data,
    person:
      data.option === "self"
        ? { cpf: data.person.cpf, emergencyPhone: data.person.emergencyPhone }
        : data.person,
  }));

export type SignUpRequest = z.infer<typeof signUpSchema>;
