import { createContext, ReactNode, useState } from 'react'

interface ActiveFilterContextProps {
  activeFilter: string
  handleActiveFilter: (newFilter: string) => void
}

export const ActiveFilterContext = createContext<ActiveFilterContextProps>({
  activeFilter: 'all',
  handleActiveFilter: (filterValue: string) => null,
})

interface ActiveFilterContextProviderProps {
  children: ReactNode
}

export const ActiveFilterContextProvider = ({
  children,
}: ActiveFilterContextProviderProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const handleActiveFilter = (tabName: string) => setActiveFilter(tabName)

  return (
    <ActiveFilterContext.Provider value={{ activeFilter, handleActiveFilter }}>
      {children}
    </ActiveFilterContext.Provider>
  )
}
