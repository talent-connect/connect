import React from 'react'
import { Form } from 'react-bulma-components'

interface Props {
  name: string
  value: string
  checked: boolean
  children: React.ReactNode
  className?: string
  customOnChange?: Function
}

function FormCheckbox (props: any) {
  const {
    name,
    value,
    checked,
    handleChange,
    setFieldTouched,
    isSubmitting,
    className,
    children,
    customOnChange
  } = props

  const onChange = (e: any) => {
    e.persist()
    setFieldTouched(name, true, false)
    handleChange(e)
  }

  const handleOnChange = customOnChange || onChange

  return (
    <Form.Field className={className}>
      <Form.Control>
        <input
          id={name}
          value={value}
          name={name}
          checked={checked}
          type="checkbox"
          className="is-checkradio is-checkradio--redi is-small"
          onChange={handleOnChange}
          disabled={isSubmitting}
        />
        <label htmlFor={name}>
          {children}
        </label>
      </Form.Control>
    </Form.Field>
  )
}
export default FormCheckbox
