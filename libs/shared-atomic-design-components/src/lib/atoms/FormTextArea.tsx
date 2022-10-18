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
    maxLength,
  } = props

  const charactersLength = values[name]?.length || 0

  const isMinCharAmountReached =
    minChar && values[name] && charactersLength >= minChar

  const isTouched = !!get(touched, name)

  const hasError = isTouched && !isMinCharAmountReached && !!get(errors, name)

  const numberOfCharsRequiredToMinAmount =
    minChar - (values[name] ? charactersLength : 0)

  const numberOfCharsAllowedToMaxAmount =
    maxChar - (values[name] ? charactersLength : 0)

  const isFieldFresh = !isTouched && !values[name] && charactersLength === 0

  const isSelectedAndBelowMinCharAmount =
    !isTouched &&
    values[name] &&
    charactersLength < minChar &&
    !isMinCharAmountReached

  const wasVisitedAndBelowMinCharAmount =
    isTouched && (!values[name] || charactersLength < minChar)

  const isAboveMinCharAmount =
    (!values[name] || charactersLength <= maxChar) &&
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
            className={hasError && !maxChar && !minChar ? 'help--show' : ''}
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

          {maxChar && isAboveMinCharAmount && (
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
