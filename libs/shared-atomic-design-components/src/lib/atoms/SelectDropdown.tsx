import Select from 'react-select'

import { DropdownIndicator } from './FormSelect'
import { formSelectStyles } from './FormSelect.styles'

interface OptionItem {
  value: string
  label: string
}

interface SelectDropdownProps {
  selectedValue: OptionItem
  options: OptionItem[]
  setValue: (selectedValue: string) => void
  placeholder: string
}

const SelectDropdown = ({
  selectedValue,
  options,
  setValue,
  placeholder,
}: SelectDropdownProps) => {
  return (
    <Select
      value={selectedValue}
      components={{ DropdownIndicator }}
      options={options}
      onChange={(selected: OptionItem) => setValue(selected.value)}
      placeholder={placeholder}
      styles={formSelectStyles}
      isSearchable={false}
    />
  )
}

export default SelectDropdown
