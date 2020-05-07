import React from 'react'
import { Form } from 'react-bulma-components'

interface Props {
  name: string
  checked: boolean
  handleChange: Function
  setFieldTouched: Function
  isSubmitting: boolean
  children: React.ReactNode
  value?: string
  className?: string
  customOnChange?: Function
}

function FormCheckbox (props: Props) {
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

  const onChange = (name: any, e: any) => {
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
          onChange={handleOnChange.bind(null, name)}
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
