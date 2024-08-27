import React from "react";
import { TypeFormProps, TypeFormRequieProps, TypeUseFormProps } from "./type";

type TypeProps = {
  defaultConfig?: TypeFormProps;
};

const useForm = ({ defaultConfig }: TypeProps) => {
  const ref = React.useRef<any>();

  const [form, setForm] = React.useState<TypeFormProps>({
    values: defaultConfig?.values || {},
    requires: defaultConfig?.requires || {},
  });

  const onChangeDatas = (values: { [key: string | number]: any }) => {
    setForm({
      ...form,
      values: {
        ...values,
      },
    });
  };

  const onChangeData = (name: string | number, value: any) => {
    setForm({
      ...form,
      values: {
        ...form.values,
        [name]: value,
      },
    });
  };

  const onChangeRequires = (
    name: string | number,
    value: TypeFormRequieProps
  ) => {
    setForm({
      ...form,
      requires: {
        ...form.requires,
        [name]: {
          ...(form?.requires?.[name] ? form.requires[name] : {}),
          ...value,
        },
      },
    });
  };

  const onChangeReset = (initDefaultConfig?: TypeFormProps) => {
    if (initDefaultConfig) setForm(initDefaultConfig);

    let requires : any = defaultConfig?.requires || {};

    Object.keys(requires).forEach((value) => {
      requires[value].message = null;

      if (requires[value].maxNumber)
        requires[value].maxNumber = {
          ...requires[value].maxNumber,
          checked: false,
        };

      if (requires[value].maxLength)
        requires[value].maxLength = {
          ...requires[value].maxLength,
          checked: false,
        };

      if (requires[value].minLength)
        requires[value].minLength = {
          ...requires[value].minLength,
          checked: false,
        };

      if (requires[value].minNumber)
        requires[value].minNumber = {
          ...requires[value].minNumber,
          checked: false,
        };

      if (requires[value].regex)
        requires[value].regex = {
          ...requires[value].regex,
          checked: false,
        };
    });
    setForm(
      initDefaultConfig || {
        values: defaultConfig?.values || {},
        requires: requires,
      }
    );
  };

  React.useEffect(() => {
      onChangeReset?.()
  }, [])

  return {
    setFieldValues: onChangeDatas,
    setFieldValue: onChangeData,
    setRequire: onChangeRequires,
    form: form,
    ref: ref,
    setForm: setForm,
    reset: onChangeReset,
    defaultConfig: defaultConfig,
  } as TypeUseFormProps;
};

export default useForm;
