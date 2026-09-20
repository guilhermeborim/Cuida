import { InputController } from "@/shared/components/InputController";
import type { CareRecipient } from "@/features/auth/hooks/use-signup";
import type { SignUpRequest } from "@/features/auth/schemas/signup.schema";
import type { UseFormReturn } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import SignUpRelationship from "./signup-relationship";

interface SignUpFormProps {
  step: number;
  careRecipient: CareRecipient | null;
  isLoading: boolean;
  showPassword: boolean;
  setShowPassword: (value: React.SetStateAction<boolean>) => void;
  advance: () => void;
  form: UseFormReturn<SignUpRequest>;
  handleEmailBlur: () => Promise<void>;
  handlePhoneBlur: () => Promise<void>;
}

export default function SignUpForm({
  step,
  careRecipient,
  isLoading,
  showPassword,
  setShowPassword,
  advance,
  form,
  handleEmailBlur,
  handlePhoneBlur,
}: SignUpFormProps) {
  return (
    <View key={step}>
      {step === 0 && (
        <InputController
          control={form.control}
          name="name"
          label="Seu nome"
          placeholder="Digite seu nome completo"
          onSubmitEditing={() => void advance()}
        />
      )}
      {step === 1 && (
        <>
          <InputController
            control={form.control}
            name="email"
            label="E-mail"
            placeholder="email@exemplo.com"
            onBlur={() => void handleEmailBlur()}
            onSubmitEditing={() => void advance()}
            keyboardType="email-address"
          />
        </>
      )}
      {step === 2 && (
        <InputController
          control={form.control}
          name="phone"
          label="Telefone com DDD"
          placeholder="(11) 99999-9999"
          keyboardType="phone-pad"
          maxLength={11}
          onBlur={() => void handlePhoneBlur()}
          onSubmitEditing={() => void advance()}
        />
      )}
      {step === 3 && (
        <>
          <InputController
            control={form.control}
            name="password"
            label="Senha"
            placeholder="Crie sua senha"
            secureTextEntry={!showPassword}
            keyboardType="number-pad"
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ expanded: showPassword }}
            onPress={() => setShowPassword((value) => !value)}
            className="min-h-touch min-w-touch self-start justify-center rounded-button active:bg-green-light"
          >
            <Text className="font-semibold text-label text-green-dark">
              {showPassword ? "Ocultar senha" : "Mostrar senha"}
            </Text>
          </TouchableOpacity>
        </>
      )}
      {step === 5 && (
        <View className="gap-md">
          {careRecipient === "other" && (
            <SignUpRelationship control={form.control} disabled={isLoading} />
          )}
          {careRecipient === "other" && (
            <InputController
              control={form.control}
              name="person.name"
              label="Nome de quem receberá os cuidados"
              placeholder="Digite o nome completo"
              autoCapitalize="words"
              isDisabled={isLoading}
            />
          )}
          <InputController
            control={form.control}
            name="person.cpf"
            label={careRecipient === "self" ? "Seu CPF" : "CPF de quem receberá os cuidados"}
            placeholder="Digite os 11 dígitos do CPF"
            keyboardType="number-pad"
            maxLength={11}
            isDisabled={isLoading}
          />
          <InputController
            control={form.control}
            name="person.emergencyPhone"
            label="Telefone de emergência com DDD"
            placeholder="11999999999"
            keyboardType="phone-pad"
            maxLength={11}
            isDisabled={isLoading}
            onSubmitEditing={() => void advance()}
          />
        </View>
      )}
    </View>
  );
}
