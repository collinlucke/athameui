import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "../Avatar";

const sampleImage = "./Van Gogh.jpg";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Components/Avatar",
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          backgroundColor: "var(--color-background-dark)",
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A circular avatar. Shows initials from the display name, or an image when imageUrl is set.",
      },
    },
    actions: { disable: true },
    interactions: { disable: true },
    a11y: { disable: true },
    chromatic: { disable: true },
    controls: {
      exclude: ["className", "sx"],
    },
  },
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large", "profile"],
    },
    imageUrl: {
      control: "radio",
      options: ["No Image", "With Image"],
      mapping: {
        "No Image": "",
        "With Image": sampleImage,
      },
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Avatar> = {
  args: {
    displayName: "Van Gock",
    size: "medium",
    imageUrl: "No Image",
  },
};
