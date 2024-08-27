import React from "react";
import { Select, UI2aniContext } from "../component";
import { SelectTypeProps } from "../component/ui/Select";

const SelectPage = (props: SelectTypeProps) => {
  return (
    <UI2aniContext
      style={{
        width: "100%",
        background: "white",
        minHeight: "200px",
      }}
    >
      <Select
        options={[
          {
            value: 1,
            label: "Hello",
          },
          {
            value: 2,
            label: "Hello 2",
          },
        ]}
        value={1}
      />
    </UI2aniContext>
  );
};

export default SelectPage;
