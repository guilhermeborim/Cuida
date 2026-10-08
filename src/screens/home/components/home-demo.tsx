import type { PatientResponse } from "@/features/patients/types/patient.response";
import { Text, View } from "react-native";
import { demoPatients } from "../home.data";

export const demoPatient: PatientResponse = {
  id: "local-demo-patient",
  name: "Maria Silva (demo)",
  age: 81,
  active: true,
  relationship: "MOTHER",
};

export function HomeDemo() {
  const doses = demoPatients[0].doses;
  const next = doses.find((dose) => !dose.recordedAt);

  return (
    <View className="gap-md">
      <View className="gap-xs rounded-card bg-warning-light p-md">
        <Text className="font-semibold text-label text-warning-text">Paciente de demonstração</Text>
        <Text className="text-caption text-warning-text">Todos os dados abaixo são fictícios e servem apenas para visualizar a home.</Text>
      </View>

      {next && (
        <View className="gap-sm rounded-card bg-green-dark p-lg">
          <Text className="font-semibold text-caption text-white">PRÓXIMO REMÉDIO · DEMO</Text>
          <Text className="font-bold text-heading text-white">{next.name}</Text>
          <Text className="text-body text-white">{next.dosage}</Text>
          <Text className="font-bold text-display text-white">{next.time}</Text>
        </View>
      )}

      <View className="gap-md rounded-card border border-border p-md">
        <Text accessibilityRole="header" className="font-semibold text-title text-text-primary">Medicamentos de hoje</Text>
        <Text className="text-caption text-text-secondary">{doses.filter((dose) => dose.recordedAt).length} de {doses.length} doses registradas · exemplo</Text>
        {doses.map((dose) => (
          <View key={dose.id} className="flex-row items-start gap-md border-t border-border pt-md">
            <Text className="font-semibold text-label text-green-dark">{dose.time}</Text>
            <View className="flex-1 gap-xs">
              <Text className="font-semibold text-bodySmall text-text-primary">{dose.name}</Text>
              <Text className="text-caption text-text-secondary">{dose.dosage}</Text>
              <Text className={`self-start rounded-button px-sm py-xs text-caption ${dose.recordedAt ? "bg-success-light text-success-text" : "bg-warning-light text-warning-text"}`}>
                {dose.recordedAt ? `Registrado às ${dose.recordedAt}` : "Pendente"}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View className="gap-md rounded-card border border-border p-md">
        <Text accessibilityRole="header" className="font-semibold text-title text-text-primary">Próxima consulta</Text>
        <View className="flex-row items-center gap-md">
          <View className="items-center rounded-button bg-warning-light p-md">
            <Text className="font-semibold text-caption text-warning-text">OUT</Text>
            <Text className="font-bold text-heading text-warning-text">15</Text>
          </View>
          <View className="flex-1 gap-xs">
            <Text className="font-semibold text-body text-text-primary">Clínica geral</Text>
            <Text className="text-caption text-text-secondary">Dra. Fernanda Silva</Text>
            <Text className="text-caption text-text-secondary">Clínica Vida · 14:30 · 2026</Text>
            <Text className="font-medium text-caption text-success-text">Confirmada · fictícia</Text>
          </View>
        </View>
      </View>

      <View className="gap-sm rounded-card border border-border p-md">
        <Text accessibilityRole="header" className="font-semibold text-title text-text-primary">Uma rotina de cuidado</Text>
        <Text className="text-caption text-text-secondary">Registros dos últimos 7 dias · exemplo</Text>
        <Text className="font-bold text-display text-green-dark">86%</Text>
        <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 28, now: 24 }} className="h-sm overflow-hidden rounded-pill bg-green-light">
          <View className="h-full rounded-pill bg-green-dark" style={{ width: "85.7%" }} />
        </View>
        <Text className="text-bodySmall text-text-secondary">24 de 28 doses com tomada registrada.</Text>
      </View>

      <View className="gap-md rounded-card border border-border p-md">
        <Text accessibilityRole="header" className="font-semibold text-title text-text-primary">Saúde em dia</Text>
        {[{ label: "Pressão arterial", value: "120/80 mmHg", time: "08:15" }, { label: "Glicemia", value: "98 mg/dL", time: "07:40" }].map((record) => (
          <View key={record.label} className="gap-xs border-t border-border pt-md">
            <Text className="font-medium text-label text-text-primary">{record.label}</Text>
            <Text className="font-semibold text-title text-text-primary">{record.value}</Text>
            <Text className="text-caption text-text-secondary">Hoje, {record.time} · registro fictício</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
