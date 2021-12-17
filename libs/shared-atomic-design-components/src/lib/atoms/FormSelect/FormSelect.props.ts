import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface FormSelectProps {
  name: string;
  items: { value: string; }[];
  placeholder: string;
  className: string;
  label: string;
  customOnChange: ChangeEventHandler<HTMLInputElement>;
  values: { value: string; }[];
  handleChange: ChangeEventHandler<HTMLInputElement>;
  isSubmitting: boolean;
  handleBlur: FocusEventHandler<HTMLInputElement>;
  multiSelect: boolean;
  setFieldTouched: (name: string, value: boolean, x: boolean) => void; // TODO: signature
  setFieldValue: (name: string, value: boolean, x: boolean) => void ;  // TODO: signature
  touched: boolean;
  errors: unknown;
  disabled: boolean;
}