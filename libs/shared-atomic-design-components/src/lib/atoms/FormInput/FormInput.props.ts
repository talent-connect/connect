import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface FormInputProps {
  /** */
  name: string;
  /** */
  placeholder: string;
  /** */
  label?: string;
  /** */
  type?: 'email' | 'text' | 'password';
  /** */
  dirty: boolean;
  /** */
  values: Record<string, string>;
  /** */
  className?: string;
  /** */
  handleChange?: ChangeEventHandler<HTMLInputElement>
  /** */
  handleBlur?: FocusEventHandler<HTMLInputElement>
  /** */
  isSubmitting: boolean;
  /** */
  touched: boolean;
  /** */
  errors: boolean;
  /** */
  disabled?: boolean;
  /** */
  domRef?: (ref: HTMLInputElement) => void;
  /** */
  startAddon?: null;
}