import { KeyboardContainer } from "@/shared/components/KeyboardContainer";
import { useLoginMutation } from "@/shared/mutations/auth/auth.mutation";
import { Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const { mutation } = useLoginMutation();

  return (
    <KeyboardContainer>
      <View className="flex-1 bg-surface px-6 pt-16">
        <Text>PÁGINA DE FAZER LOGIN</Text>
        <TouchableOpacity
          onPress={() => {
            mutation.mutateAsync({
              email: "borimdev@gmail.com",
              password: "bananoides",
            });
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardContainer>
  );
}
