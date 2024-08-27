import React, { ReactNode } from "react";
import styles from "./Loading.module.css";
import { returnStyle } from "../../utils/style";

export type TypeLoading = {
  color?: "primary" | "danger" | "white" | "default";
  children?: ReactNode;
  size?: number;
  width?: number;
  type?: "cicrle" | "wave";
};

const Loading = ({
  color = "primary",
  children,
  size = 2,
  width = 35,
  type = "cicrle",
}: TypeLoading) => {
  return (
    <>
      {type === "wave" && (
        <div className={styles.wave}>
          <div
            style={{
              width: `${Math.round(width / 2)}px`,
              height: `${Math.round(width / 2)}px`,
            }}
            className={returnStyle(["dot", `wave-${color}`], styles)}
          ></div>
          <div
            style={{
              width: `${Math.round(width / 2)}px`,
              height: `${Math.round(width / 2)}px`,
            }}
            className={returnStyle(["dot", `wave-${color}`], styles)}
          ></div>
          <div
            style={{
              width: `${Math.round(width / 2)}px`,
              height: `${Math.round(width / 2)}px`,
            }}
            className={returnStyle(["dot", `wave-${color}`], styles)}
          ></div>
        </div>
      )}
      {type === "cicrle" && (
        <div
          style={{
            width: `${width * Math.sqrt(2)}px`,
            height: `${width * Math.sqrt(2)}px`,
          }}
          className={returnStyle(["container"], styles)}
        >
          <div
            style={{
              width: `${width}px`,
              height: `${width}px`,
              borderWidth: `${size}px`,
            }}
            className={returnStyle(["loading", color], styles)}
          ></div>
          <div style={{ position: "absolute" }}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Loading;
