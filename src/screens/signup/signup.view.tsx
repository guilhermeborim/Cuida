import { useSignUp } from "@/features/auth/hooks/use-signup";
import SafeAreaContainer from "@/shared/components/SafeAreaContainer";
import { router } from "expo-router";
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import SignUpForm from "./components/signup-form";
import SignUpOnboarding from "./components/signup-onboarding";
import SignUpProgress from "./components/signup-progress";
import SignUpStep from "./components/signup-step";
import SignUpSubmit from "./components/signup-submit";
import SignUpTextProgress from "./components/signup-text-progress";

export default function SignupView() {
  const {
    advance,
    isLastStep,
    setShowPassword,
    showPassword,
    step,
    steps,
    setStep,
    form,
    isLoading,
    isCheckingEmail,
    handleEmailBlur,
    handlePhoneBlur,
    careRecipient,
    selectCareRecipient,
  } = useSignUp();

  return (
    <SafeAreaContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <View className="gap-sm pb-md">
            <View className="flex-row items-center justify-between gap-md">
              <Text className="flex-1 font-semibold text-label text-warning-text">
                Vamos cuidar juntos
              </Text>
              <Image
                source={require("@/../assets/cuida.png")}
                className="h-xl w-xl"
                resizeMode="contain"
                accessible={false}
              />
            </View>

            <SignUpProgress step={step} steps={steps} />

            <SignUpTextProgress step={step} steps={steps} />

            <SignUpStep step={step} steps={steps} />
          </View>

          <View className="flex-1">
            {step === 4 ? (
              <SignUpOnboarding
                value={careRecipient}
                onChange={selectCareRecipient}
                disabled={isLoading}
              />
            ) : (
              <SignUpForm
                advance={advance}
                step={step}
                careRecipient={careRecipient}
                isLoading={isLoading}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                form={form}
                handleEmailBlur={handleEmailBlur}
                handlePhoneBlur={handlePhoneBlur}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View>
        {step !== 5 && (
          <KeyboardStickyView offset={{ opened: 80 }}>
            <SignUpSubmit
              advance={advance}
              isLastStep={isLastStep}
              step={step}
              setStep={setStep}
              isLoading={isLoading}
              isCheckingEmail={isCheckingEmail}
              isDisabled={(step === 4 || isLastStep) && !careRecipient}
            />
          </KeyboardStickyView>
        )}
        {step === 5 && (
          <SignUpSubmit
            advance={advance}
            isLastStep={isLastStep}
            step={step}
            setStep={setStep}
            isLoading={isLoading}
            isCheckingEmail={isCheckingEmail}
            isDisabled={isLastStep && !careRecipient}
          />
        )}

        <View className="flex-row flex-wrap items-center justify-center gap-sm">
          <Text className="font-regular text-bodySmall text-text-primary">
            Já tem uma conta?
          </Text>
          <TouchableOpacity
            accessibilityRole="link"
            disabled={isLoading}
            onPress={() => router.replace("/(auth)/signin")}
            className="min-h-touch min-w-touch items-center justify-center rounded-button px-sm py-sm active:bg-green-light"
          >
            <Text className="font-semibold text-label text-green-dark underline">
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaContainer>
  );
}
