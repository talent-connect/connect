import classnames from 'classnames'
import { Form } from 'react-bulma-components'
import { get } from 'lodash'
import { TextInputProps } from './TextInput.props';


function TextInput<T extends string> ({
  name,
  placeholder,
  label,
  dirty,
  values,
  handleChange,
  isSubmitting,
  handleBlur,
  touched,
  errors,
  disabled,
  domRef,
  type = 'text',
  startAddon = null,
}: TextInputProps<T>) {

  const hasError = !!get(touched, name) && !!get(errors, name)
  const isValidField = dirty && !!get(touched, name) && !get(errors, name)

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      {startAddon}
      <Form.Control className={classnames({ 'field-clean': isValidField })}>
        <Form.Input
          id={name}
          name={name}
          type={type}
          color={hasError && 'danger'}
          placeholder={placeholder}
          // use lodash's so we can access stuff like experience[0].title
          value={get(values, name)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
          domRef={domRef}
        />
      </Form.Control>

      <Form.Help
        color="danger"
        className={classnames({ 'help--show': hasError })}
      >
        {hasError && <>{get(errors, name)}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default TextInput
