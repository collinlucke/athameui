export const buttonVariants = {
  size: {
    small: "ath-button-small",
    medium: "ath-button-medium",
    large: "ath-button-large",
    full: "ath-button-full",
  },
  textPosition: {
    left: "ath-button-text-left",
    center: "ath-button-text-center",
    right: "ath-button-text-right",
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

export const ButtonGroupVariants = {
  direction: {
    row: "ath-button-group-direction-row",
    column: "ath-button-group-direction-column",
  },
} as const;

export type ButtonSize = keyof typeof buttonVariants.size;
export type ButtonVariant = keyof typeof buttonVariants.variant;
export type ButtonDark = typeof buttonVariants.dark;
export type ButtonTextPosition = keyof typeof buttonVariants.textPosition;
export type ButtonGroupDirection = keyof typeof ButtonGroupVariants.direction;
