export const ButtonGroupVariants = {
  direction: {
    row: "ath-button-group-direction-row",
    column: "ath-button-group-direction-column",
  },
} as const;

export type ButtonGroupDirection = keyof typeof ButtonGroupVariants.direction;
