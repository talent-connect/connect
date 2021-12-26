import classnames from 'classnames'
import { Form, Content, Columns } from 'react-bulma-components'
import './TextArea.scss'
import { get } from 'lodash'
import { FC } from 'react';
import { TextAreaProps } from './TextArea.props';

// the any is not the best solution here, I would need to use the props needed for
// the field and the formik values coming from the form context
const TextArea: FC<TextAreaProps> = ({
  name,
  className,
  label,
  placeholder,
  rows,
  minChar,
  maxChar,
  values,
  handleChange,
  handleBlur,
  isSubmitting,
  touched,
  errors,
  disabled,
}) => {

  const hasError = !!get(touched, name) && !!get(errors, name)

  return (
    <Form.Field className={classnames({ [`${className}`]: className })}>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control>
        <Form.Textarea
          id={name}
          name={name}
          color={hasError ? 'danger' : null}
          rows={rows}
          placeholder={placeholder}
          value={get(values, name)}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
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
              {minChar - (values[name] ? values[name].length : 0)} more{' '}
              {minChar - (values[name] ? values[name].length : 0) > 1
                ? 'characters'
                : 'character'}{' '}
              needed
            </Content>
          )}
          {maxChar &&
            (!values[name] || values[name].length <= maxChar) &&
            (!minChar ||
              (minChar && values[name] && values[name].length >= minChar)) && (
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
          {maxChar && values[name] && values[name].length > maxChar && (
            <Content
              textColor="danger"
              className="help help--show redi-textarea-characters"
            >
              {values[name].length - maxChar}{' '}
              {values[name].length - maxChar > 1 ? 'characters' : 'character'}{' '}
              over
            </Content>
          )}
        </Columns.Column>
      </Columns>
    </Form.Field>
  )
}

export default TextArea
