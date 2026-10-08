import { colors } from "@/shared/design/colors";
import { maskBirthDate } from "@/shared/utils/birth-date";
import Ionicons from "@expo/vector-icons/Ionicons";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Text, View } from "react-native";
import { InputController } from "../InputController";
import PatientRelationship from "./patient-relationship";

interface PatientFormProps<T extends FieldValues> {
  control: Control<T>;
  fields: Record<
    "name" | "cpf" | "emergencyPhone" | "relationship",
    Path<T>
  > & {
    birthDate?: Path<T>;
  };
  isSelf?: boolean;
  isLoading?: boolean;
  onSubmitEditing?: () => void;
}

export function PatientForm<T extends FieldValues>({
  control,
  fields,
  isSelf = false,
  isLoading = false,
  onSubmitEditing,
}: PatientFormProps<T>) {
  return (
    <View className="gap-lg pb-md">
      {!isSelf && (
        <View className="gap-md rounded-card bg-green-light p-md">
          <View className="flex-row items-center gap-sm">
            <Ionicons
              name="heart-outline"
              size={24}
              color={colors.green.dark}
              accessible={false}
            />
            <Text
              accessibilityRole="header"
              className="flex-1 font-semibold text-bodySmall text-green-dark"
            >
              Quem você vai cuidar?
            </Text>
          </View>
          <PatientRelationship
            control={control}
            name={fields.relationship}
            disabled={isLoading}
          />
        </View>
      )}

      {(!isSelf || fields.birthDate) && (
        <View className="gap-md">
          <View className="gap-xs">
            <Text
              accessibilityRole="header"
              className="font-semibold text-body text-text-primary"
            >
              {isSelf ? "Sobre você" : "Sobre o paciente"}
            </Text>
            <Text className="font-regular text-caption text-text-secondary">
              Informações para identificar quem receberá os cuidados.
            </Text>
          </View>
          {!isSelf && (
            <InputController
              control={control}
              name={fields.name}
              label="Nome completo"
              placeholder="Como a pessoa se chama?"
              autoCapitalize="words"
              isDisabled={isLoading}
            />
          )}
          {fields.birthDate && (
            <InputController
              control={control}
              name={fields.birthDate}
              label="Data de nascimento"
              placeholder="DD/MM/AAAA"
              keyboardType="number-pad"
              maxLength={10}
              mask={maskBirthDate}
              isDisabled={isLoading}
            />
          )}
        </View>
      )}

      <View className="gap-md border-t border-border pt-lg">
        <View className="gap-xs">
          <Text
            accessibilityRole="header"
            className="font-semibold text-body text-text-primary"
          >
            Documento e contato
          </Text>
          <Text className="font-regular text-caption text-text-secondary">
            Informe um CPF e telefone com DDD para contato em uma emergência.
          </Text>
        </View>
        <View className="flex-row items-start gap-sm">
          <InputController
            containerClassName="flex-1 min-w-0"
            control={control}
            name={fields.cpf}
            label="CPF"
            placeholder="11 dígitos"
            keyboardType="number-pad"
            maxLength={11}
            isDisabled={isLoading}
          />
          <InputController
            containerClassName="flex-1 min-w-0"
            control={control}
            name={fields.emergencyPhone}
            label="Telefone"
            accessibilityLabel="Telefone de emergência com DDD"
            placeholder="(11)99999-9999"
            keyboardType="phone-pad"
            maxLength={11}
            isDisabled={isLoading}
            onSubmitEditing={onSubmitEditing}
          />
        </View>
      </View>
    </View>
  );
}
