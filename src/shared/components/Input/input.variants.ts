import { tv, type VariantProps } from "tailwind-variants";

export const InputVariants = tv({
  slots: {
    container: "w-full",
    wrapper: "flex-row items-center border-b border-danger",
    input: "bg-transparent text-danger text-base flex-1",
    label: "text-xs text-danger font-bold uppercase",
    error: "text-sm text-danger mt-1",
  },
  variants: {
    isFocused: {
      true: {
        wrapper: "border-danger",
        label: "text-danger",
      },
    },
    isError: {
      true: {
        wrapper: "border-danger",
        label: "text-danger",
      },
    },
    isDisabled: {
      true: {
        wrapper: "opacity-50",
        input: "text-danger",
      },
    },
  },
  defaultVariants: {
    isFocused: false,
    isError: false,
    isDisabled: false,
  },
});

export type InputVariantsProps = VariantProps<typeof InputVariants>;
