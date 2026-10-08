import {
  SafeAreaView,
  type SafeAreaViewProps,
} from "react-native-safe-area-context";

type SafeAreaContainerProps = SafeAreaViewProps & {
  padded?: boolean;
};

export default function SafeAreaContainer({
  padded = true,
  className = "",
  children,
  ...props
}: SafeAreaContainerProps) {
  return (
    <SafeAreaView
      {...props}
      className={`flex-1 bg-surface ${
        padded ? "px-md pt-md" : ""
      } ${className}`}
    >
      {children}
    </SafeAreaView>
  );
}
