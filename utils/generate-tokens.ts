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
  const organized: TokenValue = {};

  for (const [key, value] of Object.entries(resolvedTokens)) {
    organizeTokenDynamically(key, value, organized);
  }

  return organized;
}

function organizeTokenDynamically(
  key: string,
  value: string,
  organized: TokenValue,
): void {
  // Handle numbered variants at the end of keys like fontSize2xl, screen3xl, colorPrimaryVibrant300
  const numberedMatch = key.match(/^(.+?)(\d+[a-z]*)$/);
  if (numberedMatch) {
    const [, basePart, numberPart] = numberedMatch;

    // Split the base part into category parts
    const parts = basePart.split(/(?=[A-Z])/).map((part) => part.toLowerCase());

    let current = organized;

    // Navigate to the correct nested location
    for (const part of parts) {
      if (!current[part]) {
        current[part] = {};
      } else if (typeof current[part] === "string") {
        const existingValue = current[part];
        current[part] = { default: existingValue };
      }
      current = current[part] as TokenValue;
    }

    // Add the numbered variant
    current[numberPart] = value;
    return;
  }

  // Split camelCase key into parts for regular tokens
  const parts = key.split(/(?=[A-Z])/).map((part) => part.toLowerCase());

  if (parts.length === 0) return;

  let current = organized;

  // Navigate through all parts except the last one
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];

    if (!current[part]) {
      current[part] = {};
    } else if (typeof current[part] === "string") {
      // Convert existing string value to object with 'default' key
      const existingValue = current[part];
      current[part] = { default: existingValue };
    }

    current = current[part] as TokenValue;
  }

  // Handle the final key
  const finalPart = parts[parts.length - 1];

  // Check if this looks like a numbered variant (ends with digits)
  const numberMatch = finalPart.match(/^(.+?)(\d+)$/);

  if (numberMatch) {
    // Handle numbered variants like primary50
    const [, baseName, number] = numberMatch;

    // Ensure the base exists as an object
    if (!current[baseName]) {
      current[baseName] = {};
    } else if (typeof current[baseName] === "string") {
      // Convert existing string to object with default key
      const existingValue = current[baseName];
      current[baseName] = { default: existingValue };
    }

    const baseGroup = current[baseName] as TokenValue;
    baseGroup[number] = value;
  } else {
    // Regular token or base token
    if (current[finalPart] && typeof current[finalPart] === "object") {
      // If it's already an object, add as 'default'
      (current[finalPart] as TokenValue)["default"] = value;
    } else {
      current[finalPart] = value;
    }
  }
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

function generateTokensFromCSS(): void {
  try {
    // Read the tokens.css file
    const cssPath = join(__dirname, "../styles/tokens.css");
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

    // Generate dynamic type exports based on the organized tokens
    const typeExports = Object.keys(organizedTokens)
      .map((category) => {
        const capitalizedCategory =
          category.charAt(0).toUpperCase() + category.slice(1);
        return `export type ${capitalizedCategory}Tokens = typeof tokens.${category};`;
      })
      .join("\n");

    const tsContent = `export const tokens = ${formattedTokens};

export type Tokens = typeof tokens;

// Individual token type exports for convenience
${typeExports}
`;

    // Write to tokens.ts file
    const tsPath = join(__dirname, "../styles/tokens.ts");
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
