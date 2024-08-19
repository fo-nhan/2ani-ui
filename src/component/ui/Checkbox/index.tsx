import React from "react";
import styles from "./Checkbox.module.css";
import { TypeColorProps } from "../../type";
import { returnStyle } from "../../utils/style";

type TypeProps = {
  type?: TypeColorProps;
  name?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: Function;
  value?: any;
  onClick?: Function;
  disabled?: boolean;
};

const Checkbox = ({
  type = "primary",
  name = "",
  children,
  checked = false,
  onChange,
  onClick,
  value,
  disabled = false,
}: TypeProps) => {
  const [change, setChange] = React.useState(false);
  React.useEffect(() => {
    setChange(checked);
    if (onChange) {
      onChange(checked, value);
    }
  }, [checked]);
  const onHandleChange = (e: any) => {
    setChange(!change);
    if (onClick) {
      onClick(!change, value, e);
    }
    if (onChange) {
      onChange(!change, value, e);
    }
  };
  return (
    <div
      className={returnStyle(["container", disabled ? "disabled" : ""], styles)}
    >
      <input
        name={name}
        className={returnStyle(["input"], styles)}
        type="checkbox"
        checked={change}
        onChange={onHandleChange}
        disabled={disabled}
        value={value}
      />
      <label
        className={returnStyle(
          ["label", type, disabled ? "disabled" : ""],
          styles
        )}
      >
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
