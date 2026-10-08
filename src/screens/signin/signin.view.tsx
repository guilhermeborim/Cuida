import { useSignIn } from "@/features/auth/hooks/use-signin";
import SafeAreaContainer from "@/shared/components/SafeAreaContainer";
import { View } from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SignInForgotPassword from "./components/signin-forgot-password";
import SignInForm from "./components/signin-form";
import SignInHeader from "./components/signin-header";
import SignInSignUp from "./components/signin-signup";
import SignInSubmit from "./components/signin-submit";

export default function SigninView() {
  const { onSubmit, form, isLoading } = useSignIn();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaContainer>
      <View className="flex-1">
        <SignInHeader />

        <SignInForm
          control={form.control}
          children={<SignInForgotPassword />}
        />
      </View>
      <SignInSignUp />
      <KeyboardStickyView offset={{ opened: insets.bottom }}>
        <View className="pb-md">
          <SignInSubmit onSubmit={onSubmit} isLoading={isLoading} />
        </View>
      </KeyboardStickyView>
    </SafeAreaContainer>
  );
}
