import React from "react";
import Text from "../Text";
import styles from "./style.module.css";
import Box, { BoxTypeProps } from "../Box";

type TypeProps = {
  children: React.ReactNode | React.ReactNode;
  name?: string;
  label?: string | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  parentProps?: BoxTypeProps;
};

const FormItem = ({
  children,
  label,
  name,
  style = {},
  className = "",
  id = "",
  parentProps = {},
  ...props
}: TypeProps) => {
  const {
    form: { form },
    nomessage,
  } = props as any;

  const textContent = (elem: React.ReactElement | string): string => {
    try {
      if (!elem) {
        return "";
      }
      if (typeof elem === "string") {
        return elem;
      }
      const children = elem.props && elem.props.children;
      if (children instanceof Array) {
        return children.map(textContent).join("");
      }
      return textContent(children);
    } catch (error) {
      return "";
    }
  };

  const returnRequire = React.useMemo(() => {
    let text: any = "";
    if (name) {
      const requireProps = form?.requires?.[name];

      if (!requireProps) {
        return (
          <Text
            style={{ minHeight: 14 }}
            format="italic"
            color="secondary"
            weight="400"
            size="h7"
          >
            {text}
          </Text>
        );
      }

      if (requireProps.message) {
        text = requireProps.message;
      }

      // MaxLength

      if (requireProps.maxLength && requireProps.maxLength.checked) {
        text = requireProps.maxLength.message || "";
      }
      // MinLength
      if (requireProps.minLength && requireProps.minLength.checked) {
        text = requireProps.minLength.message || "";
      }

      // MaxNumber
      if (requireProps.maxNumber && requireProps.maxNumber.checked) {
        text = requireProps.maxNumber.message || "";
      }
      // MinNumber
      if (requireProps.minNumber && requireProps.minNumber.checked) {
        text = requireProps.minNumber.message || "";
      }

      if (requireProps.regex && requireProps.regex.checked) {
        text = requireProps.regex.message || "";
      }

      if (requireProps.notNull && requireProps.message) {
        text = requireProps.message;
      }

      if (requireProps.noMessage || nomessage) {
        text = "";
      }
    }

    if (text) {
      const element = textContent((label || name) as any);

      text = text.replaceAll("#name", element || "");
    }

    return text;
  }, [name, form, label]);

  return (
    <Box
      {...parentProps}
      className={`${styles.item} ${returnRequire ? styles.require : ""} ${className}`}
    >
      {label && <Text>{label}</Text>}
      {React.Children.map(children, (child: any, i) => {
        return React.cloneElement(child, {
          key: i,
          ...props,

          ...(name
            ? {
                name,
                value:
                  name &&
                  form &&
                  form.values &&
                  // typeof form.values?.[name] === "object"
                  form.values?.[name]
                    ? form.values?.[name]
                    : "",
              }
            : {}),
        });
      })}
      {name && (
        <Text
          style={{ minHeight: 16 }}
          color="secondary"
          weight="400"
          size="h6"
        >
          {returnRequire}
        </Text>
      )}
    </Box>
  );
};

export default FormItem;
