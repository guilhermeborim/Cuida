import { initials } from "@/shared/utils/initials-name";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

interface HomeHeaderProps {
  name: string;
  onProfilePress?: () => void;
  onNotificationsPress?: () => void;
}

export default function HomeHeader({ name, onProfilePress, onNotificationsPress }: HomeHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-end gap-sm">
      <Pressable
        onPress={onNotificationsPress}
        accessibilityRole="button"
        accessibilityLabel="Notificações"
        className="min-h-touch min-w-touch items-center justify-center rounded-button"
      >
        <Ionicons name={"notifications-outline"} size={24} />
      </Pressable>
      <Pressable
        onPress={onProfilePress}
        accessibilityRole="button"
        accessibilityLabel="Meu perfil"
        className="h-avatar w-avatar items-center justify-center rounded-pill bg-green-light"
      >
        <Text className="font-semibold text-caption text-text-primary">
          {initials(name)}
        </Text>
      </Pressable>
    </View>
  );
}
