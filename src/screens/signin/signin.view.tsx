import { useSignIn } from "@/features/auth/hooks/use-signin";
import Container from "@/shared/components/Container";
import { View } from "react-native";
import SignInForgotPassword from "./components/signin-forgot-password";
import SignInForm from "./components/signin-form";
import SignInHeader from "./components/signin-header";
import SignInSignUp from "./components/signin-signup";
import SignInSubmit from "./components/signin-submit";

export default function SigninView() {
  const { onSubmit, form, isError, isLoading } = useSignIn();

  return (
    <Container isKeyboardAvoidingEnabled={false}>
      <SignInHeader />

      <SignInForm control={form.control} children={<SignInForgotPassword />} />

      <View className="flex-1 justify-end gap-sm mb-md">
        <SignInSubmit onSubmit={onSubmit} isLoading={isLoading} />

        <SignInSignUp />
      </View>
    </Container>
  );
}
