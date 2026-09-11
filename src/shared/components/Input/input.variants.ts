import { tv, type VariantProps } from "tailwind-variants";

export const InputVariants = tv({
  slots: {
    container: "gap-sm",
    wrapper:
      "min-h-input flex-row rounded-input border border-green-dark px-md ",
    input:
      "bg-transparent text-text-primary text-md flex-1 placeholder:text-text-hint",
    label: "font-semibold text-label text-text-primary",
    error: "text-sm text-danger-primary mt-1",
  },
  variants: {
    isError: {
      true: {
        wrapper: "border-danger-primary",
      },
    },
    isDisabled: {
      true: {
        wrapper: "opacity-50",
        input: "text-danger-primary",
      },
    },
  },
  defaultVariants: {
    isError: false,
    isDisabled: false,
  },
});

export type InputVariantsProps = VariantProps<typeof InputVariants>;
