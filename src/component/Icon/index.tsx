import React, { Fragment } from "react";
import { arrayIcon } from "./arrayIcon";
import { IconTypeProps } from "./arrayType";
import useAniState from "../hooks/useAniState";

const Icon = ({ type, size = 0, color = "", ...other }: IconTypeProps) => {
  const {theme} = useAniState()

  return (
    <Fragment>
      {React.Children.map(arrayIcon[type], (child: any, i) => {
        return React.cloneElement(child, {
          ...other,
          key: i,
          style: {
            height: size ? `${size}px` : "1rem",
            width: size ? `${size}px` : "1rem",
          },
          fill: `${
            color
              ? color
              : theme?.textColor || "#444444"
          }`,
        });
      })}
    </Fragment>
  );
};

export default Icon;
