import React from 'react'
import { Form } from 'react-bulma-components'
import _uniqueId from 'lodash/uniqueId'
import Select from 'react-select'

interface Props {
  name: string
  items: string[]
  placeholder?: string
  label?: string
  multiselect?: boolean
  disabled?: boolean
  customOnChange?: Function
}

function FormInput (props: any) {
  const {
    name,
    items,
    placeholder,
    label,
    customOnChange,
    values,
    setFieldTouched,
    handleBlur,
    multiselect,
    isSubmitting,
    setFieldValue,
    touched,
    errors,
    disabled
  } = props

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      heihg: '40px',
      padding: '13px',
      color: state.isSelected ? 'black' : '',
      backgroundColor: state.isSelected ? '#dadada' : '',
      '&:hover': {
        color: 'black',
        backgroundColor: '#dadada'
      }
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#ea5b29' : '#a0a0a0',
      transform: state.menuIsOpen ? 'rotate(180deg)' : 'none'
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#ea5b29' : '#a0a0a0',
      minHeight: '48px',
      boxShadow: 'inset 0 2px 6px rgba(178, 180, 181, 0.3)',
      '&:hover': {
        borderColor: state.isFocused ? '#ea5b29' : '#f6b9a2'
      }
    }),
    multiValue: (provided: any) => ({
      ...provided,
      color: '#ea5b29',
      borderRadius: '4px',
      backgroundColor: '#fad7ca'
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      fontSize: 'inherit',
      color: '#ea5b29'
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontStyle: 'italic',
      color: '#a0a0a0'
    })
  }

  const handleOnChangeDefault = (option: any = []) => {
    setFieldValue(
      name,
      multiselect
        ? option ? option.map((item: any) => item.value) : []
        : option.value,
      true
    )
    setFieldTouched(name, true, false)
  }

  const handleOnBlur = (e: any) => {
    e.target.name = name
    handleBlur(e)
  }

  const hasError = !!touched[name] && !!errors[name]
  const handleOnChange = customOnChange || handleOnChangeDefault

  const selectedValues =
    multiselect
      ? values[name].map((selValue: any) => items.filter((availItem: any) => availItem.value === selValue)).flat()
      : items.find((item: any) => item.value === values[name])

  return (
    <Form.Field>
      {label && <Form.Label size="small">
        {label}
      </Form.Label>}
      <Form.Control>
        <Select
          value={selectedValues}
          options={items}
          onChange={handleOnChange}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          isDisabled={isSubmitting || disabled}
          isMulti={multiselect}
          styles={customStyles}
        />
      </Form.Control>
      <Form.Help color="danger" className={hasError ? 'help--show' : ''}>
        {hasError && <>{errors[name]}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default FormInput
