type RuleProps = {
  message: string;
  rule: any;
  checked?: boolean;
};

export type TypeFormRequieProps = {
  message?: React.ReactNode | string;
  regex?: RuleProps;
  notNull?: boolean;
  maxLength?: RuleProps;
  minLength?: RuleProps;
  maxNumber?: RuleProps;
  minNumber?: RuleProps;
  noMessage?: boolean;
  function?: (args: any) => {
    checked?: boolean
    message?: string
  }
};

export type TypeFormProps = {
  values?: {
    [key: string | number]: any;
  };
  requires?: {
    [key: string | number]: TypeFormRequieProps;
  };
  defaultConfig?: TypeFormProps
};

export type TypeUseFormProps = {
  setFieldValues: (values: { [key: string | number]: any }) => void;
  setFieldValue: (name: string | number, value: any) => void;
  setRequire: (name: string | number, value: any) => void;
  form: TypeFormProps;
  setForm: (arg?: TypeFormProps) => void;
  reset: (arg?: TypeFormProps) => void;
  ref: any
  defaultConfig: TypeFormProps
};

export default {};
