import { Meta } from '@storybook/react/types-6-0'
import { storybookTemplate } from '../helpers/StorybookTemplate'

import { addYears, subYears } from 'date-fns'
import FormDatePickerComponent from './FormDatePicker'
import 'bulma/css/bulma.min.css'
import 'react-datepicker/dist/react-datepicker.css'

export default {
  title: 'Atoms/Formdatepicker',
  component: FormDatePickerComponent,
} as Meta

const template = storybookTemplate(FormDatePickerComponent)

let datePickerValue = new Date()

export const Formdatepicker = template({
  label: 'Date of birth',
  name: 'birthDate',
  placeholder: 'Add your date of birth',
  dateFormat: 'dd MMMM yyyy',
  setFieldValue: (name: string, value: Date) => {
    datePickerValue = value
  },
  values: {
    birthDate: datePickerValue,
  },
  minDate: subYears(new Date(), 20),
  maxDate: addYears(new Date(), 10),
  showMonthDropdown: true,
  showYearDropdown: true,
  dropdownMode: 'select',
  isClearable: true,
})
