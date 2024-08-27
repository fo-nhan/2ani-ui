import type { Meta, StoryObj } from "@storybook/react";
import { Line } from "../component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Line",
  component: Line,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Line>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    
  },
};
