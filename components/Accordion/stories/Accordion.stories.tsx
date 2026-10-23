import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "../Accordion";

const items = [
  {
    id: "one",
    heading: "What is an accordion?",
    content: "A list of sections. One heading opens its content.",
  },
  {
    id: "two",
    heading: "Can more than one section be open?",
    content:
      'Set expand to "any" and each heading toggles on its own. "one" closes the others.',
  },
  {
    id: "three",
    heading: "Where does extra content go?",
    content:
      "aboveContent sits above the accordion. belowContent sits below it.",
  },
];

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: "Components/Accordion",
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          backgroundColor: "var(--color-background-dark)",
          color: "var(--color-text-light)",
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
          "A list of expandable sections. expand controls whether one section or any number can be open.",
      },
    },
    actions: { disable: true },
    interactions: { disable: true },
    a11y: { disable: true },
    chromatic: { disable: true },
    controls: {
      exclude: [
        "className",
        "CustomAccordionItem",
        "expandToggleCallback",
        "items",
        "sx",
      ],
    },
  },
  argTypes: {
    expand: {
      control: "inline-radio",
      options: ["one", "any"],
    },
  },
};
export default meta;

export const Default: StoryObj<typeof Accordion> = {
  args: {
    items,
    expand: "one",
    aboveContent: "Above the accordion",
    belowContent: "Below the accordion",
  },
};
