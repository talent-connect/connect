import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface FormTextAreaProps {
  name: string
  className: string
  label: string
  placeholder: string
  disabled?: boolean
  rows?: number
  minChar?: number;
  maxChar?: number;
  values: Record<string, string>;
  /** */
  handleChange?: ChangeEventHandler<HTMLInputElement>
  /** */
  handleBlur?: FocusEventHandler<HTMLInputElement>
  isSubmitting?: boolean;
  touched: boolean;
  errors: unknown;
}