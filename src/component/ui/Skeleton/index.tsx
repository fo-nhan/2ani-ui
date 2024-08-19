import React, { CSSProperties } from "react";
import styles from "./Skeleton.module.css";
import { returnStyle } from "../../utils/style";
import useAniState from "../../hooks/useAniState";

export type SkeletonProps = {
  width?: string; //size in element
  height?: string; //size
  borderRadius?: number | string; //
  style?: CSSProperties;
  className?: string;
};

const Skeleton = ({
  width = "100%",
  height = "100%",
  borderRadius = 5,
  style,
  className = "",
}: SkeletonProps) => {
  const { theme } = useAniState();
  return (
    <div
      style={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        ...style,
      }}
      className={returnStyle([theme.skeletonClass, className], styles)}
    ></div>
  );
};

export default Skeleton;
