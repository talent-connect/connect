import { FunctionComponent } from 'react';
import { Form } from 'react-bulma-components'
import DatePicker from 'react-datepicker'
import { Icon } from '../Icon'

import 'react-datepicker/dist/react-datepicker.css'
import './FormDatePicker.scss'
import { FormDatePickerProps } from './FormDatePicker.props';

interface PickerTriggerProps {
  value?: string
  onClick?: () => void
}

const PickerTrigger = (placeholder: string) => ({
  value,
  onClick,
}: PickerTriggerProps) => (
  <div className="datepicker-trigger" onClick={onClick}>
    <Form.Input id={value} value={value} placeholder={placeholder} />
    <Icon icon="calendar" className="datepicker-trigger__icon" size="medium" />
  </div>
)

const FormDatePicker: FunctionComponent<FormDatePickerProps> = ({
  name,
  placeholder,
  label,
  values,
  dateFormat,
  minDate,
  maxDate,
  showMonthDropdown,
  showYearDropdown,
  dropdownMode,
  isClearable,
  setFieldValue,
}) => {

  const changeHandler = (date: Date) => {
    setFieldValue(name, date)
  }

  const PickerTriggerWithPlaceholder = PickerTrigger(placeholder)

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control>
        <DatePicker
          selected={values[name]}
          customInput={<PickerTriggerWithPlaceholder />}
          dateFormat={dateFormat || 'dd.MM.yyyy'}
          minDate={minDate}
          maxDate={maxDate}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          dropdownMode={dropdownMode}
          isClearable={isClearable}
          onChange={changeHandler}
        />
      </Form.Control>
    </Form.Field>
  )
}

export default FormDatePicker
