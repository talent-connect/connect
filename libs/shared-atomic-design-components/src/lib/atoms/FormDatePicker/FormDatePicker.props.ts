export interface FormDatePickerProps {
  /** */
  name: string
  /** */
  placeholder: string
  /** */
  label?: string
  /** */
  values?: any
  /** */
  dateFormat?: string
  /** */
  minDate?: Date
  /** */
  maxDate?: Date
  /** */
  showMonthDropdown?: boolean
  /** */
  showYearDropdown?: boolean
  /** */
  dropdownMode?: 'scroll' | 'select'
  /** */
  isClearable?: boolean
  /** */
  setFieldValue: (name: string, date: Date) => void
}