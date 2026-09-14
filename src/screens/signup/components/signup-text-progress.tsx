import { Text } from "react-native";
import { SignUpProgressProps } from "./signup-progress";

export default function SignUpTextProgress({
  step,
  steps,
}: SignUpProgressProps) {
  return (
    <Text
      accessibilityLiveRegion="polite"
      className="font-regular text-bodySmall text-text-primary"
    >
      Etapa {step + 1} de {steps.length}
    </Text>
  );
}
