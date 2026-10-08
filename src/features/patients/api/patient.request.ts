import { cuidaApiClient } from "@/shared/api/cuida.api";
import { PatientRequest } from "../schemas/patients.schema";
import type { PatientResponse } from "../types/patient.response";

class PatientsRequest {
  async create(data: PatientRequest) {
    const response = await cuidaApiClient.post("/person", data);

    return response.data;
  }

  async findAllByUser() {
    const response = await cuidaApiClient.get<PatientResponse[]>("/person");

    return response.data;
  }
}

export const patientRequest = new PatientsRequest();
