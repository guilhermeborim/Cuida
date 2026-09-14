import { authRequest } from "@/features/auth/api/auth.request";
import { useUserStore } from "@/shared/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const SignInMutation = () => {
  const setSession = useUserStore((state) => state.setSession);

  return useMutation({
    mutationFn: authRequest.login,

    onSuccess: (response) => {
      setSession(response.access_token);
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        position: "top",
      });
    },
  });
};

const SignUpMutation = () => {
  return useMutation({
    mutationFn: authRequest.register,

    onSuccess: () => {
      (Toast.show({
        type: "success",
        text1: "Cadastrado com sucesso.",
        position: "top",
      }),
        router.replace("/(auth)/signin"));
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: error.message,
        position: "top",
      });
    },
  });
};

export { SignInMutation, SignUpMutation };
