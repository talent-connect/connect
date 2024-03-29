export interface EducationRecord {
  uuid: string
  type?: string
  institutionCity?: string
  title?: string
  institutionCountry?: string
  institutionName?: string
  description?: string
  certificationType?: string

  startDateMonth?: number
  startDateYear?: number
  endDateMonth?: number
  endDateYear?: number
  current?: boolean
}
