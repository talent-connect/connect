import React from 'react'
import _uniqueId from 'lodash/uniqueId'
import { Form, Element } from 'react-bulma-components'
import './Checkbox.scss'

interface Props {
  name: string
  value: string
  checked: boolean
  children: React.ReactNode
  disabled: boolean
  className?: string
  customOnChange?: Function
}

// introduce proper types at some point
function Checkbox (props: any) {
  const {
    name,
    value,
    checked,
    disabled,
    handleChange,
    handleBlur,
    isSubmitting,
    children,
    customOnChange
  } = props

  const handleOnChange = customOnChange ?? handleChange
  const uid = _uniqueId('cx_')

  return <>
    <Element
      renderAs="input"
      type="checkbox"
      className="redi-checkbox"
      id={uid}
      value={value}
      name={name}
      checked={checked}
      onChange={handleOnChange}
      onBlur={handleBlur}
      disabled={isSubmitting || disabled}
    />
    <Element
      renderAs="label"
      textSize={5}
      htmlFor={uid}
      className="redi-checkbox-label">
      {children}
    </Element>
  </>
}

Checkbox.Form = (props: any) => (
  <Form.Field className={props.className}>
    <Form.Control>
      <Checkbox { ...props}/>
    </Form.Control>
  </Form.Field>
)

export default Checkbox
