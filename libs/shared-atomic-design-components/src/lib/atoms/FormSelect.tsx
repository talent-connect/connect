import Select, { components } from 'react-select'
import { Form } from 'react-bulma-components'
import { Icon } from '../atoms'
import { get } from 'lodash'
import { useFormik } from 'formik'
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
  customOnChange?: () => void,
  multiselect?: boolean,
  disabled?: boolean,
  closeMenuOnSelect?: boolean,
  menuPortalTarget?: HTMLElement,
  menuPosition?: string,
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
    menuPortalTarget,
    menuPosition,
    formik: { values, setFieldTouched, setFieldValue, touched, errors, handleBlur, isSubmitting }
  } = props

  const handleOnChangeDefault = (option: any = []) => {
    setFieldValue(
      name,
      multiselect
        ? option
          ? option.map((item: any) => item.value)
          : []
        : option.value,
      true
    )
    setFieldTouched(name, true, false)
  }

  const handleOnBlur = (e: any) => {
    e.target.name = name
    handleBlur(e)
  }

  const hasError = !!get(touched, name) && !!get(errors, name)
  const handleOnChange = customOnChange || handleOnChangeDefault

  const selectedValues = multiselect
    ? get(values, name)
        ?.map((selValue: any) =>
          items.filter((availItem: any) => availItem.value === selValue)
        )
        .flat()
    : items.find((item: any) => item.value === get(values, name))

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control>
        <Select
          value={selectedValues}
          components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
          options={items}
          onChange={handleOnChange}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          isDisabled={isSubmitting || disabled}
          isMulti={multiselect}
          styles={formSelectStyles}
          menuPortalTarget={menuPortalTarget}
          menuPosition={menuPosition}
          closeMenuOnSelect={closeMenuOnSelect}
        />
      </Form.Control>
      <Form.Help color="danger" className={hasError ? 'help--show' : ''}>
        {hasError && <>{get(errors, name)}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default FormSelect
