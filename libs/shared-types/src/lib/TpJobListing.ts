import { TpCompanyProfile } from './TpCompanyProfile'

export type TpJobListing = {
  status: string
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
  isFromCareerPartner: boolean

  createdAt: Date
  updatedAt: Date
  expiresAt?: Date

  contactFirstName?: string
  contactLastName?: string
  contactEmailAddress?: string
  contactPhoneNumber?: string
}
