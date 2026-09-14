import { View } from "react-native";
import { KeyboardContainer } from "../KeyboardContainer";

interface ContainerProps {
  children: React.ReactNode;
  isKeyboardAvoidingEnabled?: boolean;
}
export default function Container({
  children,
  isKeyboardAvoidingEnabled,
}: ContainerProps) {
  return (
    <KeyboardContainer isKeyboardAvoidingEnabled={isKeyboardAvoidingEnabled}>
      <View className="flex-1 px-md pt-md">{children}</View>
    </KeyboardContainer>
  );
}
