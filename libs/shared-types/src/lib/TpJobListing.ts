import { TpJobListingStatus } from '@talent-connect/common-types'
import { TpCompanyProfile } from './TpCompanyProfile'

export type TpJobListing = {
  id: string
  status: TpJobListingStatus
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
}
