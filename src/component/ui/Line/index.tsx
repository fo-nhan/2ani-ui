import React from "react";
import styles from "./Line.module.css";
import { TypeColorProps } from "../../type";
import { returnStyle } from "../../utils/style";

type TypeProps = {
  height?: number;
  width?: string;
  color?: TypeColorProps | "auto";
  bottom?: number;
  top?: number;
  minWidth?: string;
  maxWidth?: string;
};

const index = ({
  color = "default",
  height = 1,
  width = "100%",
  bottom = 0,
  top = 0,
  minWidth = "auto",
  maxWidth = "auto",
}: TypeProps) => {
  return (
    <div
      style={{
        width: width,
        height: `${height / 10}px`,
        minHeight: `${height / 10}px`,
        marginTop: top,
        marginBottom: bottom,
        minWidth,
        maxWidth,
      }}
      className={returnStyle([`UI-2ANI-${color}`], styles)}
    ></div>
  );
};

export default index;
