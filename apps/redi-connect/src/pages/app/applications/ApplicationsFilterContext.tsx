import { MentorshipMatchStatus } from '@talent-connect/data-access'
import { createContext, ReactNode, useState } from 'react'
import {
  ApplicationsPageApplicationFragment,
  useGetMentorshipMatchesQuery,
} from './Applications.generated'

export type ActiveFilterType =
  | 'all'
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'cancelled'

interface ApplicationsFilterContextProps {
  activeFilter: ActiveFilterType
  setActiveFilter: (newFilter: ActiveFilterType) => void
  filteredAndSortedApplications: ApplicationsPageApplicationFragment[]
  pendingApplications: ApplicationsPageApplicationFragment[]
  hasPendingApplications: boolean
  hasAcceptedApplications: boolean
  hasDeclinedApplications: boolean
  hasCancelledApplications: boolean
}

export const ApplicationsFilterContext =
  createContext<ApplicationsFilterContextProps>({
    activeFilter: 'all',
    setActiveFilter: (filterValue: ActiveFilterType) => null,
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
  const [activeFilter, setActiveFilter] = useState<ActiveFilterType>('all')

  const mentorshipMatchesQuery = useGetMentorshipMatchesQuery()

  const applicants = mentorshipMatchesQuery.data?.conMentorshipMatches

  const filteredAndSortedApplications = applicants
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return dateA < dateB ? 1 : -1
    })
    .filter((item) => {
      if (activeFilter === 'all') return true
      if (activeFilter === 'pending') {
        return item.status === MentorshipMatchStatus.Applied
      } else if (activeFilter === 'accepted') {
        return (
          item.status === MentorshipMatchStatus.Accepted ||
          item.status === MentorshipMatchStatus.Completed
        )
      } else if (activeFilter === 'declined') {
        return item.status === MentorshipMatchStatus.DeclinedByMentor
      } else if (activeFilter === 'cancelled') {
        return (
          item.status === MentorshipMatchStatus.Cancelled ||
          item.status === MentorshipMatchStatus.InvalidatedAsOtherMentorAccepted
        )
      }
      return true
    })

  const pendingApplications = applicants.filter(
    (applicant) => applicant.status === MentorshipMatchStatus.Applied
  )
  const hasPendingApplications = Boolean(pendingApplications.length)

  const hasAcceptedApplications = applicants.some(
    (applicant) =>
      applicant.status === MentorshipMatchStatus.Accepted ||
      applicant.status === MentorshipMatchStatus.Completed
  )

  const hasDeclinedApplications = applicants.some(
    (applicant) => applicant.status === MentorshipMatchStatus.DeclinedByMentor
  )

  const hasCancelledApplications = applicants.some(
    (applicant) =>
      applicant.status === MentorshipMatchStatus.Cancelled ||
      applicant.status ===
        MentorshipMatchStatus.InvalidatedAsOtherMentorAccepted
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
