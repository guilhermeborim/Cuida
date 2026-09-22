import type { CareRecipient } from "@/features/auth/hooks/use-signup";

export interface HomeDose {
  id: string;
  name: string;
  dosage: string;
  time: string;
  recordedAt?: string;
}

export interface HomePatient {
  id: string;
  name: string;
  age?: number;
  recipient: CareRecipient;
  doses: HomeDose[];
}

// Fixtures isolated from authentication and real patient records.
export const demoPatients: HomePatient[] = [
  {
    id: "demo-maria",
    name: "Maria Silva",
    age: 81,
    recipient: "other",
    doses: [
      {
        id: "losartana-morning",
        name: "Losartana",
        dosage: "50 mg · 1 comprimido",
        time: "08:00",
        recordedAt: "08:02",
      },
      {
        id: "metformina-morning",
        name: "Metformina",
        dosage: "850 mg · 1 comprimido",
        time: "08:00",
        recordedAt: "08:09",
      },
      {
        id: "aas-afternoon",
        name: "AAS Infantil",
        dosage: "100 mg · 1 comprimido",
        time: "15:00",
      },
      {
        id: "metformina-evening",
        name: "Metformina",
        dosage: "850 mg · 1 comprimido",
        time: "20:00",
      },
    ],
  },
  { id: "demo-ana", name: "Guilherme Machado", recipient: "self", doses: [] },
];

export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .filter((_, index, parts) => index === 0 || index === parts.length - 1)
    .join("");
}
