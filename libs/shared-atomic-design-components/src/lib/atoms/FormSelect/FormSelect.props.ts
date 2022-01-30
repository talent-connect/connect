import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface FormSelectProps<T extends string> {
  /** */
  name: string;
  /** */
  items: { value: string | number; label: string; }[];
  /** */
  placeholder?: string;
  /** */
  className?: string;
  /** */
  label: string;
  /** */
  values: Record<T, unknown>; // TODO: fix;
  /** */
  handleChange: ChangeEventHandler<HTMLInputElement>;
  /** */
  isSubmitting: boolean;
  /** */
  handleBlur: FocusEventHandler<HTMLInputElement>;
  /** */
  multiSelect?: boolean;
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