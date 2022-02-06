import Select, { components } from 'react-select'
import { Form } from 'react-bulma-components'
import { Icon } from '../Icon'
import { get } from 'lodash'
import { FormSelectProps } from './FormSelect.props';

const DropdownIndicator = (props: any) => (
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

const FormSelect = function <T extends string, M extends boolean>({
  name,
  items,
  placeholder,
  label,
  values,
  setFieldTouched,
  handleBlur,
  multiSelect,
  isSubmitting,
  setFieldValue,
  touched,
  errors,
  disabled,
}: FormSelectProps<T, M>) {

  const customStyles = {
    option: (provided: Record<string, string>, state: { isFocused: boolean; }) => ({
      ...provided,
      padding: '13px',
      color: state.isFocused ? 'black' : '',
      backgroundColor: state.isFocused ? '#dadada' : '',
      '&:active': {
        color: 'black',
        backgroundColor: '#dadada',
      },
    }),
    clearIndicator: (provided: Record<string, string>) => ({
      ...provided,
      svg: {
        margin: '0 0.1rem',
      },
    }),
    dropdownIndicator: (provided: Record<string, string>, state: { isFocused: boolean; menuIsOpen: boolean; }) => ({
      ...provided,
      color: state.isFocused ? '#ea5b29' : '#a0a0a0',
      transform: state.menuIsOpen ? 'rotate(180deg)' : 'none',
      svg: {
        margin: '0 0.1rem',
      },
    }),
    control: (provided: Record<string, string>, state: any) => ({
      ...provided,
      borderColor: state.isFocused ? '#ea5b29' : '#a0a0a0',
      minHeight: '48px',
      boxShadow: 'inset 0 2px 6px rgba(178, 180, 181, 0.3)',
      '&:hover': {
        borderColor: state.isFocused ? '#ea5b29' : '#f6b9a2',
      },
    }),
    multiValue: (provided: Record<string, string>) => ({
      ...provided,
      color: '#FFB298',
      borderRadius: '4px',
      backgroundColor: '#FFEAE2',
    }),
    multiValueLabel: (provided: Record<string, string>) => ({
      ...provided,
      fontSize: 'inherit',
      color: '#FF7D55',
    }),
    placeholder: (provided: Record<string, string>) => ({
      ...provided,
      fontStyle: 'italic',
      color: '#a0a0a0',
    }),
    multiValueRemove: (provided: Record<string, string>) => ({
      ...provided,
      svg: {
        padding: '0 2px',
      },
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  }

  const handleOnChangeDefault = (option: any = []) => { // TODO: type
    setFieldValue(
      name,
      multiSelect
        ? (option?.map(({ value }) => value) || [])
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

  const selectedValues = multiSelect
    ? (get(values, name) as string[]) // TODO: review
        ?.map((selValue) => items.filter(({ value }) => value === selValue))
        .flat()
    : items.find(({ value }) => value === get(values, name))

  return (
    <Form.Field>
      {label && <Form.Label size="small">{label}</Form.Label>}
      <Form.Control>
        <Select
          value={selectedValues}
          components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
          options={items}
          onChange={handleOnChangeDefault}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          isDisabled={isSubmitting || disabled}
          isMulti={multiSelect}
          styles={customStyles}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
      </Form.Control>
      <Form.Help color="danger" className={hasError ? 'help--show' : ''}>
        {hasError && <>{get(errors, name)}</>}
      </Form.Help>
    </Form.Field>
  )
}

export default FormSelect
