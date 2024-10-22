import React, { HTMLAttributes } from "react";
import styles from "./Input.module.css";
import { IconTypeMap } from "../../Icon/arrayType";
import Icon from "../../Icon";
import { returnStyle } from "../../utils/style";
import useAniState from "../../hooks/useAniState";

type TypeProps = HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  style?: React.CSSProperties;
  styleParent?: React.CSSProperties;
  onChange?: Function;
  onPaste?: Function;
  onCut?: Function;
  onEvent?: Function;
  onBack?: Function;
  onkeyDown?: (e: any) => void;
  onkeyUp?: Function;
  maxLength?: number;
  focus?: boolean;
  setFocus?: Function;
  boxShadow?: boolean;
  defaultValue?: string;
  className?: string;
  classNameParent?: string;
  borderRadius?: number | string;
  maxWidth?: number | string;
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
  row?: number;
  type?: "text" | "button" | "area" | "password" | "number";
  disabled?: boolean;
  align?: "center" | "right" | "left";
  number?: boolean;
  icon?: IconTypeMap | "";
  sizeIcon?: number;
  unit?: string;
  fullWidth?: boolean;
  passwordView?: boolean;
  placeholder?: string;
  [key: string]: any;
};

const Input = ({
  style = {},
  styleParent = {},
  onChange = () => {},
  onPaste = () => {},
  onCut = () => {},
  onkeyDown = () => {},
  onkeyUp = () => {},
  onEvent = () => {},
  onBack = () => {},
  maxLength = 10000,
  defaultValue = "",
  focus,
  setFocus = () => {},
  boxShadow = false,
  borderRadius = 5,
  className = "",
  classNameParent = "",
  type = "text",
  maxWidth = "100%",
  row = 4,
  weight = "500",
  disabled = false,
  align = "left",
  number = false,
  fullWidth = false,
  icon = "",
  unit = "",
  sizeIcon = 24,
  passwordView = false,
  placeholder = "",
  ...props
}: TypeProps) => {
  const { theme } = useAniState();
  const ref = React.useRef(props?.ref);
  const { name, form, value, ...newProps } = props;

  const [values, setValue] = React.useState("");
  const [view, setView] = React.useState(false);

  const isNumber = (value: any) => {
    if (isNaN(Number(value))) {
      return false;
    }
    return typeof Number(value) === "number";
  };

  const onHandPaste = (e: any) => {
    e.preventDefault();
    try {
      if (number) {
        if (!isNumber(e.target.value)) {
          return;
        }
      }
      const clipboardData = e.clipboardData;

      setValue(clipboardData.getData("Text"));
      e.value = clipboardData.getData("Text");
      onChange(e);
      onPaste(e);
    } catch (error) {}
  };
  const onHandCut = (e: any) => {
    onChange(e);
    onCut(e);
  };
  const onHandChange = (e: any) => {
    if (number) {
      if (!isNumber(e.target.value)) {
        return;
      }
    }
    e.value = e.target.value;
    onChange(e);

    setValue(e.target.value);
    if (form && form.setfieldvalue && name) {
      form.setfieldvalue(name, e.target.value);
    }
  };
  const onHandKeyUp = (e: any) => {
    if ((e.shiftKey && e.keyCode === 13) || disabled) {
      return null;
    } else {
      switch (e.keyCode) {
        case 13:
          onEvent(e);
          break;
        case 8:
          onBack(e);
          if (
            name &&
            form &&
            form.setrequire &&
            form.form &&
            form.form.requires &&
            form.form.requires[name]
          ) {
            if (
              e?.target?.value?.trim()?.length < 1 &&
              form.form.requires[name].notNull
            ) {
              form.setrequire(name, { message: "Dữ liệu không thể để trống" });
            }
          }
          break;
        default:
          onkeyUp(e);
      }

      if (name && form.setrequire) {
        if (e?.target?.value?.trim()?.length > 0) {
          form.setrequire(name, { message: null });
        }
      }
    }
  };

  React.useEffect(() => {
    if (focus && ref.current) {
      ref.current.focus();
      setFocus(false);
    }
  }, [focus, ref.current]);

  React.useEffect(() => {
    setValue(value || defaultValue);
  }, [value, defaultValue]);

  return (
    <div
      style={{ ...styleParent }}
      className={`${styles.parent} ${classNameParent} ${
        fullWidth && "width-100"
      }`}
    >
      {icon && (
        <div className={styles.icon}>
          <Icon color="rgba(119, 126, 144, 1)" size={sizeIcon} type={icon} />
        </div>
      )}

      {passwordView && type === "password" ? (
        <div onClick={() => setView(!view)} className={styles.pass}>
          <Icon
            color="rgba(119, 126, 144, 1)"
            size={sizeIcon}
            type={view ? "eye-hidden" : "eye-view"}
          />
        </div>
      ) : (
        ""
      )}

      {type === "area" ? (
        <textarea
          ref={ref}
          onChange={onHandChange}
          onCut={onHandCut}
          onPaste={onHandPaste}
          style={{
            background: theme.backgroundColor,
            color: theme.textColor,
            ...style,
            borderRadius: borderRadius,
            fontWeight: weight,
            maxWidth: maxWidth,
            textAlign: align,
            padding: `8px 16px 8px ${icon ? 48 : 16}px`,
          }}
          placeholder={placeholder}
          autoFocus={focus}
          maxLength={maxLength}
          onKeyUp={onHandKeyUp}
          onKeyDown={onkeyDown}
          className={returnStyle(
            [!boxShadow && "no-boxShadow", "container", "textArea", className],
            styles
          )}
          rows={row}
          disabled={disabled}
          {...{ ...newProps, name, value: values }}
        ></textarea>
      ) : (
        <input
          disabled={disabled}
          ref={ref}
          onChange={onHandChange}
          onCut={onHandCut}
          onPaste={onHandPaste}
          onKeyUp={onHandKeyUp}
          onKeyDown={onkeyDown}
          style={{
            background: theme.backgroundColor,
            color: theme.textColor,
            ...style,
            borderRadius: borderRadius,
            fontWeight: weight,
            maxWidth: maxWidth,
            textAlign: align,
            padding: `8px ${unit ? 32 : 16}px 8px ${icon ? 48 : 16}px`,
          }}
          placeholder={placeholder}
          autoFocus={focus}
          maxLength={maxLength}
          type={view ? "text" : type}
          className={returnStyle(
            [!boxShadow && "no-boxShadow", "container", className],
            styles
          )}
          {...{ ...newProps, name, value: values }}
        />
      )}
      {unit && <div className={styles.unit}>{unit}</div>}
    </div>
  );
};

export default Input;
