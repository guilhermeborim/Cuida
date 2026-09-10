import { useUserStore } from "@/shared/store/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { token } = useUserStore();

  if (!token) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
