import { CareRelationship } from "@/shared/types/care-relationship";

export interface PatientResponse {
  id: string;
  name: string;
  age: number;
  active: boolean;
  relationship: CareRelationship;
}
