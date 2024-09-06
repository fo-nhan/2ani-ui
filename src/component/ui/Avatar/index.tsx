import React, { ReactNode, CSSProperties } from "react";
import styles from "./Avatar.module.css";
import { TypeColorProps } from "../../type";
import { returnStyle } from "../../utils/style";
import View from "../View";
import useAniState from "../../hooks/useAniState";
type TypeProps = {
  src?: string;
  type?: "circle" | "variant";
  size?: "tiny" | "small" | "medium" | "large" | "big" | "bigLarge" | "titan";
  children?: ReactNode;
  color?: TypeColorProps | "auto";
  status?: "on" | "of" | "busy" | "time" | "none";
  time?: string;
  style?: CSSProperties;
  className?: any;
  zIndex?: number;
  onClick?: Function;
};
const Avatar = ({
  src,
  type = "circle",
  size = "large",
  children = "A",
  color = "auto",
  status = "none",
  time = "",
  style = {},
  className,
  zIndex,
  onClick = () => {},
  ...props
}: TypeProps) => {
  const { theme } = useAniState();
  const getStyle = React.useMemo(() => {
    return {
      ...style,
      // background: src ? `url(${src})` : "auto",
      zIndex: zIndex ?? 0,
    };
  }, [style, src, zIndex]);

  const MemoAvatar = React.useMemo(
    () => (
      <>
        {src ? (
          <View onClick={onClick} className={styles.avatar} src={src || ""} />
        ) : (
          children
        )}

        {time && (size === "big" || size === "large") ? (
          <span
            className={returnStyle(["time", theme?.boxShadowClass], styles)}
          >
            {time}
          </span>
        ) : (
          <div
            className={returnStyle(
              [
                "status",
                `${status !== "time" ? status : ""}`,
                theme?.boxShadowClass,
              ],
              styles
            )}
          ></div>
        )}
      </>
    ),
    [src, children, time, status, theme]
  );
  return (
    <div
      style={getStyle}
      className={returnStyle(
        [
          "content",
          `${type}`,
          `${size}`,
          `text-${color}`,
          color === "auto" ? theme?.textColorClass || "" : "",
        ],
        styles
      )}
      {...props}
    >
      {MemoAvatar}
    </div>
  );
};

export default Avatar;
