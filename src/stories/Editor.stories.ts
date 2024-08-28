import type { Meta, StoryObj } from "@storybook/react";
import { Editor } from "../component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Editor",
  component: Editor,
  parameters: {
    // layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    onChange(values) {
      console.log(values);
    },
    placeholder: "Nhập gì đi",
  },
};
