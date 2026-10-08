import { useRef } from "react";
import { TextInput } from "react-native";

interface useInputProps {
  mask?: (text: string) => string | void;
  onChangeText?: (text: string) => string | void;
}

export const useInput = ({ mask, onChangeText }: useInputProps) => {
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
