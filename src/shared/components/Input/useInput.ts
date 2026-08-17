import { useRef, useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const handleWrapperPress = () => {
    inputRef.current?.focus();
  };

  const handleFocus = (event: FocusEvent) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: BlurEvent) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleTextChange = (text: string) => {
    if (mask) {
      onChangeText?.(mask(text) || "");
    } else {
      onChangeText?.(text);
    }
  };

  return {
    handleBlur,
    handleFocus,
    handleWrapperPress,
    handleTextChange,
    isFocused,
  };
};
