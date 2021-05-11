import React from 'react'
import { Form } from 'react-bulma-components'
import DatePicker from 'react-datepicker'
import { Icon } from '../../components/atoms'

import 'react-datepicker/dist/react-datepicker.css'
import './FormDatePicker.scss'

interface PickerTriggerProps {
  value?: string
  onClick?: () => void
}

const PickerTrigger = ({ value, onClick }: PickerTriggerProps) => (
  <div className="datepicker-trigger" onClick={onClick}>
    <Form.Input
      id={value}
      value={value}
    />
    <Icon
      icon="calendar"
      className="datepicker-trigger__icon"
      size="medium"
    />
  </div>
)

interface FormDatePickerProps {
  name: string
  placeholder: string
  label: string
  values?: any
  dateFormat?: string
  minDate?: Date
  maxDate?: Date
  // openToDate?: Date
  showMonthDropdown?: boolean
  showYearDropdown?: boolean
  dropdownMode?: "scroll" | "select"
  setFieldValue: (name: string, date: Date) => void
}

const FormDatePicker = (props: FormDatePickerProps) => {
  const {
    name,
    placeholder,
    label,
    values,
    dateFormat,
    minDate,
    maxDate,
    // openToDate,
    showMonthDropdown,
    showYearDropdown,
    dropdownMode,
    setFieldValue
  } = props

  const changeHandler = (date: Date) => {
    setFieldValue(name, date);
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
          dateFormat={dateFormat || "dd.MM.yyyy"}
          minDate={minDate}
          maxDate={maxDate}
          // openToDate={openToDate}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          dropdownMode={dropdownMode}
          onChange={changeHandler}
        />
      </Form.Control>
    </Form.Field>
  )
}

export default FormDatePicker
