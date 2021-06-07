import { TpJobseekerProfileState } from './TpJobseekerProfileState'

export type TpJobseekerProfile = {
  id: string
  firstName: string
  lastName: string
  contactEmail: string
  currentlyEnrolledInCourse: string

  state: TpJobseekerProfileState

  createdAt: Date
  updatedAt: Date
  gaveGdprConsentAt: Date
}
