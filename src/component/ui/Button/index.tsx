import React from "react";
import styles from "./Button.module.css";
import { TypeColorProps } from "../../type";
import { returnStyle } from "../../utils/style";
import { IconTypeMap } from "../../Icon/arrayType";
import Loading from "../Loading";
import Icon from "../../Icon";
import useAniState from "../../hooks/useAniState";

export type ButtonProps = {
  children?: React.ReactNode;
  theme?: TypeColorProps;
  size?: "auto" | "fw" | "big" | "small";
  className?: string;
  iconColor?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit";
  icon?: IconTypeMap;
  sizeIcon?: number;
} & React.HTMLAttributes<HTMLButtonElement>;

function Button({
  children,
  theme = "primary",
  size = "auto",
  className = "",
  loading = false,
  disabled,
  icon,
  iconColor,
  type = "button",
  sizeIcon,
  ...props
}: ButtonProps) {
  const { theme: themeGlobal } = useAniState();
  return (
    <button
      {...props}
      className={returnStyle(
        [
          "myButton",
          `${themeGlobal?.buttonClass?.[theme] || ""}`,
          `${themeGlobal?.buttonClass?.[theme] || ""}-hover`,
          size,
          className,
        ],
        styles
      )}
    >
      {loading ? (
        <Loading color="white" size={2} width={18} />
      ) : (
        <React.Fragment>
          {icon && <Icon size={sizeIcon} color={iconColor} type={icon} />}
          {children || ""}
        </React.Fragment>
      )}
    </button>
  );
}

export default Button;
