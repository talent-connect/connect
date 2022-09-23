import { useContext, ReactNode } from 'react'

import { Button } from '@talent-connect/shared-atomic-design-components'
import ActiveFilterContext from './ActiveFilterContext'

interface Props {
  filterValue: string
  isDisabled?: boolean
  children: ReactNode
}

const FilterButton = ({ filterValue, isDisabled, children }: Props) => {
  const { activeFilter, handleActiveFilter } = useContext(ActiveFilterContext)

  const getClassName = (tabName: string) => {
    return activeFilter === tabName
      ? 'tabs-menu__item--active'
      : 'tabs-menu__item'
  }

  return (
    <Button
      onClick={() => handleActiveFilter(filterValue)}
      className={getClassName(filterValue)}
      simple
      disabled={isDisabled}
    >
      {children}
    </Button>
  )
}

export default FilterButton
