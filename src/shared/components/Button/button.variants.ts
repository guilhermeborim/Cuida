import { tv, type VariantProps } from "tailwind-variants";

export const ButtonVariants = tv({
  slots: {
    container:
      "min-h-button items-center justify-center rounded-button bg-green-dark px-lg py-md",
    label: "text-center font-semibold text-label text-background",
  },
  variants: {
    isDisabled: {
      true: {
        container: "bg-green-light",
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export type ButtonVariantsProps = VariantProps<typeof ButtonVariants>;
