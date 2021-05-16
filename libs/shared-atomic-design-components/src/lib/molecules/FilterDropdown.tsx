import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Checkbox, Icon } from '../atoms'
import classnames from 'classnames'
import './FilterDropdown.scss'

type Item = { label: string; value: string }

interface Props {
  label: string
  className: string
  selected: string[]
  items: Item[]
  onChange: (item: string) => void
}

const baseClass = 'filter-dropdown'

const FilterDropdown = ({
  label,
  className,
  selected,
  items,
  onChange,
}: Props) => {
  const filterDropdown = useRef<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleClick = useCallback((e: MouseEvent) => {
    if (!filterDropdown?.current?.contains(e.target)) {
      setShowDropdown(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  return (
    <div
      className={classnames(baseClass, { [`${className}`]: className })}
      ref={filterDropdown}
    >
      <div
        className={classnames(`${baseClass}__label`, {
          [`${baseClass}__label--active`]: showDropdown,
        })}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Filter by {label}
        <Icon
          icon="chevron"
          size="small"
          className={classnames({
            'icon--rotate': showDropdown,
          })}
        />
      </div>

      <ul
        className={classnames(`${baseClass}__list`, {
          [`${baseClass}__list--show`]: showDropdown,
        })}
      >
        {items.map((item) => (
          <li key={item.value}>
            <Checkbox
              handleChange={() => onChange(item.value)}
              checked={selected.includes(item.value)}
            >
              {item.label}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterDropdown
