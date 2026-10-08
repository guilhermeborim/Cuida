import { PatientResponse } from "@/features/patients/types/patient.response";
import { colors } from "@/shared/design/colors";
import { careRelationshipLabels } from "@/shared/types/care-relationship";
import { initials } from "@/shared/utils/initials-name";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

export function PatientCard({
  patient,
  onPress,
}: {
  patient: PatientResponse;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-card border border-border p-md"
    >
      <View className="flex-row gap-md">
        <View className="h-avatar-lg w-avatar-lg items-center justify-center rounded-pill bg-green-light">
          <Text className="font-bold text-title text-text-primary">
            {initials(patient.name)}
          </Text>
          <View
            className={`absolute bottom-1 right-1 h-md w-md rounded-pill border-2 border-surface ${patient.active ? "bg-success-primary" : "bg-danger-primary"}`}
          />
        </View>
        <View className="min-w-0 flex-1 gap-xs">
          <Text className="font-semibold text-title text-text-primary">
            {patient.name}
          </Text>
          <Text className="font-regular text-caption text-text-secondary">
            {patient.age} {patient.age > 1 ? "anos" : "ano"} ·{" "}
            {careRelationshipLabels[patient.relationship] ?? "Não informado"}
          </Text>
          <View className="flex-row items-center gap-sm">
            <Ionicons
              name="medical-outline"
              size={18}
              color={colors.text.secondary}
            />
            <Text className="font-regular text-caption text-text-secondary">
              {/* {patient.medications} medicamentos */}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center px-sm">
          <Ionicons
            name="chevron-forward"
            size={24}
            color={colors.success.text}
          />
        </View>
      </View>
    </Pressable>
  );
}
