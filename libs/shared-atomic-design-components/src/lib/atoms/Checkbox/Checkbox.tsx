import React, { FocusEventHandler, MouseEventHandler } from 'react'
import _uniqueId from 'lodash/uniqueId'
import { Form } from 'react-bulma-components'
import './Checkbox.scss'

interface Props {
  /** */
  name: string
  /** */
  value?: string
  /** */
  checked: boolean
  /** */
  children?: React.ReactNode
  /** */
  disabled?: boolean
  /** */
  handleChange?: MouseEventHandler<HTMLInputElement>
  /** */
  handleBlur?: FocusEventHandler<HTMLInputElement>
  /** */
  isSubmitting?: boolean
  /** */
  customOnChange?: MouseEventHandler<HTMLInputElement>
}

/** ## Checkbox */
function Checkbox(props: Props) {
  const {
    name,
    value,
    checked,
    disabled,
    handleChange,
    handleBlur,
    isSubmitting,
    children,
    customOnChange,
  } = props

  const handleOnChange: MouseEventHandler<HTMLInputElement> = customOnChange ?? handleChange
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
        onClick={handleOnChange}
        onBlur={handleBlur}
        disabled={isSubmitting || disabled}
      />
      <label
        // textSize={5}
        htmlFor={uid}
        className="redi-checkbox-label"
      >
        {children}
      </label>
    </>
  )
}

Checkbox.Form = (props: any) => (
  <Form.Field className={props.className}>
    <Form.Control>
      <Checkbox {...props} />
    </Form.Control>
  </Form.Field>
)

export default Checkbox
