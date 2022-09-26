import { useContext, ReactNode } from 'react'

import { Button } from '@talent-connect/shared-atomic-design-components'
import { ActiveFilterContext } from './ActiveFilterContext'

interface Props {
  filterValue: string
  isDisabled?: boolean
  children: ReactNode
}

const FilterButton = ({ filterValue, isDisabled, children }: Props) => {
  const { activeFilter, handleActiveFilter } = useContext(ActiveFilterContext)

  return (
    <Button
      onClick={() => handleActiveFilter(filterValue)}
      className={
        activeFilter === filterValue
          ? 'tabs-menu__item--active'
          : 'tabs-menu__item'
      }
      simple
      disabled={isDisabled}
    >
      {children}
    </Button>
  )
}

export default FilterButton
