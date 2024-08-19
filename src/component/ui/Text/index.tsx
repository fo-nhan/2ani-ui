import React, { CSSProperties } from "react";
import styles from "./Text.module.css";
import { TypeColorProps } from "../../type";
import { returnStyle } from "../../utils/style";

export type TextProps = {
  children: React.ReactNode;
  color?: TypeColorProps | "auto";
  gradient?: boolean;
  cursor?:
    | "copy"
    | "auto"
    | "default"
    | "move"
    | "no-drop"
    | "text"
    | "pointer";
  decoration?:
    | "none"
    | "through"
    | "overline"
    | "wavy"
    | "underline"
    | "solid"
    | "link"
    | "auto";
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "auto";
  overflow?: "auto" | "ellipsis";
  align?: "auto" | "center" | "right";
  weight?:
    | "bold"
    | "italic"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "normal";
  format?: "normal" | "italic" | "inherit" | "initial";
  hover?: boolean;
  copy?: boolean;
  onHover?: (arg: any, visible: boolean) => void;
  onClick?: (arg: any) => void;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

const Text = ({
  children,
  color = "auto",
  gradient,
  cursor = "auto",
  decoration = "auto",
  size = "auto",
  overflow = "auto",
  format = "normal",
  align = "auto",
  weight = "normal",
  onClick,
  copy = false,
  onHover = () => {},
  className = "",
  hover = false,
  id = "",
  style = {},
}: TextProps) => {
  return (
    <span
      style={style}
      {...(id ? { id } : {})}
      className={returnStyle(
        [
          `UI-2ANI-text-${color}${gradient ? "-gradient" : ""}`,
          `decoration-${decoration}`,
          `cursor-${cursor}`,
          size,
          `overflow-${overflow}`,
          `format-${format}`,
          `weight-${weight}`,
          `text-align--${align}`,
          ...(hover ? [`hover`] : []),
          className,
        ],
        styles
      )}
      onMouseEnter={(e: any) => onHover(e, true)}
      onMouseLeave={(e: any) => onHover(e, false)}
      onClick={(e: any) => {
        if (onClick) {
          onClick(e);
        }
        if (copy) {
          navigator.clipboard.writeText(e.target.innerText);
        }
      }}
    >
      {children}
    </span>
  );
};

export default Text;
