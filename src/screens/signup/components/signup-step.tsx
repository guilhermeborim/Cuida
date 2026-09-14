import { Text } from "react-native";
import { SignUpProgressProps } from "./signup-progress";

export default function SignUpStep({ step, steps }: SignUpProgressProps) {
  return (
    <>
      <Text
        accessibilityRole="header"
        className="font-bold text-display text-green-dark"
      >
        {steps[step].title}
      </Text>
    </>
  );
}
