import { colors } from "@/shared/design/colors";
import {
  careRelationshipLabels,
  careRelationships,
} from "@/shared/types/care-relationship";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatientRelationship<T extends FieldValues>({
  control,
  name,
  disabled,
}: {
  control: Control<T>;
  name: Path<T>;
  disabled: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View className="gap-xs">
          <Text className="font-semibold text-label text-text-primary">
            Relação com você
          </Text>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              Keyboard.dismiss();
              setExpanded(true);
              onBlur();
            }}
            className={`min-h-input flex-row items-center justify-between gap-sm rounded-input border bg-white p-md ${error ? "border-danger-primary" : "border-border"} ${disabled ? "opacity-50" : ""}`}
          >
            <Text className="flex-1 font-regular text-bodySmall text-text-primary">
              {value
                ? careRelationshipLabels[
                    value as keyof typeof careRelationshipLabels
                  ]
                : "Selecione"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={colors.green.dark}
              accessible={false}
            />
          </TouchableOpacity>
          <Modal
            visible={expanded}
            transparent
            animationType="fade"
            onRequestClose={() => setExpanded(false)}
          >
            <SafeAreaView className="flex-1 justify-center bg-text-primary/50 p-md">
              <Pressable
                className="absolute inset-0"
                onPress={() => setExpanded(false)}
                accessible={false}
              />
              <View
                accessibilityViewIsModal
                onAccessibilityEscape={() => setExpanded(false)}
                className="w-full max-w-lg self-center rounded-card bg-surface p-md"
                style={{ maxHeight: "85%" }}
              >
                <View className="flex-row items-center justify-between gap-md pb-sm">
                  <Text
                    accessibilityRole="header"
                    className="flex-1 font-semibold text-body text-text-primary"
                  >
                    Relação com você
                  </Text>
                  <TouchableOpacity
                    onPress={() => setExpanded(false)}
                    className="min-h-touch min-w-touch items-center justify-center rounded-button px-sm active:bg-green-light"
                  >
                    <Text className="font-semibold text-label text-green-dark">
                      Fechar
                    </Text>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  style={{ flexShrink: 1 }}
                >
                  {careRelationships.map((relationship) => (
                    <TouchableOpacity
                      key={relationship}
                      disabled={disabled}
                      onPress={() => {
                        onChange(relationship);
                        onBlur();
                        setExpanded(false);
                      }}
                      className={`min-h-touch justify-center rounded-button p-md ${value === relationship ? "bg-green-light" : "bg-surface"}`}
                    >
                      <Text className="text-caption text-text-primary">
                        {careRelationshipLabels[relationship]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </SafeAreaView>
          </Modal>
          {error && (
            <Text
              accessibilityRole="alert"
              className="text-bodySmall text-warning-text"
            >
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
