import { TpCompanyProfile } from './TpCompanyProfile'

export type TpJobListing = {
  id: string
  title?: string
  location?: string
  federalState: string[]
  summary?: string
  idealTechnicalSkills?: string[]
  relatesToPositions?: string[]
  employmentType?: string
  languageRequirements?: string
  salaryRange?: string
  isRemotePossible?: boolean

  tpCompanyProfileId?: string
  tpCompanyProfile?: TpCompanyProfile

  createdAt: Date
  updatedAt: Date
}
