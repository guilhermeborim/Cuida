import { Image, Text, View } from "react-native";

export default function SignInHeader() {
  return (
    <>
      <View className="gap-sm pb-lg pt-md">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-label text-warning-text">
            Bem-vindo de volta
          </Text>
          <Image
            source={require("@/../assets/cuida.png")}
            className="h-lg w-lg"
            resizeMode="contain"
          />
        </View>
        <Text
          accessibilityRole="header"
          className="font-bold text-display text-green-dark"
        >
          Entrar na conta
        </Text>
        <Text className="font-regular text-body text-text-primary">
          Mais tranquilidade para cuidar de quem você ama.
        </Text>
      </View>
    </>
  );
}
