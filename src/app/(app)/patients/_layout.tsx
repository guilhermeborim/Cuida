import { colors } from "@/shared/design/colors";
import { useUserStore } from "@/shared/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function PatientsLayout() {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          headerTitle: "Cadastrar Paciente",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.surface },
        }}
      />
    </Stack>
  );
}
