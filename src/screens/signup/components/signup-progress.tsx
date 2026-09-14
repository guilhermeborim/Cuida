import { View } from "react-native";

export interface SignUpProgressProps {
  step: number;
  steps: { title: string }[];
}
export default function SignUpProgress({ step, steps }: SignUpProgressProps) {
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Progresso do cadastro"
      accessibilityValue={{
        min: 1,
        max: steps.length,
        now: step + 1,
        text: `Etapa ${step + 1} de ${steps.length}`,
      }}
      className="my-md flex-row gap-sm"
    >
      {steps.map((item, index) => (
        <View
          key={item.title}
          className={
            index <= step
              ? "h-sm flex-1 rounded-pill bg-green-dark"
              : "h-sm flex-1 rounded-pill bg-green-light"
          }
        />
      ))}
    </View>
  );
}
