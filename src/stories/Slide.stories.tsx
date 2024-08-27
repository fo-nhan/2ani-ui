import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton";
import Slide from "./Slide";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Slide",
  component: Slide,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof Slide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    data: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13],
    render(value, index) {
      return (
        <div style={{ width: "200px", height: 100 }} key={index}>
          No demo {value}
        </div>
      );
    },
  },
};
