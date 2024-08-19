import React from "react";
import styles from "./Button.module.css";
import { TypeColorProps } from "../../type";
import { returnStyle } from "../../utils/style";

export type ButtonProps = {
  children: React.ReactNode;
  theme?: TypeColorProps;
  size?: "auto" | "fw" | "big" | "small";
  className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  theme = "primary",
  size = "auto",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={returnStyle(
        [
          "myButton",
          `UI-2ANI-${theme}`,
          `UI-2ANI-${theme}-hover`,
          size,
          className,
        ],
        styles
      )}
    >
      {children}
    </button>
  );
}

export default Button;
