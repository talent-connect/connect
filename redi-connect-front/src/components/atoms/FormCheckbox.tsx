import React from 'react'
import { Form } from 'react-bulma-components'

interface Props {
  name: string
  value: boolean
  handleChange: Function
  setFieldTouched: Function
  isSubmitting: boolean
  children: React.ReactNode
  className?: string
}

function FormCheckbox (props: Props) {
  const {
    name,
    value,
    handleChange,
    setFieldTouched,
    isSubmitting,
    className,
    children
  } = props

  const onChange = (name: any, e: any) => {
    e.persist()
    setFieldTouched(name, true, false)
    handleChange(e)
  }

  return (
    <Form.Field className={className}>
      <Form.Control>
        <input
          id={name}
          name={name}
          checked={value}
          type="checkbox"
          className="is-checkradio is-checkradio--redi is-small"
          onChange={onChange.bind(null, name)}
          disabled={isSubmitting}
        />
        <label htmlFor={name}>
          {children}
        </label>
      </Form.Control>
    </Form.Field>
  )
}
export default FormCheckbox
