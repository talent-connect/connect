import React from 'react'
import { Form } from 'react-bulma-components'
import DatePicker from 'react-datepicker'
import { Icon } from '../../components/atoms'

import 'react-datepicker/dist/react-datepicker.css'
import './FormDatePicker.scss'

interface Props {
  name: string
  placeholder: string
  label?: string
  type?: 'email' | 'text' | 'password'
}

const PickerTrigger = ({ value, onClick }: any) => (
  <div className="datepicker-trigger" onClick={onClick}>
    <Form.Input
      id={value}
      value={value}
    />
    <Icon
      icon="calendar"
      className="datepicker-trigger__icon"
      size="medium" />
  </div>
)

function FormDatePicker (props: any) {
  const {
    name,
    placeholder,
    label,
    values,
    setFieldValue
  } = props

  const changeHandler = (date: any) => {
    setFieldValue(name, date)
  }

  return (
    <Form.Field>
      {label && <Form.Label size="small">
        {label}
      </Form.Label>}
      <Form.Control>
        <DatePicker
          selected={values[name]}
          customInput={<PickerTrigger />}
          placeholderText={placeholder}
          dateFormat="dd.MM.yyyy"
          onChange={changeHandler}
        />
      </Form.Control>
    </Form.Field>
  )
}

export default FormDatePicker
