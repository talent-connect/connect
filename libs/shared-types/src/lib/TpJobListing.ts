import { Timestamp } from './Timestamp';
import { TpCompanyProfile } from './TpCompanyProfile'

export type TpJobListing =
  & Timestamp
  & {
    id: string
    title?: string
    location?: string
    summary?: string
    idealTechnicalSkills?: string[]
    relatesToPositions?: string[]
    employmentType?: string
    languageRequirements?: string
    desiredExperience?: string
    salaryRange?: string
    isJobFair2022JobListing?: boolean

    tpCompanyProfileId?: string
    tpCompanyProfile?: TpCompanyProfile
  }
