import { authRequest } from "@/features/auth/api/auth.request";
import { useUserStore } from "@/shared/store/authStore";
import { useMutation } from "@tanstack/react-query";
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

export { SignInMutation };
