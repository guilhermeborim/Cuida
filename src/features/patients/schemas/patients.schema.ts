import { careRelationships } from "@/shared/types/care-relationship";
import { z } from "zod";
import { birthDateSchema } from "@/shared/utils/birth-date";

export const patientSchema = z.object({
  relationship: z.enum(careRelationships, "Escolha a relação com você."),
  name: z.string().trim().min(1, "Informe o nome!"),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{11}$/, "Informe o CPF com 11 dígitos."),
  emergencyPhone: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, "Informe um telefone de emergência com DDD."),
  birthDate: birthDateSchema,
});

export type PatientRequest = z.infer<typeof patientSchema>;
export type PatientFormValues = z.input<typeof patientSchema>;
