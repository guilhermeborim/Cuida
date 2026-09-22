import { useSignUp } from "@/features/auth/hooks/use-signup";
import { KeyboardContainer } from "@/shared/components/KeyboardContainer";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
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
    <KeyboardContainer isKeyboardAvoidingEnabled={step === 6 ? false : true}>
      <ScrollView
        key={step}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 16 }}
      >
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

        <View className="flex-1 justify-end pt-md">
          <SignUpSubmit
            advance={advance}
            isLastStep={isLastStep}
            step={step}
            setStep={setStep}
            isLoading={isLoading}
            isCheckingEmail={isCheckingEmail}
            isDisabled={(step === 4 || isLastStep) && !careRecipient}
          />

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
      </ScrollView>
    </KeyboardContainer>
  );
}
