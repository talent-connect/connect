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
    setFieldTouched,
    isSubmitting,
    touched,
    errors,
    disabled
  } = props

  const onChange = (name: any, e: any) => {
    e.persist()
    setFieldTouched(name, true, false)
    handleChange(e)
  }

  const hasError = !!touched[name] && !!errors[name]

  return (
    <Form.Field>
      {label && <Form.Label size="small">
        {label}
      </Form.Label>}
      <Form.Control>
        <Form.Input
          id={name}
          name={name}
          type={type || 'text'}
          color={hasError ? 'danger' : null}
          placeholder={placeholder}
          value={values[name]}
          onChange={onChange.bind(null, name)}
          disabled={isSubmitting || disabled}
        />
      </Form.Control>

      <Form.Help color="danger" className={hasError ? 'help--show' : ''}>
        {hasError && (
          <>
          The {placeholder.toLowerCase()} is invalid
          </>
        )}
      </Form.Help>

    </Form.Field>
  )
}

export default FormInput
