import React from 'react'
import classnames from 'classnames'
import { Form, Content, Columns } from 'react-bulma-components'

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
    maxChar,
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

      <Columns>
        <Columns.Column>
          <Form.Help color="danger" className={hasError && (!values[name] || !maxChar || values[name].length <= maxChar) ? 'help--show' : ''}>
            {hasError && <>{errors[name]}</>}
          </Form.Help>
        </Columns.Column>
        <Columns.Column>
          {maxChar && (!values[name] || values[name].length <= maxChar) && <Content textColor="grey-dark" style={ { textAlign: 'right' } }>
            {maxChar - (values[name] ? values[name].length : 0)} characters left
          </Content>}
          {maxChar && values[name] && values[name].length > maxChar && <Content textColor="danger" style={ { textAlign: 'right' } }>
            {values[name].length - maxChar} characters over
          </Content>}
        </Columns.Column>
      </Columns>

    </Form.Field>
  )
}

export default FormTextArea
