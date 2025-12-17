// import { mergeConfig } from "vite";
// import postcssNesting from "postcss-nesting";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../components/**/stories/*.stories.@(js|ts|jsx|tsx|mdx)"],
  staticDirs: ["../dist"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/react-vite",
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  viteFinal: async (config) => {
    if (process.env.NODE_ENV === "production") {
      config.base = "/athameui/storybook/";
    }
    return config;
  },
};
export default config;
