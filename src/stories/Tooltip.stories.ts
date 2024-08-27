import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "../component";
import TooltipPage from "./TooltipPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Tooltip",
  component: TooltipPage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    content: "Test",
    children: "Test",
  },
};
