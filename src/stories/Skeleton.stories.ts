import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    width: "200px",
    height: "70px",
  },
};
