import React from "react";
import { TypeFormProps, TypeFormRequieProps, TypeUseFormProps } from "./type";

type TypeProps = {
  children: React.ReactNode;
  form?: TypeUseFormProps;
  onFinish?: (
    values: any,
    validateFields?: {
      validate?: boolean;
      requires?: {
        [key: string | number]: TypeFormRequieProps;
      };
      defaultConfig?: TypeFormProps;
    }
  ) => void;
  enter?: boolean;
  noMessage?: boolean;
} & React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

const Form = ({
  children,
  form,
  onFinish = () => {},
  enter,
  noMessage,
  ...props
}: TypeProps) => {
  const handleSubmit = (e: any, submit?: boolean) => {
    try {
      e.preventDefault();
      const newName = !submit && e.target.name ? e.target.name : null;

      let formData: any = {};
      Object.keys(form?.ref.current.elements).forEach((key) => {
        let element = form?.ref.current.elements[key];
        if (element.name) {
          switch (element.type) {
            case "checkbox":
              if (element.checked) {
                formData[element.name] = [
                  ...(formData[element.name] ? formData[element.name] : []),
                  element.value,
                ];
              }
              break;

            case "radio":
              if (element.checked) {
                formData[element.name] = element.value;
              }
              break;

            case "submit":
              break;

            default:
              formData[element.name] = element.value;
              break;
          }
        }
      });

      let newRequires: {
        [key: string | number]: TypeFormRequieProps;
      } = form?.form?.requires || {};

      let checked = false;

      Object.keys(formData).forEach((key) => {
        try {
          if (!newName || (newName && newName === key)) {
            let require = form?.form?.requires?.[key];
            if (require && !checked) {
              const value = formData[key];
              if (require.function && submit) {
                const returnFsc = require.function(formData);
                require.message = returnFsc.checked
                  ? returnFsc.message || null
                  : null;
                checked = returnFsc.checked || false;
              }

              if (require.maxLength && require.maxLength.rule) {
                if (String(value).length > require.maxLength.rule) {
                  require.maxLength.checked = true;
                  checked = true;
                } else {
                  require.maxLength.checked = false;
                }
              }

              if (require.minLength && require.minLength.rule) {
                if (String(value).length < require.minLength.rule) {
                  require.minLength.checked = true;
                  checked = true;
                } else {
                  require.minLength.checked = false;
                }
              }

              if (require.maxNumber && require.maxNumber.rule) {
                if (Number(value) > require.maxNumber.rule) {
                  require.maxNumber.checked = true;
                  checked = true;
                } else {
                  require.maxNumber.checked = false;
                }
              }

              if (require.minNumber && require.minNumber.rule) {
                if (Number(value) < require.minNumber.rule) {
                  require.minNumber.checked = true;
                  checked = true;
                } else {
                  require.minNumber.checked = false;
                }
              }

              if (require.regex && require.regex.rule) {
                if (require.regex.rule.test(value)) {
                  require.regex.checked = true;
                  checked = true;
                } else {
                  require.regex.checked = false;
                }
              }

              if (require.notNull) {
                if (value?.length < 1) {
                  require.message = "Cannot be left blank field #name";
                  checked = true;
                }
              }

              newRequires[key] = require;
            }
          }
        } catch (error) {
          console.log(error);
        }
      });

      try {
      } catch (error) {
        console.log(error);
      }

      form?.setForm?.({
        values: formData,
        requires: newRequires,
        defaultConfig: form?.defaultConfig,
      });

      if (submit) {
        onFinish?.(formData, {
          requires: newRequires,
          validate: checked,
          defaultConfig: form?.defaultConfig,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onkeydown = (e: any) => {
    if (e && (e.keyCode === 13 || e.key === "Enter")) {
      if (!enter) {
        e.preventDefault();
        return false;
      }
    }
  };

  return (
    <form
      {...props}
      onChange={handleSubmit}
      onKeyDown={onkeydown}
      ref={form?.ref}
      onSubmit={(e) => handleSubmit(e, true)}
    >
      {React.Children.map(children, (child: any, i) => {
        return React.cloneElement(child, {
          key: i,
          nomessage: noMessage,
          form: form
            ? {
                setfieldvalues: form.setFieldValues,
                setfieldvalue: form.setFieldValue,
                setrequire: form.setRequire,
                form: form.form,
                setform: form.setForm,
              }
            : {},
        });
      })}
    </form>
  );
};

export default Form;
