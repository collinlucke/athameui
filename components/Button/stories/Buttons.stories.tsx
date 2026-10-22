import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { SmileDizzyIcon } from "@hugeicons/core-free-icons";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
  decorators: [
    (Story, context) => {
      const { dark } = context.args;
      return (
        <div
          style={{
            padding: "2rem",
            backgroundColor: dark
              ? "var(--color-background-dark)"
              : "var(--color-background-light)",
            width: "100%",
          }}
        >
          <Story aria-label="Button example" data-aria="Button example" />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A button component",
      },
    },
    actions: { disable: true },
    interactions: { disable: true },
    a11y: { disable: true },
    chromatic: { disable: true },
    controls: {
      exclude: [
        "onMouseEnter",
        "onFocus",
        "onBlur",
        "onBlur",
        "aria-label",
        "aria-pressed",
        "onClick",
        "aria-controls",
        "aria-expanded",
        "onMouseLeave",
        "onMouseDown",
        "onKeyDown",
        "sx",
        "className",
        "tabIndex",
        "type",
      ],
    },
  },
  argTypes: {
    children: {
      description: `<code>ReactElement<any, string | JSXElementConstructor<any>> |</code> `,
      type: undefined,
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large", "full"],
    },
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
    icon: {
      control: "radio",
      options: ["No Icon", "w/ Icon"],
      mapping: {
        "No Icon": "",
        "w/ Icon": <HugeiconsIcon icon={SmileDizzyIcon} />,
      },
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Click me",
    className: {
      button: "",
      icon: "",
    },
    variant: "primary",
    dark: false,
    size: "medium",
    type: "button",
    title: "Title Example",
    icon: "w/ Icon",
  },
};
