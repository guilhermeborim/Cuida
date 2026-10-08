import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CreatePatientMutation } from "../mutations/patient.mutation";
import { FindAllByUser } from "../queries/patient.queries";
import {
  patientSchema,
  type PatientFormValues,
  type PatientRequest,
} from "../schemas/patients.schema";
import { PatientResponse } from "../types/patient.response";

export type Filter = "Todos" | "Ativos" | "Inativos";

export function usePatient() {
  const findAllByUserQuery = FindAllByUser();
  const createPatientMutation = CreatePatientMutation();
  const form = useForm<PatientFormValues, unknown, PatientRequest>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      name: "",
      cpf: "",
      emergencyPhone: "",
      relationship: undefined,
      birthDate: "",
    },
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");

  const submitPatient = form.handleSubmit((data) => {
    createPatientMutation.mutate(data);
  });

  const patients: PatientResponse[] = useMemo(() => {
    const data = findAllByUserQuery.data ?? [];

    return data.filter(
      (patient: PatientResponse) =>
        (filter === "Todos" || patient.active === (filter === "Ativos")) &&
        patient.name
          .toLocaleLowerCase("pt-BR")
          .includes(search.trim().toLocaleLowerCase("pt-BR")),
    );
  }, [findAllByUserQuery.data, filter, search]);

  return {
    form,
    submitPatient,
    isCreating: createPatientMutation.isPending,
    patients,
    isLoading: findAllByUserQuery.isLoading,
    setFilter,
    setSearch,
    search,
    filter,
  };
}
