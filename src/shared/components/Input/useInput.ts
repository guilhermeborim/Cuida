import { useRef } from "react";
import { BlurEvent, FocusEvent, TextInput } from "react-native";

interface useInputProps {
  isError?: boolean;
  isDisabled?: boolean;
  secureTextEntry?: boolean;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: BlurEvent) => void;
  mask?: (text: string) => string | void;
  onChangeText?: (text: string) => string | void;
  value?: string;
}

export const useInput = ({
  isError,
  isDisabled,
  onFocus,
  onBlur,
  mask,
  onChangeText,
  value,
}: useInputProps) => {
  const inputRef = useRef<TextInput>(null);

  const handleWrapperPress = () => {
    inputRef.current?.focus();
  };

  const handleTextChange = (text: string) => {
    if (mask) {
      onChangeText?.(mask(text) || "");
    } else {
      onChangeText?.(text);
    }
  };

  return {
    handleWrapperPress,
    handleTextChange,
  };
};
