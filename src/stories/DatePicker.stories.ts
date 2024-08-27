import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Line } from "../component";
import DatePicker from "./DatePicker";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/DatePicker",
  component: DatePicker,
  parameters: {
    // layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    onChange(date) {
      console.log(date);
    },
  },
};
