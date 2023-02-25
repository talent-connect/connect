import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-bulma-components'

export const SearchField = ({
  valueChange,
  defaultValue,
  placeholder,
}: {
  valueChange: (value: string) => void
  defaultValue: string
  placeholder?: string
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
