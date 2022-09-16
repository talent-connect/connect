import React from 'react'
import Select from 'react-select'
import { DropdownIndicator } from './FormSelect'
import { styles } from './styles'

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
      styles={styles}
      isSearchable={false}
    />
  )
}

export default SelectDropdown
