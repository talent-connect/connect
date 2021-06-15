export type TpCompanyProfile = {
  id: string
  firstName: string
  lastName: string
  contactEmail: string

  profileAvatarImageS3Key: string

  companyName?: string
  location?: string
  tagline?: string

  industry?: string
  website?: string
  linkedInUrl?: string

  phoneNumber?: string

  about?: string

  createdAt: Date
  updatedAt: Date

  jobListings?: TpJobListingRecord[]
}

export type TpJobListingRecord = {
  uuid: string
  title?: string
  location?: string
  summary?: string
  idealTechnicalSkills?: string[]
  relatesToPositions?: string[]
  employmentType?: string
  languageRequirements?: string
  desiredExperience?: string
  salaryRange?: string
}
