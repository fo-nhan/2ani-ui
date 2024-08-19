import type { Meta, StoryObj } from "@storybook/react";
import { Button, UI2aniContext } from "../component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Layout/UI2aniContext",
  component: UI2aniContext,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultThemeKey: {
      control: "radio",
      options: ["light", "dark"],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof UI2aniContext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    children: "",
  },
};
