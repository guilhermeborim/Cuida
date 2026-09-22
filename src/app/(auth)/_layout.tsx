import { useUserStore } from "@/shared/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function PublicLayout() {
  const token = useUserStore((state) => state.token);

  if (token) {
    return <Redirect href="/(app)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
