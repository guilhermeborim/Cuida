import { usePatient } from "@/features/patients/hooks/use-patient";
import SafeAreaContainer from "@/shared/components/SafeAreaContainer";
import { colors } from "@/shared/design/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { PatientCard } from "./components/patient-card";
import PatientFilter from "./components/patient-filter";
import PatientSearch from "./components/patient-search";

export default function PatientsView() {
  const { filter, patients, search, setFilter, setSearch, isLoading } =
    usePatient();

  return (
    <SafeAreaContainer>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="gap-md"
      >
        <View className="flex-row items-start justify-between gap-sm">
          <View className="flex-1">
            <Text className="font-bold text-heading text-text-primary">
              Meus pacientes
            </Text>
            <Text className="font-regular text-caption text-text-secondary">
              Pessoas que você cuida
            </Text>
          </View>
          <Pressable
            onPress={() => router.push("/(app)/patients/create")}
            className="min-h-touch flex-row items-center gap-xs rounded-button bg-green-dark px-md"
          >
            <Ionicons name="add" size={24} color="white" />
          </Pressable>
        </View>
        <PatientSearch search={search} setSearch={setSearch} />

        <PatientFilter
          filter={filter}
          patients={patients}
          setFilter={setFilter}
        />
        {isLoading ? (
          <ActivityIndicator color={colors.green.dark} size={20} />
        ) : (
          patients.map((patient: any) => (
            <PatientCard key={patient.id} patient={patient} />
          ))
        )}
        {patients.length === 0 && (
          <Text className="py-xl text-center font-regular text-bodySmall text-text-secondary">
            Nenhum paciente encontrado.
          </Text>
        )}
      </ScrollView>
    </SafeAreaContainer>
  );
}
