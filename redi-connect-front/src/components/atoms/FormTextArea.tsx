import React from 'react'
import classnames from 'classnames'
import { Form } from 'react-bulma-components'

interface Props {
  name: string
  className: string
  label: string
  placeholder: string
  disabled?: boolean
  rows?: number
}

// the any is not the best solution here, I would need to use the props needed for
// the field and the formik values coming from the form context
function FormTextArea (props: any) {
  const {
    name,
    className,
    label,
    placeholder,
    rows,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    touched,
    errors,
    disabled
  } = props

  const hasError = !!touched[name] && !!errors[name]

  return (
    <Form.Field className={classnames({ [`${className}`]: className })}>
      {label && <Form.Label size="small">
        {label}
      </Form.Label>}
      <Form.Control>
        <Form.Textarea
          id={name}
          name={name}
          color={hasError ? 'danger' : null}
          rows={rows}
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

export default FormTextArea
