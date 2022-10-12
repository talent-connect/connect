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

  const minCharAmountReached =
    minChar && values[name] && charactersLength >= minChar

  const isTouched = !!get(touched, name)

  const hasError = isTouched && !minCharAmountReached && !!get(errors, name)

  const defineTextAreaOutlineColor = () => {
    if (minCharAmountReached) return 'success'

    if (hasError) return 'danger'

    return null
  }

  const textAreaOutlineColor = defineTextAreaOutlineColor()

  return (
    <Form.Field className={classnames({ [`${className}`]: className })}>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control className={minCharAmountReached ? 'textarea-clean' : ''}>
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
          {minChar && !isTouched && !values[name] && charactersLength === 0 && (
            <Content
              textColor="grey-dark"
              className="help help--show redi-textarea-characters"
            >
              min {minChar} characters required
            </Content>
          )}

          {minChar &&
            !isTouched &&
            values[name] &&
            charactersLength < minChar &&
            !minCharAmountReached && (
              <Content
                textColor="grey-dark"
                className="help help--show redi-textarea-characters"
              >
                {minChar - (values[name] ? charactersLength : 0)} more{' '}
                {minChar - (values[name] ? charactersLength : 0) > 1
                  ? 'characters'
                  : 'character'}{' '}
                required
              </Content>
            )}

          {minChar &&
            isTouched &&
            (!values[name] || charactersLength < minChar) && (
              <Content
                textColor="danger"
                className="help help--show redi-textarea-characters"
              >
                {minChar - (values[name] ? charactersLength : 0)} more{' '}
                {minChar - (values[name] ? charactersLength : 0) > 1
                  ? 'characters'
                  : 'character'}{' '}
                required
              </Content>
            )}

          {maxChar &&
            (!values[name] || charactersLength <= maxChar) &&
            (!minChar || (minChar && minCharAmountReached)) && (
              <Content
                textColor="grey-dark"
                className="help help--show redi-textarea-characters"
              >
                {maxChar - (values[name] ? charactersLength : 0)}{' '}
                {maxChar - (values[name] ? charactersLength : 0) !== 1
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
