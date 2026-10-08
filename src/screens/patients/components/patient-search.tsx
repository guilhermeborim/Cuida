import { colors } from "@/shared/design/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, View } from "react-native";

interface PatientSearchProps {
  search: string;
  setSearch: (param: string) => void;
}

export default function PatientSearch({
  search,
  setSearch,
}: PatientSearchProps) {
  return (
    <View className="min-h-input flex-row items-center gap-sm rounded-card bg-background px-md">
      <Ionicons name="search-outline" size={24} color={colors.text.secondary} />
      <TextInput
        placeholder="Buscar paciente..."
        placeholderTextColor={colors.text.secondary}
        value={search}
        onChangeText={setSearch}
        className="h-full flex-1 font-regular text-bodySmall text-text-primary"
      />
    </View>
  );
}
