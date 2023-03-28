import { useFormik } from 'formik'
import { get } from 'lodash'
import { Form } from 'react-bulma-components'
import Select, { components } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { Icon } from '../atoms'

import { formSelectStyles } from './FormSelect.styles'

export const DropdownIndicator = (props: any) => (
  <components.DropdownIndicator {...props}>
    <Icon icon="chevron" size="small" />
  </components.DropdownIndicator>
)

const ClearIndicator = (props: any) => (
  <components.ClearIndicator {...props}>
    <Icon icon="cancel" size="small" />
  </components.ClearIndicator>
)

const MultiValueRemove = (props: any) => (
  <components.MultiValueRemove {...props}>
    <Icon icon="cancel" size="small" />
  </components.MultiValueRemove>
)

interface FormSelectOption {
  value: string | number
  label: string
}

interface FormSelectProps {
  name: string
  items?: FormSelectOption[]
  placeholder?: string
  label?: string
  customOnChange?: () => void
  multiselect?: boolean
  disabled?: boolean
  closeMenuOnSelect?: boolean
  creatable?: boolean
  customOnCreate?: () => void
  isLoading?: boolean
  formik: ReturnType<typeof useFormik>
}

function FormSelect(props: FormSelectProps) {
  const {
    name,
    items,
    placeholder,
    label,
    customOnChange,
    multiselect,
    disabled,
    closeMenuOnSelect,
    creatable = false,
    customOnCreate,
    isLoading,
    formik: {
      values,
      setFieldTouched,
      setFieldValue,
      touched,
      errors,
      handleBlur,
      isSubmitting,
    },
  } = props

  const SelectComponent = creatable ? CreatableSelect : Select

  const handleOnChangeDefault = (option: any = []) => {
    // option is null when clearing the select
    if (!option) {
      setFieldValue(name, multiselect ? [] : '', true)
    } else {
      setFieldValue(
        name,
        multiselect
          ? option
            ? option.map((item: any) => item.value)
            : []
          : option.value,
        true
      )
    }
    setFieldTouched(name, true, false)
  }

  const handleOnCreateDefault = (inputValue: string) => {
    setFieldValue(name, inputValue, true)
    setFieldTouched(name, true, false)
  }

  const handleIsValidNewOption = (inputValue: string) => {
    return !items.find((item: any) => item.label === inputValue)
  }

  const handleOnBlur = (e: any) => {
    setTimeout(() => {
      e.target.name = name
      handleBlur(e)
    })
  }

  const hasError = !!get(touched, name) && !!get(errors, name)
  const handleOnChange = customOnChange || handleOnChangeDefault
  const handleOnCreate = customOnCreate || handleOnCreateDefault

  // If multiselect is true, we need to convert the values to an array of objects
  // with the value and label properties. Otherwise, we check if the value is already
  // in the items. If not (case of creatable select), we set the selecter value manually
  const selectedValues = multiselect
    ? get(values, name)
        ?.map((selValue: any) =>
          items.filter((availItem: any) => availItem.value === selValue)
        )
        .flat()
    : items.find((item: any) => item.value === get(values, name))
    ? items.find((item: any) => item.value === get(values, name))
    : get(values, name)
    ? { label: get(values, name) }
    : undefined

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control>
        <SelectComponent
          value={selectedValues}
          components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
          options={items}
          onChange={handleOnChange}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          isDisabled={isSubmitting || disabled}
          isMulti={multiselect}
          styles={formSelectStyles}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          closeMenuOnSelect={closeMenuOnSelect}
          closeMenuOnScroll={(e) => {
            if ((e.target as Element).className === 'modal-card-body')
              return true
          }}
          isLoading={isLoading}
          {...(creatable
            ? {
                isValidNewOption: handleIsValidNewOption,
                onCreateOption: handleOnCreate,
                isClearable: true,
              }
            : {})}
        />
      </Form.Control>
      <Form.Help color="danger" className={hasError ? 'help--show' : ''}>
        {hasError && <>{get(errors, name)}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default FormSelect
