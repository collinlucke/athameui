import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { breakpoints, color, font, padding, radius } from "../styles/tokens.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

const COLOR_GROUPS = [
  "primary",
  "secondary",
  "tertiary",
  "error",
  "warning",
  "success",
] as const;

const SHADES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
] as const;

const VIBRANT_SHADES = ["300", "500", "700"] as const;

const fontFamily = (value: string) => {
  const [family, ...fallback] = value.split(",").map((part) => part.trim());
  return [`"${family}"`, ...fallback].join(", ");
};

const screenEntries = Object.entries(breakpoints);

const lines = [
  "/* Generated from styles/tokens.ts. Edit that file, then run pnpm generate-tokens. */",
  ":root {",
  `  --font-family-sans: ${fontFamily(font.family.sans)};`,
  `  --font-family-serif: ${fontFamily(font.family.serif)};`,
  "",
  ...COLOR_GROUPS.map(
    (name) => `  --color-${name}: ${color[name].default};`,
  ),
  `  --color-text-dark: ${color.text.dark};`,
  `  --color-text-light: ${color.text.light};`,
  "",
  `  --color-background-light: ${color.background.light};`,
  `  --color-background-dark: ${color.background.dark};`,
];

for (const name of COLOR_GROUPS) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  lines.push("", `  /* ----- ${label} ----- */`);
  for (const shade of SHADES) {
    lines.push(`  --color-${name}-${shade}: ${color[name][shade]};`);
  }
  lines.push("");
  for (const shade of VIBRANT_SHADES) {
    lines.push(
      `  --color-${name}-vibrant-${shade}: ${color[name].vibrant[shade]};`,
    );
  }
}

lines.push(
  "",
  "  /* ----- Padding ----- */",
  ...Object.entries(padding).map(([name, value]) => `  --padding-${name}: ${value};`),
  "",
  "  /* ----- Radius ----- */",
  ...Object.entries(radius).map(([name, value]) => `  --radius-${name}: ${value};`),
  "",
  "  /* ----- Font Sizes ----- */",
  ...Object.entries(font.size).map(
    ([name, value]) => `  --font-size-${name}: ${value};`,
  ),
  "",
  ...screenEntries.map(([name, width]) => `  --screen-${name}: ${width};`),
  "",
  "  /* ----- Media Queries ----- */",
  ...screenEntries.map(
    ([name, width]) => `  --media-min-${name}: @media (min-width: ${width}px);`,
  ),
  "",
  ...screenEntries.map(
    ([name, width]) =>
      `  --media-max-${name}: @media (max-width: ${width - 1}px);`,
  ),
  "}",
);

const cssPath = join(__dirname, "../styles/tokens.css");
const current = readFileSync(cssPath, "utf-8");
const baseStart = current.indexOf("@layer base");
if (baseStart === -1) {
  throw new Error("tokens.css is missing the @layer base block");
}

const next = `${lines.join("\n")}\n\n${current.slice(baseStart)}`;
writeFileSync(cssPath, next, "utf-8");
console.log(`Wrote ${cssPath} from styles/tokens.ts`);
