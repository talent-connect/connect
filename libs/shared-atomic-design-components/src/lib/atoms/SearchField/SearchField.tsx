import { FC, useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bulma-components'
import { debounce } from 'lodash'
import { SearchFieldProps } from './SearchField.props';

export const SearchField: FC<SearchFieldProps> = ({
  valueChange,
  defaultValue,
  placeholder,
}) => {
  const [value, setValue] = useState(defaultValue)
  const valueChangeDebounced = useCallback(debounce(valueChange, 1000), [
    valueChange,
  ])
  const handleChange = useCallback((e: any) => setValue(e.target.value), [])

  useEffect(() => {
    valueChangeDebounced(value)
  }, [value])

  return (
    <Form.Input
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  )
}

export default SearchField
