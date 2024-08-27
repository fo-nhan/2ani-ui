import React from "react";
import { Box, Collapse as CollapsePage, UI2aniContext } from "../component";
import { CollapseTypeProps } from "../component/ui/Collapse";
import "../component/styles/config.css";

const Collapse = (props: CollapseTypeProps) => {
  return (
    <UI2aniContext
      style={{
        width: "100%",
        background: "white",
        minHeight: "200px",
      }}
    >
      <Box width={400}>
        <CollapsePage {...props} />
      </Box>
    </UI2aniContext>
  );
};

export default Collapse;
