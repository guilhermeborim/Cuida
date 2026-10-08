import { Text } from "react-native";
import { SignUpProgressProps } from "./signup-progress";

export default function SignUpStep({ step, steps }: SignUpProgressProps) {
  return (
    <>
      <Text
        accessibilityRole="header"
        className="font-semibold text-heading text-green-dark"
      >
        {steps[step].title}
      </Text>
    </>
  );
}
