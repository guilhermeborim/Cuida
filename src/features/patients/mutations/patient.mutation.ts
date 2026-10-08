import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { patientRequest } from "../api/patient.request";

const CreatePatientMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patientRequest.create,

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Criado com sucesso.",
        position: "top",
      });

      queryClient.invalidateQueries({
        queryKey: ["findAllByUser"],
      });
      router.back();
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

export { CreatePatientMutation };
