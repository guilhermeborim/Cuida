import { colors } from "@/shared/design/colors";
import { useUserStore } from "@/shared/store/authStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";

export default function PrivateLayout() {
  const token = useUserStore((state) => state.token);

  if (!token) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tabBarStyle: { backgroundColor: colors.surface },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              size={14}
              name="home"
              color={focused ? colors.green.primary : colors.text.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="patients"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons size={14} name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
