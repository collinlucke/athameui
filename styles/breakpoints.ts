export const breakpoints = {
  xs: 320,
  sm: 480,
  md: 620,
  lg: 768,
  xl: 896,
  "2xl": 1024,
  "3xl": 1280,
  "4xl": 1536,
} as const;

export type Breakpoints = typeof breakpoints;
export type Breakpoint = keyof typeof breakpoints;

const minWidth = (width: number) => `@media (min-width: ${width}px)`;
const maxWidth = (width: number) => `@media (max-width: ${width - 1}px)`;

export const minXs = minWidth(breakpoints.xs);
export const minSm = minWidth(breakpoints.sm);
export const minMd = minWidth(breakpoints.md);
export const minLg = minWidth(breakpoints.lg);
export const minXl = minWidth(breakpoints.xl);
export const min2xl = minWidth(breakpoints["2xl"]);
export const min3xl = minWidth(breakpoints["3xl"]);
export const min4xl = minWidth(breakpoints["4xl"]);

export const maxXs = maxWidth(breakpoints.xs);
export const maxSm = maxWidth(breakpoints.sm);
export const maxMd = maxWidth(breakpoints.md);
export const maxLg = maxWidth(breakpoints.lg);
export const maxXl = maxWidth(breakpoints.xl);
export const max2xl = maxWidth(breakpoints["2xl"]);
export const max3xl = maxWidth(breakpoints["3xl"]);
export const max4xl = maxWidth(breakpoints["4xl"]);
