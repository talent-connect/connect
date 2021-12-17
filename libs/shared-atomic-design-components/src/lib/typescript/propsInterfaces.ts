import { ChangeEventHandler, FocusEventHandler } from 'react'

export interface FormElementProps<E extends HTMLElement> {
  /** The `name` attribute specifies the name of an `<input>` element.  
   * It's used to reference elements in a JavaScript, or to reference form data after a form is submitted.  
   * 
   * **Note:** only form elements with a `name` attribute will have their values passed when submitting a form. 
   */
  name: string;
  /** The `value` attribute specifies the value of an `<input>` element.  
   * It defines the value associated with the input (this is also the value that is sent on submit)
   */
  value?: string;
  /** A disabled `<input>` element is unusable and un-clickable.  
   * The `disabled` attribute can be set to keep a user from using the `<input>` element until some other condition  
   * has been met. A value of `false` set for the `disabled` will and make the `<input>` element usable.  
   * 
   * **Tip:** disabled `<input>` elements in a form will not be submitted!
   */
  disabled?: boolean;
  /** ... */
  handleChange?: ChangeEventHandler<E>;
  /** ... */
  handleBlur?: FocusEventHandler<E>;
  /** ... */
  isSubmitting?: boolean;
}