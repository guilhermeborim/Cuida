import { InputController } from "@/shared/components/InputController";
import { Text, TouchableOpacity, View } from "react-native";

interface SignUpFormProps {
  step: number;
  isLastStep: boolean;
  showPassword: boolean;
  setShowPassword: (value: React.SetStateAction<boolean>) => void;
  advance: () => void;
  form: any;
  handleEmailBlur: () => Promise<void>;
  handlePhoneBlur: () => Promise<void>;
}

export default function SignUpForm({
  step,
  isLastStep,
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
      {isLastStep && (
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
    </View>
  );
}
