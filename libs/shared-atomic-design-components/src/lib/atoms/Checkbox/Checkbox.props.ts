import { ReactNode } from 'react';
import { FormElementProps } from '../../typescript/propsInterfaces';

export interface CheckboxProps extends FormElementProps<HTMLInputElement> {
  /** ... */
  checked: boolean
  children: ReactNode
}