import { useUserStore } from "@/shared/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function PrivateLayout() {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Redirect href="/(auth)/signin" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
