import { authRequest } from "@/shared/api/auth/auth.request";
import { useUserStore } from "@/shared/store/authStore";
import { useMutation } from "@tanstack/react-query";

const useLoginMutation = () => {
  const { setSession } = useUserStore();

  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authRequest.login(data.email, data.password),
    onSuccess: (response) => {
      setSession(response.access_token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    mutation,
  };
};

export { useLoginMutation };
