import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../component";
import SelectPage from "./SelectPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Select",
  component: SelectPage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    options: [{
        value: 1,
        label: "Hello"
    }]
  },
};
