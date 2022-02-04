import { FC } from 'react';
import classnames from 'classnames'
import { Form } from 'react-bulma-components'
import { get } from 'lodash'
import { NumberInputProps } from './NumberInput.props';


const NumberInput: FC<NumberInputProps<string>> = ({
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
  startAddon = null,
}) => {

  const hasError = !!get(touched, name) && !!get(errors, name)
  const isValidField = dirty && !!get(touched, name) && !get(errors, name)

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      {startAddon}
      <Form.Control className={classnames({ 'field-clean': isValidField })}>
        <Form.Input
          type='number'
          id={name}
          name={name}
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

export default NumberInput
