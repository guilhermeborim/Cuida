import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

interface KeyboardContainerProps {
  children: React.ReactNode;
  isKeyboardAvoidingEnabled?: boolean;
}

export const KeyboardContainer = ({
  children,
  isKeyboardAvoidingEnabled = true,
}: KeyboardContainerProps) => {
  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top", "bottom"]}>
      {isKeyboardAvoidingEnabled ? (
        <KeyboardAvoidingView behavior="padding" className="flex-1">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">{children}</View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">{children}</View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
};
