export interface ExperienceRecord {
  uuid: string
  title?: string
  company?: string
  description?: string

  startDateMonth?: number
  startDateYear?: number
  endDateMonth?: number
  endDateYear?: number
  current?: boolean
}
