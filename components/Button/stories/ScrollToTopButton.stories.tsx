import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollToTopButton } from "../ScrollToTopButton";

const meta: Meta<typeof ScrollToTopButton> = {
  component: ScrollToTopButton,
  title: "Components/ScrollToTopButton",
  decorators: [
    (Story, context) => {
      const { dark } = context.args;

      useEffect(() => {
        const html = document.documentElement;
        const { body } = document;
        const root = document.getElementById("storybook-root");
        const previous = {
          htmlOverflow: html.style.overflow,
          htmlHeight: html.style.height,
          bodyOverflow: body.style.overflow,
          bodyHeight: body.style.height,
          rootHeight: root?.style.height,
        };

        html.style.overflow = "auto";
        html.style.height = "auto";
        body.style.overflow = "auto";
        body.style.height = "auto";
        if (root) root.style.height = "auto";

        return () => {
          html.style.overflow = previous.htmlOverflow;
          html.style.height = previous.htmlHeight;
          body.style.overflow = previous.bodyOverflow;
          body.style.height = previous.bodyHeight;
          if (root && previous.rootHeight !== undefined) {
            root.style.height = previous.rootHeight;
          }
        };
      }, []);

      return (
        <div
          style={{
            minHeight: "calc(100vh + 800px)",
            padding: "2rem",
            backgroundColor: dark
              ? "var(--color-background-dark)"
              : "var(--color-background-light)",
            color: dark ? "var(--color-text-light)" : "var(--color-text-dark)",
          }}
        >
          <p style={{ margin: 0 }}>Scroll down to see the button!</p>
          <Story />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A fixed button that appears after the page scrolls 300px and returns to the top when clicked.",
      },
    },
    actions: { disable: true },
    interactions: { disable: true },
    a11y: { disable: true },
    chromatic: { disable: true },
    controls: {
      exclude: [
        "aria-controls",
        "aria-expanded",
        "aria-label",
        "aria-pressed",
        "children",
        "className",
        "disabled",
        "icon",
        "onBlur",
        "onClick",
        "onFocus",
        "onKeyDown",
        "onMouseDown",
        "onMouseEnter",
        "onMouseLeave",
        "size",
        "sx",
        "tabIndex",
        "textPosition",
        "type",
        "wrap",
      ],
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "danger",
        "warning",
        "success",
        "outline",
        "ghost",
      ],
    },
    dark: {
      control: "boolean",
    },
  },
};
export default meta;

export const Default: StoryObj<typeof ScrollToTopButton> = {
  args: {
    variant: "secondary",
    dark: false,
    title: "Back to top",
  },
};
