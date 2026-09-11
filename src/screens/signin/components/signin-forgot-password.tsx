import { Pressable, Text } from "react-native";

export default function SignInForgotPassword() {
  return (
    <>
      <Pressable
        accessibilityRole="button"
        className="min-h-touch min-w-touch self-end justify-center rounded-button px-sm py-sm active:bg-green-light"
      >
        <Text className="font-semibold text-label text-green-dark underline">
          Esqueci minha senha
        </Text>
      </Pressable>
    </>
  );
}
