import { TpCompanyProfile } from './TpCompanyProfile'

export type TpJobListing = {
  id: string
  title?: string
  location?: string
  summary?: string
  idealTechnicalSkills?: string[]
  relatesToPositions?: string[]
  employmentType?: string
  languageRequirements?: string
  salaryRange?: string
  isRemotePossible?: boolean
  federalState?: string

  tpCompanyProfileId?: string
  tpCompanyProfile?: TpCompanyProfile

  createdAt: Date
  updatedAt: Date

  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}
