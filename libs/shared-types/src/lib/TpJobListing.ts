export type TpJobListing = {
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

  createdAt: Date
  updatedAt: Date
}
