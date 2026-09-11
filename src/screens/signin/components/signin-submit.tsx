import { Button } from "@/shared/components/Button";

interface SignInSubmitProps {
  onSubmit: () => void;
  isLoading?: boolean;
}

export default function SignInSubmit({
  onSubmit,
  isLoading = false,
}: SignInSubmitProps) {
  return (
    <Button onPress={onSubmit} isLoading={isLoading} isDisabled={isLoading}>
      Entrar
    </Button>
  );
}
