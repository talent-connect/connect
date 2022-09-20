import React from 'react'
import Select from 'react-select'
import { DropdownIndicator } from './FormSelect'
import { formSelectStyles } from './FormSelect.styles'

const SelectDropdown = ({
  activeFilterValue,
  applicationStatuses,
  setActiveFilter,
  placeholder,
}) => {
  return (
    <Select
      value={activeFilterValue}
      components={{ DropdownIndicator }}
      options={applicationStatuses}
      onChange={(selected) => setActiveFilter(selected.value)}
      placeholder={placeholder}
      styles={formSelectStyles}
      isSearchable={false}
    />
  )
}

export default SelectDropdown
