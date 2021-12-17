import { FormElementProps } from '../../typescript/propsInterfaces';

export type CheckboxProps =
  FormElementProps<HTMLInputElement> & {
  /** */
  checked: boolean
}