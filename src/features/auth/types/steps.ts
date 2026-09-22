import type { FieldPath } from "react-hook-form";
import { SignUpRequest } from "../schemas/signup.schema";

export const steps: {
  title: string;
  fields: FieldPath<SignUpRequest>[];
}[] = [
  {
    title: "Como você se chama?",
    fields: ["name"],
  },
  {
    title: "Qual é o seu e-mail?",
    fields: ["email"],
  },
  {
    title: "Qual é o seu telefone?",
    fields: ["phone"],
  },
  {
    title: "Crie sua senha",
    fields: ["password"],
  },
  {
    title: "Quem você quer cuidar primeiro?",
    fields: ["option"],
  },
  {
    title: "Complete os dados de quem receberá os cuidados",
    fields: [
      "person.name",
      "relationship",
      "person.cpf",
      "person.emergencyPhone",
    ],
  },
];
