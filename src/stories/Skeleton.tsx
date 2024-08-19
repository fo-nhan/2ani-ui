import React from "react";
import { UI2aniContext, Skeleton as SkeletonDemo } from "../component";
import { SkeletonProps } from "../component/ui/Skeleton";

const Skeleton = (props: SkeletonProps) => {
  return (
    <UI2aniContext
      style={{ minHeight: "100px", width: "100%", background: "white" }}
    >
      <SkeletonDemo {...props} />
    </UI2aniContext>
  );
};

export default Skeleton;
