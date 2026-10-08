import { usePatient } from "@/features/patients/hooks/use-patient";
import { Button } from "@/shared/components/Button";
import Container from "@/shared/components/Container";
import { PatientForm } from "@/shared/components/PatientForm";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
export default function CreatePatientsView() {
  const { form, isCreating, submitPatient } = usePatient();

  return (
    <Container>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        bottomOffset={40}
        style={{ flex: 1 }}
      >
        <View className="flex-1 mb-6">
          <PatientForm
            control={form.control}
            fields={{
              name: "name",
              cpf: "cpf",
              emergencyPhone: "emergencyPhone",
              relationship: "relationship",
              birthDate: "birthDate",
            }}
            isLoading={isCreating}
          />
        </View>
      </KeyboardAwareScrollView>
      <View className="py-sm">
        <Button onPress={submitPatient} isLoading={isCreating}>
          Cadastrar
        </Button>
      </View>
    </Container>
  );
}
