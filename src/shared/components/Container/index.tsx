import { View, ViewProps } from "react-native";

type ContainerProps = ViewProps & {
  padded?: boolean;
};

export default function Container({
  padded = true,
  className = "",
  children,
  ...props
}: ContainerProps) {
  return (
    <View
      {...props}
      className={`flex-1 bg-surface ${padded ? "px-md pt-md" : ""} ${className}`}
    >
      {children}
    </View>
  );
}
