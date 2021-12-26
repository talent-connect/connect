import { FC } from 'react';
import { CheckboxProps } from './Checkbox.props';
import _uniqueId from 'lodash/uniqueId'
import { Form } from 'react-bulma-components'
import './Checkbox.scss'

const Checkbox: FC<CheckboxProps> & { Form: FC<CheckboxProps & { className: string;}> } = ({
  name,
  value,
  checked,
  disabled,
  handleChange,
  handleBlur,
  isSubmitting,
  children
}) => {

  const uid = _uniqueId('cx_')

  return (
    <>
      <input
        type="checkbox"
        className="redi-checkbox"
        id={uid}
        value={value}
        name={name}
        checked={checked}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting || disabled}
      />
      <label
        // textSize={5}
        htmlFor={uid}
        className="redi-checkbox__label"
      >
        {children}
      </label>
    </>
  )
}

Checkbox.Form = (props) => (
  <Form.Field className={props.className}>
    <Form.Control>
      <Checkbox {...props} />
    </Form.Control>
  </Form.Field>
)

export default Checkbox
