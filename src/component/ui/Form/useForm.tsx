import { createContext, useContext, useState, useCallback } from "react";
import { Rule, UseFormReturn } from "./type";

// Tạo context để truyền form
const FormContext = createContext<any>(null);

function useForm<T>(rules: Record<keyof T | string, Rule[]>): UseFormReturn<T> {
  const [values, setValues] = useState<Partial<T>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getFieldsValue = useCallback(() => values, [values]);

  const setFieldsValue = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetFields = useCallback(() => {
    setValues({});
    setErrors({});
  }, []);

  const validateField = useCallback(
    (field: keyof T) => {
      const value =
        (values[field] as any) ||
        (values[field] as any)?.date ||
        ((values[field] as any)?.target
          ? (values[field] as any)?.target?.value || ""
          : values[field]);
      const fieldRules = rules[field];
      if (!fieldRules) return true;

      let errorMessage = "";

      for (const rule of fieldRules) {
        if (rule.required && !value) {
          errorMessage = rule.message || "This field is required";
          break;
        }

        if (
          rule.minLength &&
          typeof value === "string" &&
          value.length < rule.minLength
        ) {
          errorMessage = rule.message || `Minimum length is ${rule.minLength}`;
          break;
        }

        if (
          rule.maxLength &&
          typeof value === "string" &&
          value.length > rule.maxLength
        ) {
          errorMessage = rule.message || `Maximum length is ${rule.maxLength}`;
          break;
        }

        if (rule.pattern && value && !rule.pattern.test(value as any)) {
          errorMessage = rule.message || "Invalid format";
          break;
        }

        if (rule.fsc) {
          const result = rule.fsc(value);
          if (result.error) {
            errorMessage = result.message || "Invalid format";
            break;
          }
        }
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessage,
      }));

      return !errorMessage;
    },
    [values, rules]
  );

  const validateFields = useCallback(async () => {
    const validationResults = await Promise.all(
      Object.keys(rules).map(async (key) => {
        const field = key as keyof T;
        return validateField(field);
      })
    );
    return validationResults.every((result) => result);
  }, [rules, validateField]);

  return {
    getFieldsValue,
    setFieldsValue,
    resetFields,
    validateFields,
    setFieldValue,
    errors,
  };
}

export const FormProvider = FormContext.Provider;

export const useFormContext = () => useContext(FormContext);

export default useForm;
