import { useUserStore } from "@/shared/store/authStore";
import { Redirect, Stack } from "expo-router";

export default function LayoutAuth() {
  const { token } = useUserStore();

  if (token) return <Redirect href={"/(app)/home"} />;

  return <Stack screenOptions={{ headerShown: false }} />;
}
