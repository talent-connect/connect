import React from 'react'
import { Form } from 'react-bulma-components'
import _uniqueId from 'lodash/uniqueId'

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
        <input
          id={uid}
          value={value}
          name={name}
          checked={checked}
          type="checkbox"
          className="is-checkradio is-checkradio--redi is-small"
          onChange={handleOnChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
        />
        <label htmlFor={uid}>
          {children}
        </label>
      </Form.Control>
    </Form.Field>
  )
}
export default FormCheckbox
