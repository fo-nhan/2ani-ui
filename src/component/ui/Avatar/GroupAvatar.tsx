import React, { ReactNode, CSSProperties, useMemo } from "react";
import styles from "./Avatar.module.css";
import Avatar from ".";
import { returnStyle } from "../../utils/style";
type TypeProps = {
  max?: number;
  children: ReactNode[];
  style?: CSSProperties;
};
const GroupAvatar = ({ max = 2, children, style }: TypeProps) => {
  return (
    <div style={{ ...style }} className={returnStyle(["group"], styles)}>
      {React.Children.map(children, (child: any, i) => {
        if (i + 1 < max) {
          return (
            <div
              style={{ marginLeft: `-${i > 0 ? 8 : 0}px` }}
              className={returnStyle(["item"], styles)}
              key={i}
            >
              {React.cloneElement(child, {
                zIndex: children.length - i,
              })}
            </div>
          );
        }
      })}
      {children.length > max && (
        <div className={returnStyle(["item"], styles)}>
          <Avatar
            children={
              <div style={{ fontSize: "1rem" }}>
                +{children.length + 1 - max}
              </div>
            }
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default GroupAvatar;
