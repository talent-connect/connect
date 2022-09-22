import React from 'react'
import Select from 'react-select'

import { DropdownIndicator } from './FormSelect'
import { formSelectStyles } from './FormSelect.styles'

const SelectDropdown = ({ selectedValue, options, setValue, placeholder }) => {
  return (
    <Select
      value={selectedValue}
      components={{ DropdownIndicator }}
      options={options}
      onChange={(selected) => setValue(selected.value)}
      placeholder={placeholder}
      styles={formSelectStyles}
      isSearchable={false}
    />
  )
}

export default SelectDropdown
