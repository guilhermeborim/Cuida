import { useSignIn } from "@/features/auth/hooks/use-signin";
import { KeyboardContainer } from "@/shared/components/KeyboardContainer";
import { View } from "react-native";
import SignInForgotPassword from "./components/signin-forgot-password";
import SignInForm from "./components/signin-form";
import SignInHeader from "./components/signin-header";
import SignInSignUp from "./components/signin-signup";
import SignInSubmit from "./components/signin-submit";

export default function SigninView() {
  const { onSubmit, form, isError, isLoading } = useSignIn();

  return (
    <KeyboardContainer isKeyboardAvoidingEnabled={false}>
      <View className="flex-1 px-md">
        <SignInHeader />

        <SignInForm
          control={form.control}
          children={<SignInForgotPassword />}
        />

        <View className="flex-1 justify-end gap-sm mb-md">
          <SignInSubmit onSubmit={onSubmit} isLoading={isLoading} />

          <SignInSignUp />
        </View>
      </View>
    </KeyboardContainer>
  );
}
