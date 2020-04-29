import React from 'react'
import { Form } from 'react-bulma-components'

interface Props {
  name: string
  type?: 'email' | 'text' | 'password'
  placeholder: string
  value: string
  handleChange: Function
  setFieldTouched: Function
  isSubmitting: boolean
  hasError: boolean
  disabled?: boolean
}

function FormInput (props: Props) {
  const {
    value,
    type,
    placeholder,
    name,
    handleChange,
    setFieldTouched,
    isSubmitting,
    hasError,
    disabled
  } = props

  const onChange = (name: any, e: any) => {
    e.persist()
    setFieldTouched(name, true, false)
    handleChange(e)
  }

  return (
    <Form.Field>
      <Form.Control>
        <Form.Input
          id={name}
          name={name}
          type={type || 'text'}
          color={hasError ? 'danger' : null}
          placeholder={placeholder}
          value={value}
          onChange={onChange.bind(null, name)}
          disabled={isSubmitting || disabled}
        />
      </Form.Control>
      {hasError && (
        <Form.Help color="danger">
          The {placeholder.toLowerCase()} is invalid
        </Form.Help>
      )}
    </Form.Field>
  )
}

export default FormInput
