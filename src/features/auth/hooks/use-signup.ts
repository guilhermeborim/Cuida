import {
  signUpSchema,
  type SignUpRequest,
} from "@/features/auth/schemas/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { authRequest } from "../api/auth.request";
import { SignUpMutation } from "../mutations/auth.mutation";
import { steps } from "../types/steps";

export type CareRecipient = "self" | "other";

export function useSignUp() {
  const signUpMutation = SignUpMutation();
  const [step, setStep] = useState(0);
  const advancing = useRef(false);
  const isLastStep = step === steps.length - 1;
  const [showPassword, setShowPassword] = useState(false);
  const [careRecipient, setCareRecipient] = useState<CareRecipient | null>(
    null,
  );

  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);

  useEffect(() => {
    Keyboard.dismiss();
  }, [step]);

  const form = useForm<SignUpRequest>({
    resolver: zodResolver(signUpSchema),
    shouldUnregister: false,
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      relationship: undefined,
      person: {
        name: "",
        cpf: "",
        emergencyPhone: "",
      },
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    signUpMutation.mutate(data);
  });

  const selectCareRecipient = (value: CareRecipient) => {
    if (signUpMutation.isPending) return;
    if (value !== careRecipient) {
      form.resetField("person.name");
      form.resetField("relationship");
      form.resetField("person.cpf");
      form.resetField("person.emergencyPhone");
    }
    setCareRecipient(value);
    form.setValue("option", value, { shouldDirty: true });
  };

  const handleEmailBlur = async () => {
    if (advancing.current) return;
    const email = form.getValues("email").trim();
    advancing.current = true;

    try {
      if (!(await form.trigger("email"))) return;
      if (form.getValues("email").trim() !== email) return;

      setIsCheckingEmail(true);
      const exists = await authRequest.checkEmail(email);

      if (form.getValues("email").trim() !== email) return;

      if (exists) {
        form.setValue("email", "", { shouldDirty: true });
        form.setError("email", {
          type: "emailExists",
          message: "Este e-mail já está cadastrado.",
        });
        return;
      }

      setStep(step + 1);
    } catch {
      if (form.getValues("email").trim() !== email) return;
      form.setError("email", {
        type: "emailCheck",
        message: "Não foi possível verificar o e-mail. Tente novamente.",
      });
    } finally {
      setIsCheckingEmail(false);
      advancing.current = false;
    }
  };

  const handlePhoneBlur = async () => {
    if (advancing.current) return;
    const phone = form.getValues("phone").trim();
    advancing.current = true;

    try {
      if (!(await form.trigger("phone"))) return;
      if (form.getValues("phone").trim() !== phone) return;

      setIsCheckingPhone(true);
      const exists = await authRequest.checkPhone(phone);
      if (form.getValues("phone").trim() !== phone) return;

      if (exists) {
        form.setValue("phone", "", { shouldDirty: true });
        form.setError("phone", {
          type: "phoneExists",
          message: "Este telefone já está cadastrado.",
        });
        return;
      }

      setStep(step + 1);
    } catch {
      if (form.getValues("phone").trim() !== phone) return;
      form.setError("phone", {
        type: "phoneCheck",
        message: "Não foi possível verificar o telefone. Tente novamente.",
      });
    } finally {
      setIsCheckingPhone(false);
      advancing.current = false;
    }
  };

  const advance = async () => {
    if (signUpMutation.isPending) return;
    if (steps[step].fields.includes("email")) {
      await handleEmailBlur();
      return;
    }

    if (steps[step].fields.includes("phone")) {
      await handlePhoneBlur();
      return;
    }

    if (advancing.current || form.formState.isSubmitting) return;
    advancing.current = true;
    try {
      if (isLastStep) {
        if (!careRecipient) return;
        form.setValue("option", careRecipient);
        await onSubmit();
      } else if (await form.trigger(steps[step].fields)) {
        setStep(step + 1);
      }
    } finally {
      advancing.current = false;
    }
  };

  return {
    step,
    steps,
    isLastStep,
    showPassword,
    setShowPassword,
    careRecipient,
    selectCareRecipient,
    form,
    advance,
    setStep,
    isLoading: signUpMutation.isPending || isCheckingEmail || isCheckingPhone,
    isCheckingEmail,
    handleEmailBlur,
    handlePhoneBlur,
  };
}
