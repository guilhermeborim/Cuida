import type { SignUpRequest } from "@/features/auth/schemas/signup.schema";
import {
  careRelationshipLabels,
  careRelationships,
} from "@/features/auth/types/care-relationship";
import { useState } from "react";
import { Controller, type Control } from "react-hook-form";
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

export default function SignUpRelationship({
  control,
  disabled,
}: {
  control: Control<SignUpRequest>;
  disabled: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Controller
      control={control}
      name="relationship"
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View className="gap-xs">
          <Text className="font-semibold text-label text-text-primary">
            Relação com você
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Relação com você: ${value ? careRelationshipLabels[value] : "Selecione uma opção"}`}
            accessibilityState={{ expanded, disabled }}
            disabled={disabled}
            onPress={() => {
              Keyboard.dismiss();
              setExpanded(true);
              onBlur();
            }}
            className="min-h-touch justify-center rounded-button border border-green-dark p-md"
          >
            <Text
              className={`font-regular text-caption ${value ? "text-text-primary" : "text-text-hint"}`}
            >
              {value ? careRelationshipLabels[value] : "Selecione uma opção"}
            </Text>
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
                    accessibilityRole="button"
                    accessibilityLabel="Fechar seleção de relação"
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
