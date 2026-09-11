import { InputController } from "@/shared/components/InputController";
import { View } from "react-native";

interface SignInFormProps {
  control: any;
  children: React.ReactElement;
}

export default function SignInForm({ control, children }: SignInFormProps) {
  return (
    <>
      <View className="gap-lg">
        <InputController
          control={control}
          name="email"
          placeholder="email@exemplo.com"
          label="E-mail"
        />

        <View className="gap-sm">
          <InputController
            control={control}
            name="password"
            placeholder="****"
            label="Senha"
            secureTextEntry
            keyboardType="number-pad"
          />

          {children}
        </View>
      </View>
    </>
  );
}
