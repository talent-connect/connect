import { get } from 'lodash'
import { Form, Content, Columns } from 'react-bulma-components'
import classnames from 'classnames'
import { useFormik } from 'formik'
import './FormTextArea.scss'

interface FormTextAreaProps {
  name: string
  className?: string
  label?: string
  placeholder?: string
  minChar?: number
  rows?: number
  maxLength?: number
  disabled?: boolean
  formik: ReturnType<typeof useFormik>
}

// This component by itself handles validation messages under the text area

function FormTextArea(props: FormTextAreaProps) {
  const {
    name,
    className,
    label,
    placeholder,
    minChar,
    rows,
    maxLength,
    disabled,
    formik: { values, handleChange, handleBlur, isSubmitting, touched, errors },
  } = props

  const charactersLength = values[name]?.length || 0

  const isMinCharAmountReached =
    minChar && values[name] && charactersLength >= minChar

  const isTouched = !!get(touched, name)

  const hasError = isTouched && !isMinCharAmountReached && !!get(errors, name)

  const numberOfCharsRequiredToMinAmount =
    minChar - (values[name] ? charactersLength : 0)

  const numberOfCharsAllowedToMaxAmount =
    maxLength - (values[name] ? charactersLength : 0)

  const isFieldFresh = !isTouched && !values[name] && charactersLength === 0

  const isSelectedAndBelowMinCharAmount =
    !isTouched &&
    values[name] &&
    charactersLength < minChar &&
    !isMinCharAmountReached

  const wasVisitedAndBelowMinCharAmount =
    isTouched && (!values[name] || charactersLength < minChar)

  const isAboveMinCharAmount =
    (!values[name] || charactersLength <= maxLength) &&
    (!minChar || (minChar && isMinCharAmountReached))

  const defineTextAreaOutlineColor = () => {
    if (isMinCharAmountReached) return 'success'

    if (hasError) return 'danger'

    return null
  }

  const textAreaOutlineColor = defineTextAreaOutlineColor()

  return (
    <Form.Field className={classnames({ [`${className}`]: className })}>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control className={isMinCharAmountReached ? 'textarea-clean' : ''}>
        <Form.Textarea
          id={name}
          name={name}
          color={textAreaOutlineColor}
          rows={rows}
          placeholder={placeholder}
          value={get(values, name)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
          maxLength={maxLength}
        />
      </Form.Control>

      <Columns>
        <Columns.Column>
          <Form.Help
            color="danger"
            className={hasError && !maxLength && !minChar ? 'help--show' : ''}
          >
            {hasError && <>{get(errors, name)}</>}
          </Form.Help>
        </Columns.Column>
        <Columns.Column>
          {minChar && isFieldFresh && (
            <Content
              textColor="grey-dark"
              className="help help--show redi-textarea-characters"
            >
              min {minChar} characters required
            </Content>
          )}

          {minChar && isSelectedAndBelowMinCharAmount && (
            <Content
              textColor="grey-dark"
              className="help help--show redi-textarea-characters"
            >
              {numberOfCharsRequiredToMinAmount} more{' '}
              {numberOfCharsRequiredToMinAmount > 1
                ? 'characters'
                : 'character'}{' '}
              required
            </Content>
          )}
          {minChar && wasVisitedAndBelowMinCharAmount && (
            <Content
              textColor="danger"
              className="help help--show redi-textarea-characters"
            >
              {numberOfCharsRequiredToMinAmount} more{' '}
              {numberOfCharsRequiredToMinAmount > 1
                ? 'characters'
                : 'character'}{' '}
              required
            </Content>
          )}

          {maxLength && isAboveMinCharAmount && (
            <Content
              textColor="grey-dark"
              className="help help--show redi-textarea-characters"
            >
              {numberOfCharsAllowedToMaxAmount}{' '}
              {numberOfCharsAllowedToMaxAmount !== 1
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
