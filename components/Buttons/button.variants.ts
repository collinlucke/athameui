// button.variants.ts
export const buttonVariants = {
  size: {
    small: "ath-button-small",
    medium: "ath-button-medium",
    large: "ath-button-large",
    full: "ath-button-full",
  },
  variant: {
    primary: "ath-button-primary",
    secondary: "ath-button-secondary",
    tertiary: "ath-button-tertiary",
    danger: "ath-button-danger",
    warning: "ath-button-warning",
    success: "ath-button-success",
    outline: "ath-button-outline",
    ghost: "ath-button-ghost",
  },
  dark: "ath-button-dark",
} as const;

export type ButtonSize = keyof typeof buttonVariants.size;
export type ButtonVariant = keyof typeof buttonVariants.variant;
export type ButtonDark = keyof typeof buttonVariants.dark;
