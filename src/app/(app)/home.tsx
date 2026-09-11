import { useUserStore } from "@/shared/store/authStore";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const logout = useUserStore((state) => state.logout);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>OI HOME</Text>

      <TouchableOpacity
        onPress={() => {
          router.push("/(auth)/signin");
        }}
      >
        <Text>Go to SignIn</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
