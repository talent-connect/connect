import { useContext, ReactNode } from 'react'

import { Button } from '@talent-connect/shared-atomic-design-components'
import {
  ApplicationsFilterContext,
  ActiveFilterType,
} from './ApplicationsFilterContext'

interface Props {
  filterValue: ActiveFilterType
  isDisabled?: boolean
  children: ReactNode
}

const FilterButton = ({ filterValue, isDisabled, children }: Props) => {
  const { activeFilter, setActiveFilter } = useContext(
    ApplicationsFilterContext
  )

  return (
    <Button
      onClick={() => setActiveFilter(filterValue)}
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
