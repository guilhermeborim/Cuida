import { Filter } from "@/features/patients/hooks/use-patient";
import { PatientResponse } from "@/features/patients/types/patient.response";
import { Pressable, Text, View } from "react-native";

interface PatientFilterProps {
  filter: Filter;
  setFilter: (param: Filter) => void;
  patients: PatientResponse[];
}

export default function PatientFilter({
  filter,
  patients,
  setFilter,
}: PatientFilterProps) {
  return (
    <View className="flex-row flex-wrap items-center justify-between gap-sm">
      <View className="flex-row rounded-button bg-background p-xs">
        {(["Todos", "Ativos", "Inativos"] as const).map((option) => (
          <Pressable
            key={option}
            onPress={() => setFilter(option)}
            className={`min-h-touch justify-center rounded-button px-sm ${filter === option ? "bg-green-light" : ""}`}
          >
            <Text
              className={`font-semibold text-caption ${filter === option ? "text-success-text" : "text-text-secondary"}`}
            >
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text className="font-regular text-caption text-text-secondary">
        {patients.length} {patients.length === 1 ? "paciente" : "pacientes"}
      </Text>
    </View>
  );
}
