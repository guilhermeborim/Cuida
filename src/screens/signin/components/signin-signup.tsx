import { Text, TouchableOpacity, View } from "react-native";

export default function SignInSignUp() {
  return (
    <>
      <View className="flex-row flex-wrap items-center justify-center gap-sm">
        <Text className="font-regular text-bodySmall text-text-primary">
          Ainda não tem uma conta?
        </Text>
        <TouchableOpacity className="min-h-touch min-w-touch items-center justify-center rounded-button px-sm py-sm active:bg-green-light">
          <Text className="font-semibold text-label text-green-dark underline">
            Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
