import React from "react";
import { SlideTypeProps } from "../component/ui/Slide";
import { Slide as SlidePage } from "../component";

const Slide = (props: SlideTypeProps) => {
  return (
    <div style={{ width: "800px" }}>
      <SlidePage {...props} />
    </div>
  );
};

export default Slide;
