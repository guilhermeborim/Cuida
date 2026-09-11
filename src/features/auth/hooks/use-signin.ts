import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInMutation } from "../mutations/auth.mutation";
import { SignInRequest, signInSchema } from "../schemas/signin.schema";

export function useSignIn() {
  const signInMutation = SignInMutation();

  const form = useForm<SignInRequest>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signInMutation.mutate(data);
  });

  return {
    form,
    onSubmit,
    isLoading: signInMutation.isPending,
    isError: signInMutation.isError,
  };
}
