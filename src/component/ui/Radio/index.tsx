import React, { useEffect } from "react";
import styles from "./Radio.module.css";
import { returnStyle } from "../../utils/style";

type TypeProps = {
  children?: React.ReactNode;
  checked?: boolean;
  name?: string;
  value?: any;
  onChange?: Function;
  onClick?: Function;
  hover?: boolean;
};

const Radio = ({
  children,
  checked = false,
  name = "",
  value,
  onChange,
  onClick,
  hover = false,
}: TypeProps) => {
  const [change, setChange] = React.useState(false);
  useEffect(() => {
    setChange(checked);
    if (onChange) {
      onChange(!change, value);
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
      onClick={onHandleChange}
      className={returnStyle(["container"], styles)}
    >
      <input
        type="radio"
        name={name}
        id="two"
        className={returnStyle(["input"], styles)}
        checked={change}
        value={value}
        onChange={onHandleChange}
      />
      {children && (
        <label className={returnStyle(["label", hover && "hover"], styles)}>
          {children}
        </label>
      )}
    </div>
  );
};

export default Radio;
