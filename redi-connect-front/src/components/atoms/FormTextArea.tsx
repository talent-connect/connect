import React from 'react'
import { Form } from 'react-bulma-components'

interface Props {
  name: string
  placeholder: string
  disabled?: boolean
  rows?: number
}

// the any is not the best solution here, I would need to use the props needed for
// the field and the formik values coming from the form context
function FormTextArea (props: any) {
  const {
    name,
    placeholder,
    rows,
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
    // setFieldTouched(name, true, false)
    handleChange(e)
  }

  const hasError = !!touched[name] && !!errors[name]

  return (
    <Form.Field>
      <Form.Control>
        <Form.Textarea
          id={name}
          name={name}
          color={hasError ? 'danger' : null}
          rows={rows}
          placeholder={placeholder}
          value={values[name]}
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

export default FormTextArea
