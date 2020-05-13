import React, { useCallback } from 'react'
import { Form } from 'react-bulma-components'
import _uniqueId from 'lodash/uniqueId'

interface Props {
  name: string
  items: string[]
  placeholder?: string
  label?: string
  multiselect?: boolean
  disabled?: boolean
  customOnChange?: Function
}

function FormInput (props: any) {
  const {
    name,
    items,
    placeholder,
    label,
    customOnChange,
    values,
    handleChange,
    handleBlur,
    multiselect,
    isSubmitting,
    touched,
    errors,
    disabled
  } = props

  const handleOnChange = customOnChange || handleChange

  const hasError = !!touched[name] && !!errors[name]

  return (
    <Form.Field>
      {label && <Form.Label size="small">
        {label}
      </Form.Label>}

      <Form.Control>
        <Form.Select
          name={name}
          className="is-fullwidth"
          value={values[name]}
          multiple={multiselect}
          onChange={handleOnChange}
          onBlur={handleBlur}
          disabled={isSubmitting || disabled}
        >
          {<option id="" value="" disabled>
            {placeholder || ''}
          </option>}
          {items.map((item: any) => {
            const uid = _uniqueId('st_')
            return <option key={uid} id={uid} value={item.value} >
              {item.label}
            </option>
          })}
        </Form.Select>
      </Form.Control>

      <Form.Help color="danger" className={hasError ? 'help--show' : ''}>
        {hasError && <>{errors[name]}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default FormInput
