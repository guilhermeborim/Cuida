import { colors } from "@/shared/design/colors";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import { ButtonVariants, type ButtonVariantsProps } from "./button.variants";

export interface ButtonProps
  extends Omit<TouchableOpacityProps, "children">, ButtonVariantsProps {
  children: string;
  isLoading?: boolean;
  textClassName?: string;
}

export const Button = ({
  children,
  isLoading = false,
  isDisabled = false,
  disabled = false,
  className,
  textClassName,
  accessibilityLabel,
  accessibilityState,
  ...touchableProps
}: ButtonProps) => {
  const buttonDisabled = disabled || isDisabled || isLoading;
  const styles = ButtonVariants({ isDisabled: buttonDisabled });

  return (
    <TouchableOpacity
      accessibilityRole="button"
      {...touchableProps}
      className={styles.container({ className })}
      disabled={buttonDisabled}
      accessibilityLabel={accessibilityLabel ?? children}
      accessibilityState={{
        ...accessibilityState,
        disabled: buttonDisabled,
        busy: isLoading,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.green.primary} />
      ) : (
        <Text className={styles.label({ className: textClassName })}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
