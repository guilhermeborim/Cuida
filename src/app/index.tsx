import { useUserStore } from "@/shared/store/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const token = useUserStore((state) => state.token);

  if (token) {
    return <Redirect href="/(app)" />;
  }

  return <Redirect href="/(auth)/signin" />;
}
