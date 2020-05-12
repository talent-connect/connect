import React, { useCallback } from 'react'
import { Form } from 'react-bulma-components'
import _uniqueId from 'lodash/uniqueId'

interface Props {
  name: string
  items: string[]
  placeholder: string
  label?: string
  multiselect?: boolean
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
    setFieldTouched,
    multiselect,
    isSubmitting,
    touched,
    errors,
    disabled
  } = props

  const onChange = useCallback((event: any) => {
    event.persist()
    setFieldTouched(event.target.name, true, false)
    handleChange(event)
  }, [])

  const handleOnChange = customOnChange || onChange

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
        >
          {placeholder && <option id="" value="" disabled>
            {placeholder}
          </option>}
          {items.map((item: any) => {
            const uid = _uniqueId('st_')
            return <option key={uid} id={uid} value={item.value} >
              {item.label}
            </option>
          })}
        </Form.Select>
      </Form.Control>

      <Form.Help color="danger" className={hasError ? 'help--show' : null}>
        {hasError && `The ${placeholder.toLowerCase()} is invalid`}
      </Form.Help>
    </Form.Field>
  )
}

export default FormInput
