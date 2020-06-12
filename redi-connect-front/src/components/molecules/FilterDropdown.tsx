import React, { useState, useEffect, useRef } from 'react'
import { Checkbox, Icon } from '../atoms'
import classnames from 'classnames'
import './FilterDropdown.scss'

interface Props {
  label: string
  selected: string[]
  items: {label: string, value: string}[]
  onChange: (item: string) => void
}

const FilterDropdown = ({ items, selected, label, onChange }: Props) => {
  const baseClass = 'filter-dropdown'
  const filterDropdown = useRef<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleClick = (e: any) => {
    if (filterDropdown && !filterDropdown.current.contains(e.target)) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div
      className={`${baseClass}`}
      onClick={(e) => console.log(e)}
      ref={filterDropdown}
    >
      <div
        className={classnames(`${baseClass}__label`, {
          [`${baseClass}__label--active`]: showDropdown
        })}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        Filter by {label}
        <Icon
          icon="chevron"
          size="small"
          className={classnames({
            'icon--rotate': showDropdown
          })}
        />
      </div>

      <ul className={classnames(`${baseClass}__list`, {
        [`${baseClass}__list--show`]: showDropdown
      })}>
        {items.map((item: any) =>
          <li>
            <Checkbox
              handleChange={() => onChange(item.value)}
              checked={selected.includes(item.value)}
            >
              {item.label}
            </Checkbox>
          </li>)}
      </ul>
    </div>
  )
}

export default FilterDropdown
