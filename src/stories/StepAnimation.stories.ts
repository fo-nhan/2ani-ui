import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";
import { StepAnimation } from "../component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/StepAnimation",
  component: StepAnimation,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof StepAnimation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    children: "ABC",
    current: 1,
    step: 1
  },
};
