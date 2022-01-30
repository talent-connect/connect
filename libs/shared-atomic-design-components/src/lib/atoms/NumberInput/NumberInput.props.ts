import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface NumberInputProps<T extends string> {
  /** */
  name: T;
  /** */
  placeholder?: string;
  /** */
  label?: string;
  /** */
  type?: 'email' | 'text' | 'password';
  /** */
  dirty: boolean;
  /** */
  values: Record<T, unknown>; // TODO: fix 
  /** */
  className?: string;
  /** */
  handleChange?: ChangeEventHandler<HTMLInputElement>
  /** */
  handleBlur?: FocusEventHandler<HTMLInputElement>
  /** */
  isSubmitting: boolean;
  /** */
  touched: Record<T, unknown>; // TODO: fix
  /** */
  errors: Record<T, unknown>; // TODO: fix
  /** */
  disabled?: boolean;
  /** */
  domRef?: (ref: HTMLInputElement) => void;
  /** */
  startAddon?: null;
}