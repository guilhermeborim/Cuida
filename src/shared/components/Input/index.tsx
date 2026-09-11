import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";
import { InputVariants, InputVariantsProps } from "./input.variants";
import { useInput } from "./useInput";

export interface InputProps extends TextInputProps, InputVariantsProps {
  label?: string;
  containerClassName?: string;
  mask?: (value: string) => void | string;
  error?: string;
}

export const Input = ({
  label,
  containerClassName,
  mask,
  value,
  isError,
  secureTextEntry,
  onBlur,
  onFocus,
  onChangeText,
  error,
  isDisabled,
  ...textInputProps
}: InputProps) => {
  const { handleTextChange } = useInput({
    onBlur,
    onFocus,
    isError: !!error,
    mask,
    onChangeText,
    isDisabled,
    secureTextEntry,
    value,
  });
  const styles = InputVariants({ isDisabled, isError: !!error });

  return (
    <View className={styles.container({ className: containerClassName })}>
      <Text className={styles.label()}>{label}</Text>
      <Pressable className={styles.wrapper()}>
        <TextInput
          onChangeText={handleTextChange}
          value={value}
          secureTextEntry={secureTextEntry}
          className={styles.input()}
          {...textInputProps}
        />
      </Pressable>

      {error && (
        <Text className={styles.error()}>
          <Ionicons className="ml-2" name="alert-circle-outline" /> {error}
        </Text>
      )}
    </View>
  );
};
