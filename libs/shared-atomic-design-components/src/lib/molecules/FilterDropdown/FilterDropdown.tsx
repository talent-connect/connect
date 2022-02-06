import { useState, useEffect, useRef, useCallback, FC } from 'react'
import { Checkbox, Icon } from '../../atoms'
import classnames from 'classnames'
import './FilterDropdown.scss'
import { FilterDropdownProps } from './FilterDropdown.props';

const baseClass = 'filter-dropdown'

function FilterDropdown ({
  label,
  className,
  selected,
  items,
  onChange,
}: FilterDropdownProps) {
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
        {items.map(({ value, label }) => (
          <li key={value}>
            <Checkbox
              name={`${value}-checkbox`}
              handleChange={() => onChange(value)}
              checked={selected.includes(value)}
            >
              {label}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterDropdown
