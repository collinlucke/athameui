import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { HugeiconsIcon } from "@hugeicons/react";
import { SmileDizzyIcon } from "@hugeicons/core-free-icons";
import styles from "../Button.module.css";

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
          }}
        >
          <Story aria-label="Button example" data-aria="Button example" />
        </div>
      );
    },
  ],
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: `<code>ReactElement<any, string | JSXElementConstructor<any>> |</code> `,
      type: undefined,
    },
    className: {
      control: false,
    },
    iconOnly: {
      control: "boolean",
    },
    dark: {
      control: "boolean",
    },
    icon: {
      control: "radio",
      options: ["No Icon", "w/ Icon"],
      mapping: {
        "No Icon": "",
        "w/ Icon": (
          <HugeiconsIcon
            className={styles.buttonSVGIcon}
            icon={SmileDizzyIcon}
          />
        ),
      },
    },
    type: {
      control: false,

      description: `
\`"button"\` \`"submit"\` \`"reset"\`

**Default:** \`"button"\`
`,
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Button> = {
  args: {
    children: "Click me",
    className: "",
    variant: "primary",
    dark: false,
    size: "medium",
    type: "button",
    title: "Title Example",
    icon: "w/ Icon",
    iconOnly: true,
    testId: "test-id",
  },
};
