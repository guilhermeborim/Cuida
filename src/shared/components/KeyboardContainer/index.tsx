import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
interface KeyboardContainerProps {
  children: React.ReactNode;
}
export const KeyboardContainer = ({ children }: KeyboardContainerProps) => {
  return (
    <SafeAreaView className="flex-1 bg-cuida-background">
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View
          style={{
            width: "100%",
            alignSelf: "center",
          }}
        >
          {children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
