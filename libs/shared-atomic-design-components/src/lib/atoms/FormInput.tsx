import React from 'react'
import classnames from 'classnames'
import { Form } from 'react-bulma-components'
import { get } from 'lodash'

interface Props {
  name: string
  placeholder: string
  label?: string
  type?: 'email' | 'text' | 'password'
}

function FormInput(props: any) {
  const {
    name,
    placeholder,
    type,
    label,
    dirty,
    values,
    handleChange,
    isSubmitting,
    handleBlur,
    touched,
    errors,
    disabled,
  } = props

  const hasError = !!touched[name] && !!errors[name]
  const isValidField = dirty && !!touched[name] && !errors[name]

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control className={classnames({ 'field-clean': isValidField })}>
        <Form.Input
          id={name}
          name={name}
          type={type || 'text'}
          color={hasError ? 'danger' : null}
          placeholder={placeholder}
          // use lodash's so we can access stuff like experience[0].title
          value={get(values, name)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
        />
      </Form.Control>

      <Form.Help
        color="danger"
        className={classnames({ 'help--show': hasError })}
      >
        {hasError && <>{errors[name]}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default FormInput
