import { z } from "zod";

export function maskBirthDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join("/");
}

export const birthDateSchema = z.string().trim()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Informe a data no formato DD/MM/AAAA.")
  .transform((value) => value.split("/").reverse().join("-"))
  .pipe(z.iso.date("Informe uma data de nascimento válida."))
  .refine((value) => {
    const today = new Date();
    const localDate = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
    return value >= "0001-01-01" && value <= localDate;
  }, "A data de nascimento não pode estar no futuro ou ter ano zero.");
