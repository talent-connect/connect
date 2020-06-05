import React from 'react'
import { Form } from 'react-bulma-components'

interface Props {
  name: string
  placeholder: string
  label?: string
  type?: 'email' | 'text' | 'password'
}

function FormInput (props: any) {
  const {
    name,
    placeholder,
    type,
    label,
    values,
    handleChange,
    isSubmitting,
    handleBlur,
    touched,
    errors,
    disabled
  } = props

  const hasError = !!touched[name] && !!errors[name]
  const isValidField = touched[name] && !errors[name]

  return (
    <Form.Field>
      {label && <Form.Label size="small">
        {label}
      </Form.Label>}
      <Form.Control className={isValidField && 'field-clean'}>
        <Form.Input
          id={name}
          name={name}
          type={type || 'text'}
          color={hasError ? 'danger' : null}
          placeholder={placeholder}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
        />
      </Form.Control>

      <Form.Help color="danger" className={hasError ? 'help--show' : ''}>
        {hasError && <>{errors[name]}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default FormInput
