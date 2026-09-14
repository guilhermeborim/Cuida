import { SignUpRequest } from "../schemas/signup.schema";

export const steps: {
  title: string;
  fields: (keyof SignUpRequest)[];
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
];
