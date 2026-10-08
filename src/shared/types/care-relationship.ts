export const careRelationships = [
  "MOTHER",
  "FATHER",
  "GRANDMOTHER",
  "GRANDFATHER",
  "AUNT",
  "UNCLE",
  "PATIENT",
  "BROTHER",
  "SISTER",
  "SON",
  "DAUGHTER",
  "SPOUSE",
  "OTHER",
] as const;

export type CareRelationship = (typeof careRelationships)[number];

export const careRelationshipLabels: Record<CareRelationship, string> = {
  MOTHER: "Mãe",
  FATHER: "Pai",
  GRANDMOTHER: "Avó",
  GRANDFATHER: "Avô",
  AUNT: "Tia",
  UNCLE: "Tio",
  PATIENT: "Paciente",
  BROTHER: "Irmão",
  SISTER: "Irmã",
  SON: "Filho",
  DAUGHTER: "Filha",
  SPOUSE: "Cônjuge",
  OTHER: "Outro",
};
