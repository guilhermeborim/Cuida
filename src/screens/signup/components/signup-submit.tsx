import { Button } from "@/shared/components/Button";
import { colors } from "@/shared/design/colors";
import IonIcons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";

interface SignUpSubmitProps {
  advance: () => void;
  isLastStep: boolean;
  step: number;
  setStep: (step: number) => void;
  isLoading: boolean;
  isCheckingEmail: boolean;
  isDisabled: boolean;
}

export default function SignUpSubmit({
  advance,
  isLastStep,
  step,
  setStep,
  isLoading,
  isCheckingEmail,
  isDisabled,
}: SignUpSubmitProps) {
  return (
    <View className="flex-row">
      {step > 0 && (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Voltar para a etapa anterior"
          disabled={isLoading}
          onPress={() => {
            setStep(step - 1);
          }}
          className="min-h-touch min-w-touch items-center justify-center rounded-button pr-md active:bg-green-light"
        >
          <IonIcons name="chevron-back" size={16} color={colors.green.dark} />
        </TouchableOpacity>
      )}
      <Button
        className="flex-1"
        onPress={() => void advance()}
        isLoading={isLoading || isCheckingEmail}
        isDisabled={isDisabled}
      >
        {isLastStep ? "Cadastrar" : "Continuar"}
      </Button>
    </View>
  );
}
