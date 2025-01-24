import React from "react";
import { useFormContext } from "./useForm";
import { FormItemProps } from "./type";
import Box from "../Box";

const FormItem = ({ name, label, children, propsBox = {} }: FormItemProps) => {
  const { setFieldValue, getFieldsValue, errors } = useFormContext();

  const value =
    getFieldsValue() && getFieldsValue()[name] !== undefined
      ? getFieldsValue()[name]
      : "";
  const error = errors && errors[name] ? errors[name] : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, e?.target?.value || e);
  };

  return (
    <Box flex="flexColumn" {...propsBox}>
      {label && <label>{label}</label>}
      {children &&
        React.cloneElement(children as React.ReactElement, {
          value: value?.value || value?.date || value || null,
          onChange: handleChange,
        })}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </Box>
  );
};

export default FormItem;
