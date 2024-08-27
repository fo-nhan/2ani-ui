import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    page: 1,
    size: 10,
    total: 200,
    onChange: (page) => {}
  },
};
