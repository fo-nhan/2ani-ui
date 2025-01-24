import React from "react";
import { FormProvider } from "./useForm";
import { FormProps } from "./type";

const Form = ({ form, onFinish, children }: FormProps) => {
  const { validateFields, getFieldsValue } = form;

  function convertToNestedObject(input: Record<string, any>): any {
    const result: any = {};

    Object.entries(input).forEach(([key, value]) => {
      const keys = key.split(/[\[\].]+/).filter(Boolean);
      let current = result;

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          current[k] =
            value?.value ||
            value?.date ||
            (value?.target ? value?.target?.value || "" : value) ||
            null;
        } else {
          if (!current[k]) {
            current[k] = isNaN(Number(keys[index + 1])) ? {} : [];
          }
          current = current[k];
        }
      });
    });

    return result;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = await validateFields();

    if (isValid) {
      onFinish(convertToNestedObject(getFieldsValue()));
    }
  };

  return (
    <FormProvider value={form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
};

export default Form;
