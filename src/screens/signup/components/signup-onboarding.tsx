import type { CareRecipient } from "@/features/auth/hooks/use-signup";
import { colors } from "@/shared/design/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, TouchableOpacity, View } from "react-native";

interface SignUpOnboardingProps {
  value: CareRecipient | null;
  onChange: (value: CareRecipient) => void;
  disabled: boolean;
}

const options: {
  value: CareRecipient;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { value: "self", label: "De Mim", icon: "person" },
  { value: "other", label: "De outra pessoa", icon: "heart" },
];

export default function SignUpOnboarding({
  value,
  onChange,
  disabled,
}: SignUpOnboardingProps) {
  return (
    <View className="gap-md py-md">
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected, disabled }}
            disabled={disabled}
            onPress={() => onChange(option.value)}
            className={`min-h-button flex-row items-center gap-md rounded-card border p-md active:bg-green-light ${
              selected
                ? "border-green-dark bg-green-light"
                : "border-green-dark bg-surface"
            }`}
          >
            <Ionicons
              name={option.icon}
              size={24}
              color={colors.green.primary}
              accessible={false}
              importantForAccessibility="no"
            />
            <Text className="flex-1 font-semibold text-body text-green-dark">
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
