import type { Meta, StoryObj } from "@storybook/react";
import Collapse from "./Collapse";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Collapse",
  component: Collapse,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Collapse>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    children: "Hahaha",
    title: "Collapse Test",
  },
};
