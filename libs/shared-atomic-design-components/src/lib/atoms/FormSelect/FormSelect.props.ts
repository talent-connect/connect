import { ChangeEventHandler, FocusEventHandler } from 'react';

type StringOrNumber = string | number;

export interface FormSelectProps<T extends string, M extends boolean> {
  /** */
  name: T;
  /** */
  items: { value: StringOrNumber; label: string; }[];
  /** */
  placeholder?: string;
  /** */
  className?: string;
  /** */
  label?: string;
  /** */
  multiSelect?: M;
  /** */
  values: Record<T, M extends true ? StringOrNumber[] : StringOrNumber>; // TODO: fix;
  /** */
  handleChange: ChangeEventHandler<HTMLInputElement>;
  /** */
  isSubmitting: boolean;
  /** */
  handleBlur: FocusEventHandler<HTMLInputElement>;
  /** */
  setFieldTouched: (name: string, value: boolean, x: boolean) => void; // TODO: signature
  /** */
  setFieldValue: (name: string, value: boolean, x: boolean) => void ;  // TODO: signature
  /** */
  touched: Record<T, unknown>; // TODO: fix;
  /** */
  errors: Record<T, unknown>; // TODO: fix;
  /** */
  disabled?: boolean;
}