import { createContext, ReactNode, useState } from 'react'
import { useSelector } from 'react-redux'
import { RedMatch } from '@talent-connect/shared-types'
import { RootState } from '../../../redux/types'

interface ApplicationsFilterContextProps {
  activeFilter: string
  setActiveFilter: (newFilter: string) => void
  filteredAndSortedApplications: RedMatch[]
  pendingApplications: RedMatch[]
  hasPendingApplications: boolean
  hasAcceptedApplications: boolean
  hasDeclinedApplications: boolean
  hasCancelledApplications: boolean
}

export const ApplicationsFilterContext =
  createContext<ApplicationsFilterContextProps>({
    activeFilter: 'all',
    setActiveFilter: (filterValue: string) => null,
    filteredAndSortedApplications: [],
    pendingApplications: [],
    hasPendingApplications: false,
    hasAcceptedApplications: false,
    hasDeclinedApplications: false,
    hasCancelledApplications: false,
  })

interface ApplicationsFilterContextProviderProps {
  children: ReactNode
}

export const ApplicationsFilterContextProvider = ({
  children,
}: ApplicationsFilterContextProviderProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const applicants = useSelector((state: RootState) => state.matches.matches)

  const filteredAndSortedApplications = applicants
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateA < dateB ? 1 : -1
    })
    .filter((item) => {
      if (activeFilter === 'all') return true
      if (activeFilter === 'pending') {
        return item.status === 'applied'
      } else if (activeFilter === 'accepted') {
        return item.status === 'accepted' || item.status === 'completed'
      } else if (activeFilter === 'declined') {
        return item.status === 'declined-by-mentor'
      } else if (activeFilter === 'cancelled') {
        return (
          item.status === 'cancelled' ||
          item.status === 'invalidated-as-other-mentor-accepted'
        )
      }
      return true
    })

  const pendingApplications = applicants.filter(
    (applicant) => applicant.status === 'applied'
  )
  const hasPendingApplications = Boolean(pendingApplications.length)

  const hasAcceptedApplications = applicants.some(
    (applicant) =>
      applicant.status === 'accepted' || applicant.status === 'completed'
  )

  const hasDeclinedApplications = applicants.some(
    (applicant) => applicant.status === 'declined-by-mentor'
  )

  const hasCancelledApplications = applicants.some(
    (applicant) =>
      applicant.status === 'cancelled' ||
      applicant.status === 'invalidated-as-other-mentor-accepted'
  )

  return (
    <ApplicationsFilterContext.Provider
      value={{
        activeFilter,
        setActiveFilter,
        filteredAndSortedApplications,
        pendingApplications,
        hasPendingApplications,
        hasAcceptedApplications,
        hasDeclinedApplications,
        hasCancelledApplications,
      }}
    >
      {children}
    </ApplicationsFilterContext.Provider>
  )
}
