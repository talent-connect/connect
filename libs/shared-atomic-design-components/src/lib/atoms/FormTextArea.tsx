import React from 'react'
import classnames from 'classnames'
import { Form, Content, Columns } from 'react-bulma-components'
import './FormTextArea.scss'
import { get } from 'lodash'

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
function FormTextArea(props: any) {
  const {
    name,
    className,
    label,
    placeholder,
    minChar,
    maxChar,
    rows,
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    touched,
    errors,
    disabled,
    maxlength,
  } = props

  const hasError = !!get(touched, name) && !!get(errors, name)

  const minCharAmountReached =
    minChar && values[name] && values[name].length >= minChar

  return (
    <Form.Field className={classnames({ [`${className}`]: className })}>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control>
        <Form.Textarea
          id={name}
          name={name}
          color={hasError || !minCharAmountReached ? 'danger' : 'success'}
          rows={rows}
          placeholder={placeholder}
          value={get(values, name)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
          maxlength={maxlength}
        />
      </Form.Control>

      <Columns>
        <Columns.Column>
          <Form.Help
            color="danger"
            className={hasError && !maxChar && !minChar ? 'help--show' : ''}
          >
            {hasError && <>{get(errors, name)}</>}
          </Form.Help>
        </Columns.Column>
        <Columns.Column>
          {minChar && (!values[name] || values[name].length < minChar) && (
            <Content
              textColor="danger"
              className="help help--show redi-textarea-characters"
            >
              {minChar - (values[name] ? values[name].length : 0)}/{maxChar}{' '}
              characters
            </Content>
          )}
          {maxChar &&
            (!values[name] || values[name].length <= maxChar) &&
            (!minChar || minCharAmountReached) && (
              <Content
                textColor="grey-dark"
                className="help help--show redi-textarea-characters"
              >
                {maxChar - (values[name] ? values[name].length : 0)}{' '}
                {maxChar - (values[name] ? values[name].length : 0) !== 1
                  ? 'characters'
                  : 'character'}{' '}
                left
              </Content>
            )}
        </Columns.Column>
      </Columns>
    </Form.Field>
  )
}

export default FormTextArea
