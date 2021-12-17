import { ReactNode } from 'react'
import { FormElementProps } from '../../typescript/propsInterfaces';

export interface CheckboxProps extends FormElementProps {
  /** */
  checked: boolean
  /** */
  children?: ReactNode
}