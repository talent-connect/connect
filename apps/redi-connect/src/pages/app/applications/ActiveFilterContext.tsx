import { createContext } from 'react'

const ActiveFilterContext = createContext({
  activeFilter: 'all',
  handleActiveFilter: (filterValue: string) => null,
})

export default ActiveFilterContext
