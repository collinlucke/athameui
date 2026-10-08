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
