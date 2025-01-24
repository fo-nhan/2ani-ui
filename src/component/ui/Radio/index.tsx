import React, { createContext, useContext, ReactNode } from "react";
import styles from "./Radio.module.css";

interface RadioProps {
  value: string;
  children: ReactNode;
  color?: string;
  size?: number;
}

interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  color?: string;
}

interface RadioContextType {
  selectedValue: string;
  onChange?: (value: string) => void;
  color?: string;
}

const RadioContext = createContext<RadioContextType | null>(null);

const Radio: React.FC<RadioProps> & { Group: React.FC<RadioGroupProps> } = ({
  value,
  children,
  color,
  size = 20,
}) => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error("Radio must be used within a Radio.Group");
  }

  const { selectedValue, onChange, color: groupColor } = context;

  const handleChange = () => {
    onChange?.(value);
  };

  const radioColor = color || groupColor;

  return (
    <label
      className={styles.radioWrapper}
      style={{ "--radio-color": radioColor } as React.CSSProperties}
    >
      <input
        type="radio"
        className={styles.radioInput}
        checked={selectedValue === value}
        onChange={handleChange}
      />
      <span
        className={styles.radioControl}
        style={{ width: size, height: size }}
      ></span>
      <span className={styles.radioLabel}>{children}</span>
    </label>
  );
};

Radio.Group = ({ value, onChange, children, color }) => {
  return (
    <RadioContext.Provider
      value={{ selectedValue: value || "", onChange, color }}
    >
      <div>{children}</div>
    </RadioContext.Provider>
  );
};

export default Radio;
