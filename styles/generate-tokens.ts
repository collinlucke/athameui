/**
 * Generates a TypeScript tokens file from CSS custom properties
 *
 * This script reads the tokens.css file and converts all CSS custom properties
 * (CSS variables) defined in the :root selector into a typed TypeScript object.
 *
 * Usage:
 *   pnpm generate-tokens
 *
 * Input:  styles/tokens.css (CSS custom properties)
 * Output: styles/tokens.ts (TypeScript token object with types)
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TokenValue {
  [key: string]: string | TokenValue;
}

function parseTokenValue(value: string): string {
  // Remove trailing semicolon and trim
  return value.replace(/;$/, "").trim();
}

function convertCSSVariableToKey(cssVar: string): string {
  // Remove -- prefix and convert to camelCase
  return cssVar
    .replace(/^--/, "")
    .replace(/-([a-z0-9])/g, (_, letter) => {
      // Handle numbers specially - don't uppercase them
      if (/\d/.test(letter)) {
        return letter.toUpperCase();
      }
      return letter.toUpperCase();
    })
    .replace(/-/g, ""); // Remove any remaining hyphens
}

function formatTokensForTS(obj: TokenValue, indent = 2): string {
  const spaces = " ".repeat(indent);
  const entries = Object.entries(obj);

  if (entries.length === 0) {
    return "{}";
  }

  const formatted = entries
    .map(([key, value]) => {
      const needsQuotes = /^\d|[^a-zA-Z0-9_$]/.test(key) || key === "default";
      const keyStr = needsQuotes ? `"${key}"` : key;

      if (typeof value === "string") {
        // Special handling for font family values - remove quotes around individual font names
        let cleanValue = value;
        if (value.includes(", sans-serif") || value.includes(", serif")) {
          cleanValue = value.replace(/"/g, "");
        }
        return `${spaces}${keyStr}: "${cleanValue}"`;
      } else {
        const nestedValue = formatTokensForTS(value as TokenValue, indent + 2);
        return `${spaces}${keyStr}: ${nestedValue}`;
      }
    })
    .join(",\n");

  return `{\n${formatted}\n${" ".repeat(indent - 2)}}`;
}

function organizeTokens(flatTokens: Record<string, string>): TokenValue {
  // First pass: resolve CSS variable references
  const resolvedTokens = resolveCSSVariables(flatTokens);

  const organized: TokenValue = {
    color: {},
    font: { family: {}, size: {} },
    padding: {},
    radius: {},
    screen: {},
  };

  for (const [key, value] of Object.entries(resolvedTokens)) {
    if (key.startsWith("color")) {
      organizeColorTokens(key, value, organized.color as TokenValue);
    } else if (key.startsWith("font")) {
      organizeFontTokens(key, value, organized.font as TokenValue);
    } else if (key.startsWith("padding")) {
      const sizeKey = key.replace("padding", "").toLowerCase();
      (organized.padding as TokenValue)[sizeKey || "default"] = value;
    } else if (key.startsWith("radius")) {
      const sizeKey = key.replace("radius", "").toLowerCase();
      (organized.radius as TokenValue)[sizeKey || "default"] = value;
    } else if (key.startsWith("screen")) {
      const sizeKey = key.replace("screen", "").toLowerCase();
      (organized.screen as TokenValue)[sizeKey || "default"] = value;
    }
  }

  return organized;
}

function resolveCSSVariables(
  flatTokens: Record<string, string>,
): Record<string, string> {
  const resolved: Record<string, string> = { ...flatTokens };

  // Keep resolving until no more var() references remain
  let hasChanges = true;
  while (hasChanges) {
    hasChanges = false;

    for (const [key, value] of Object.entries(resolved)) {
      const varMatch = value.match(/var\(--([^)]+)\)/);
      if (varMatch) {
        const varName = varMatch[1];
        const varKey = convertCSSVariableToKey(`--${varName}`);

        if (resolved[varKey]) {
          resolved[key] = resolved[varKey];
          hasChanges = true;
        }
      }
    }
  }

  return resolved;
}

function organizeColorTokens(
  key: string,
  value: string,
  colorObj: TokenValue,
): void {
  // Remove 'color' prefix to get the rest
  const remaining = key.substring(5); // Remove 'color'

  if (remaining.startsWith("Background")) {
    if (!colorObj.background) colorObj.background = {};
    const bgKey = remaining.replace("Background", "").toLowerCase();
    (colorObj.background as TokenValue)[bgKey || "default"] = value;
  } else if (remaining.startsWith("Text")) {
    if (!colorObj.text) colorObj.text = {};
    const textKey = remaining.replace("Text", "").toLowerCase();
    (colorObj.text as TokenValue)[textKey || "default"] = value;
  } else {
    // Match patterns like: Primary50, PrimaryVibrant300, Secondary, etc.
    const vibrantMatch = remaining.match(/^([A-Z][a-z]+?)Vibrant(\d+)$/);
    const numberMatch = remaining.match(/^([A-Z][a-z]+?)(\d+)$/);
    const baseMatch = remaining.match(/^([A-Z][a-z]+)$/);

    if (vibrantMatch) {
      const [, colorName, number] = vibrantMatch;
      const colorNameKey = colorName.toLowerCase();

      if (!colorObj[colorNameKey]) colorObj[colorNameKey] = {};
      const colorGroup = colorObj[colorNameKey] as TokenValue;
      if (!colorGroup.vibrant) colorGroup.vibrant = {};
      (colorGroup.vibrant as TokenValue)[number] = value;
    } else if (numberMatch) {
      const [, colorName, number] = numberMatch;
      const colorNameKey = colorName.toLowerCase();

      if (!colorObj[colorNameKey]) colorObj[colorNameKey] = {};
      const colorGroup = colorObj[colorNameKey] as TokenValue;
      colorGroup[number] = value;
    } else if (baseMatch) {
      const colorNameKey = baseMatch[1].toLowerCase();

      if (!colorObj[colorNameKey]) colorObj[colorNameKey] = {};
      const colorGroup = colorObj[colorNameKey] as TokenValue;
      colorGroup["default"] = value;
    } else {
      // Fallback for any unmatched patterns
      console.warn(`Unmatched color token: ${key}`);
      colorObj[remaining.toLowerCase()] = value;
    }
  }
}

function organizeFontTokens(
  key: string,
  value: string,
  fontObj: TokenValue,
): void {
  if (key.startsWith("fontFamily")) {
    const familyKey = key.replace("fontFamily", "").toLowerCase();
    (fontObj.family as TokenValue)[familyKey || "default"] = value;
  } else if (key.startsWith("fontSize")) {
    const sizeKey = key.replace("fontSize", "").toLowerCase();
    (fontObj.size as TokenValue)[sizeKey || "default"] = value;
  }
}

function generateTokensFromCSS(): void {
  try {
    // Read the tokens.css file
    const cssPath = join(__dirname, "./tokens.css");
    const cssContent = readFileSync(cssPath, "utf-8");

    // Extract CSS custom properties from :root
    const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/s);
    if (!rootMatch) {
      throw new Error("No :root block found in CSS file");
    }

    const rootContent = rootMatch[1];
    const propertyRegex = /--([a-z0-9-]+):\s*([^;]+);/gi;
    const flatTokens: Record<string, string> = {};

    let match;
    while ((match = propertyRegex.exec(rootContent)) !== null) {
      const [, property, value] = match;
      const key = convertCSSVariableToKey(`--${property}`);
      flatTokens[key] = parseTokenValue(value);
    }

    // Organize tokens into nested structure
    const organizedTokens = organizeTokens(flatTokens);

    // Generate TypeScript content with proper formatting
    const formattedTokens = formatTokensForTS(organizedTokens);
    const tsContent = `export const tokens = ${formattedTokens};

export type Tokens = typeof tokens;

// Individual token type exports for convenience
export type ColorTokens = typeof tokens.color;
export type FontTokens = typeof tokens.font;
export type PaddingTokens = typeof tokens.padding;
export type RadiusTokens = typeof tokens.radius;
export type ScreenTokens = typeof tokens.screen;
`;

    // Write to tokens.ts file
    const tsPath = join(__dirname, "./tokens.ts");
    writeFileSync(tsPath, tsContent, "utf-8");

    console.log("✅ Successfully generated tokens.ts from tokens.css");
    console.log(
      `📝 Found ${Object.keys(flatTokens).length} CSS custom properties`,
    );
    console.log(`📁 Generated file: ${tsPath}`);
  } catch (error) {
    console.error("❌ Error generating tokens:", error);
    process.exit(1);
  }
}

// Run the script
generateTokensFromCSS();
