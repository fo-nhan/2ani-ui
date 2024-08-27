// src/icons/Icon.stories.tsx
import React from "react";
import { Icon } from "../component";
import { arrayIcon } from "../component/Icon/arrayIcon";
import { IconTypeMap } from "../component/Icon/arrayType";
import { Meta, StoryObj } from "@storybook/react/*";

const meta = {
  title: "Icons",
  component: Icon,
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Test: Story = {
  args: {
    type: "house",
  },
};

export const AllIcons = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "16px",
    }}
  >
    {Object.keys(arrayIcon).map((iconName) => (
      <div key={iconName} style={{ textAlign: "center" }}>
        <Icon type={iconName as IconTypeMap} size={16} />
        <div>{iconName}</div>
      </div>
    ))}
  </div>
);
