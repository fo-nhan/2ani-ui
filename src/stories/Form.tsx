import React from "react";
import { useForm, Form, Input, FormItem, Text } from "../component";
import CodeView from "./CodeView";

const FormPage = () => {
  return (
    <div>
      <Text weight="600" size="h3">
        Form & useForm
      </Text>
      <br />
      <br />
      <CodeView
        code={`
    const formHook = useForm({
    defaultConfig: {
      values: {
        name: "Any",
      },
      requires: {
        name: {
          function: (args) => {
            if (!args) {
              return { checked: true, message: "Không để trống" };
            }

            return {};
          },
        },
      },
    },
  });
  return (
    <div>
      <Form form={formHook} onFinish={(values, validate) => {}}>
        <FormItem name="name" label="Họ tên">
          <Input />
        </FormItem>
      </Form>
    </div>
  );
  `}
      />
    </div>
  );
};

export default FormPage;
