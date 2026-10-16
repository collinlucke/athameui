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

export const media = {
  min: {
    xs: minWidth(breakpoints.xs),
    sm: minWidth(breakpoints.sm),
    md: minWidth(breakpoints.md),
    lg: minWidth(breakpoints.lg),
    xl: minWidth(breakpoints.xl),
    "2xl": minWidth(breakpoints["2xl"]),
    "3xl": minWidth(breakpoints["3xl"]),
    "4xl": minWidth(breakpoints["4xl"]),
  },
  max: {
    xs: maxWidth(breakpoints.xs),
    sm: maxWidth(breakpoints.sm),
    md: maxWidth(breakpoints.md),
    lg: maxWidth(breakpoints.lg),
    xl: maxWidth(breakpoints.xl),
    "2xl": maxWidth(breakpoints["2xl"]),
    "3xl": maxWidth(breakpoints["3xl"]),
    "4xl": maxWidth(breakpoints["4xl"]),
  },
} as const;

export const font = {
  family: {
    sans: "Montserrat, sans-serif",
    serif: "Libre Baskerville, serif",
  },
  size: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    "2xl": "2rem",
    "3xl": "2.5rem",
    "4xl": "3rem",
    "5xl": "3.5rem",
  },
};

export const color = {
  primary: {
    "50": "#f0f2f5",
    "100": "#d9dee6",
    "200": "#b8c3d1",
    "300": "#8a9bae",
    "400": "#4a5f7a",
    "500": "#0b1828",
    "600": "#081320",
    "700": "#060e18",
    "800": "#04090f",
    "900": "#020407",
    default: "#0b1828",
    vibrant: {
      "300": "#8ab6ff",
      "500": "#4f86f7",
      "700": "#1e3a8a",
    },
  },
  secondary: {
    "50": "#e6f7f6",
    "100": "#b3e8e5",
    "200": "#80d9d4",
    "300": "#4dcac3",
    "400": "#2aa39b",
    "500": "#146b68",
    "600": "#125a57",
    "700": "#0f4a47",
    "800": "#0c3835",
    "900": "#081f1c",
    default: "#146b68",
    vibrant: {
      "300": "#75dac7",
      "500": "#1abc9c",
      "700": "#138f6e",
    },
  },
  tertiary: {
    "50": "#f7f4f0",
    "100": "#eedecc",
    "200": "#e5c8a8",
    "300": "#dcb184",
    "400": "#d19b60",
    "500": "#bfa081",
    "600": "#a68965",
    "700": "#7d6748",
    "800": "#54442c",
    "900": "#2b2216",
    default: "#bfa081",
    vibrant: {
      "300": "#f7c873",
      "500": "#f39c12",
      "700": "#c9780e",
    },
  },
  error: {
    "50": "#fee6e6",
    "100": "#fbb3b3",
    "200": "#f88080",
    "300": "#f54d4d",
    "400": "#f21a1a",
    "500": "#9f0001",
    "600": "#800001",
    "700": "#600001",
    "800": "#400000",
    "900": "#200000",
    default: "#9f0001",
    vibrant: {
      "300": "#f48a6f",
      "500": "#e74c3c",
      "700": "#c0392b",
    },
  },
  warning: {
    "50": "#fef5ec",
    "100": "#fdebda",
    "200": "#fad8b3",
    "300": "#f8c48c",
    "400": "#f5b065",
    "500": "#f39c12",
    "600": "#c27d0e",
    "700": "#925e0b",
    "800": "#613e07",
    "900": "#311f04",
    default: "#f39c12",
    vibrant: {
      "300": "#fce705",
      "500": "#fbc306",
      "700": "#f8950a",
    },
  },
  success: {
    "50": "#e8f5f2",
    "100": "#d1ece4",
    "200": "#a3d8ca",
    "300": "#76c5af",
    "400": "#48b195",
    "500": "#1a9e7a",
    "600": "#157e62",
    "700": "#105f49",
    "800": "#0a3f31",
    "900": "#052018",
    default: "#1a9e7a",
    vibrant: {
      "300": "#07e71f",
      "500": "#08e27e",
      "700": "#26b656",
    },
  },
  text: {
    dark: "#040a0c",
    light: "#fcfbf7",
  },
  background: {
    light: "#fcfbf7",
    dark: "#040a0c",
  },
};
export const padding = {
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "10px",
  xl: "16px",
};
export const radius = {
  sm: "3px",
  md: "5px",
  lg: "8px",
};

export type FontTokens = typeof font;
export type ColorTokens = typeof color;
export type PaddingTokens = typeof padding;
export type RadiusTokens = typeof radius;
export type MediaTokens = typeof media;
export type ScreenTokens = typeof breakpoints;

export const tokens = {
  font,
  color,
  media,
  padding,
  radius,
};
