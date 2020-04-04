import React from "react";
import { Form } from "react-bulma-components";
import { useFormikContext } from "formik";

interface Props {
  name: String;
  type?: "email" | "text" | "password";
  placeholder: String;
  value: String;
  handleChange: Function;
  setFieldTouched: Function;
  isSubmitting: Boolean;
  hasError: Boolean;
}

function FormInput(props: Props) {
  const {
    value,
    type,
    placeholder,
    name,
    handleChange,
    setFieldTouched,
    isSubmitting,
    hasError,
  } = props;

  const onChange = (name: any, e: any) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  return (
    <Form.Field>
      <Form.Control>
        <Form.Input
          id={name}
          name={name}
          type={type ? type : "text"}
          color={hasError ? "danger" : null}
          placeholder={placeholder}
          value={value}
          onChange={onChange.bind(null, name)}
          disabled={isSubmitting}
        />
      </Form.Control>
      {hasError && (
        <Form.Help color="danger">
          The {placeholder.toLowerCase()} is invalid
        </Form.Help>
      )}
    </Form.Field>
  );
}

export default FormInput;
