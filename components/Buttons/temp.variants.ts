// button.variants.ts
export const buttonVariants = {
  size: {
    small: "ath-small",
    medium: "ath-medium",
    large: "ath-large",
    full: "ath-full",
  },
  variant: {
    primary: "ath-primary",
    secondary: "ath-secondary",
    tertiary: "ath-tertiary",
    danger: "ath-danger",
    warning: "ath-warning",
    success: "ath-success",
    outline: "ath-outline",
  },
  dark: "ath-dark",
} as const;

export type ButtonSize = keyof typeof buttonVariants.size;
export type ButtonVariant = keyof typeof buttonVariants.variant;
export type ButtonDark = keyof typeof buttonVariants.dark;
