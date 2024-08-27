import type { Meta, StoryObj } from "@storybook/react";
import Modal from "./Modal";
import Layout from "./Layout";
import FormPage from "./Form";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Component/Form",
  component: FormPage,
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {},
} ;
