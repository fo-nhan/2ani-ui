import { ReactNode } from "react";
import { BoxTypeProps } from "../Box";

export interface Rule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  fsc?: (value: string | number | Date) => { error: boolean; message: string };
  message?: string;
}

export interface UseFormReturn<T> {
  getFieldsValue: () => Partial<T>;
  setFieldsValue: (values: Partial<T>) => void;
  resetFields: () => void;
  validateFields: () => Promise<boolean>;
  setFieldValue: (field: keyof T, value: any) => void;
  errors: Record<string, string>;
}

export interface FormItemProps {
  name: string;
  label?: string;
  children: ReactNode;
  propsBox?: BoxTypeProps;
}

export interface FormProps {
  form: any;
  onFinish: (values: any) => void;
  children: ReactNode;
}
