import React, { createContext, useContext } from "react";
import styles from "./Checkbox.module.css";
import { TypeColorProps } from "../../type";
import { returnStyle } from "../../utils/style";

type TypeProps = {
  type?: TypeColorProps;
  name?: string;
  children?: React.ReactNode;
  checked?: boolean;
  onChange?: (
    checked: boolean,
    value: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  value?: any;
  onClick?: (
    checked: boolean,
    value: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  disabled?: boolean;
};

type GroupContextType = {
  values: any[];
  onChange: (value: any, checked: boolean) => void;
};

const GroupContext = createContext<GroupContextType | null>(null);

const Checkbox = ({
  type = "primary",
  name = "",
  children,
  checked,
  onChange,
  onClick,
  value,
  disabled = false,
}: TypeProps) => {
  const groupContext = useContext(GroupContext);
  const [internalChecked, setInternalChecked] = React.useState(checked);

  React.useEffect(() => {
    if (groupContext) {
      setInternalChecked(groupContext.values.includes(value));
    } else {
      setInternalChecked(checked);
    }
  }, [checked, groupContext, value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setInternalChecked(newChecked);

    if (groupContext) {
      groupContext.onChange(value, newChecked);
    }

    if (onChange) {
      onChange(newChecked, value, e);
    }

    if (onClick) {
      onClick(newChecked, value, e);
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
        checked={internalChecked}
        onChange={handleChange}
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

type GroupProps = {
  children: React.ReactNode;
  value?: any[];
  onChange?: (values: any[]) => void;
};

const Group: React.FC<GroupProps> = ({
  children,
  value = [],
  onChange = () => {},
}) => {
  const handleChange = (changedValue: any, checked: boolean) => {
    const newValues = checked
      ? [...value, changedValue]
      : value.filter((v) => v !== changedValue);
    onChange(newValues);
  };

  return (
    <GroupContext.Provider value={{ values: value, onChange: handleChange }}>
      {children}
    </GroupContext.Provider>
  );
};

Checkbox.Group = Group;

export default Checkbox;
