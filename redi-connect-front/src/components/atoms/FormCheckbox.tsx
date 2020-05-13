import React from 'react'
import { Form, Element } from 'react-bulma-components'
import _uniqueId from 'lodash/uniqueId'
import './FormCheckbox.scss'

interface Props {
  name: string
  value: string
  checked: boolean
  children: React.ReactNode
  disabled: boolean
  className?: string
  customOnChange?: Function
}

function FormCheckbox (props: any) {
  const {
    name,
    value,
    checked,
    disabled,
    handleChange,
    handleBlur,
    isSubmitting,
    className,
    children,
    customOnChange
  } = props

  const handleOnChange = customOnChange || handleChange
  const uid = _uniqueId('cx_')

  return (
    <Form.Field className={className}>
      <Form.Control>
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
          textSize={6}
          htmlFor={uid}
          className="redi-checkbox-label">
          {children}
        </Element>
      </Form.Control>
    </Form.Field>
  )
}
export default FormCheckbox
