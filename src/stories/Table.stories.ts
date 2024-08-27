import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "../component";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    config: [
      {
        key: "name",
        width: 300,
        title: "Họ tên"
      },
      {
        key: "age",
        title: "Tuổi"
      },
    ],
    data: [
      {
        name: "Nguyễn Nhân",
        age: 24,
        id: 1,
      },
      {
        name: "Hà Phạm",
        age: 30,
        id: 2,
      },
    ],
  },
};
