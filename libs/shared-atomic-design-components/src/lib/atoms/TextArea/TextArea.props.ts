import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface TextAreaProps<T extends string> {
  /** */
  name: T
  /** */
  className?: string
  /** */
  label: string
  /** */
  placeholder?: string
  /** */
  disabled?: boolean
  /** */
  rows?: number
  /** */
  minChar?: number;
  /** */
  maxChar?: number;
  /** */
  values: Record<T, string>; // TODO: fix
  /** */
  handleChange?: ChangeEventHandler<HTMLInputElement>
  /** */
  handleBlur?: FocusEventHandler<HTMLInputElement>
  /** */
  isSubmitting?: boolean;
  /** */
  touched: Record<T, unknown>; // TODO: fix
  /** */
  errors: Record<T, unknown>; // TODO: fix
}