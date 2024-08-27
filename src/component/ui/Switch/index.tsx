import React from "react";
import styles from "./Switch.module.css";
import { returnStyle } from "../../utils/style";

type TypeProps = {
  size?: number;
  defaultChecked?: boolean;
  onChange?: (arg: any) => void;
};

const Switch = ({
  size = 50,
  defaultChecked = false,
  onChange = () => {},
}: TypeProps) => {
  const [value, setValue] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    setValue(defaultChecked);
  }, [defaultChecked]);
  const onHandleChecked = (e: any) => {
    setValue(e.target.checked);
    onChange(e.target.checked);
  };
  return (
    <label
      style={{
        height: `${size * 0.56}px`,
        width: `${size}px`,
      }}
      className={styles.switch}
    >
      <input
        onChange={(e: any) => onHandleChecked(e)}
        className={styles.__input}
        type="checkbox"
        checked={value ?? false}
      />
      <span
        style={{
          borderRadius: `${size * 0.56}px`,
        }}
        className={returnStyle(["slider", "round"], styles)}
      ></span>
    </label>
  );
};

export default Switch;
