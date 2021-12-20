export const GENDERS = {
  male: 'Male',
  female: 'Female',
  other: 'Other',
} as const

export type GenderKey = keyof typeof GENDERS

export const EDUCATION_LEVELS = {
  middleSchool: 'Middle School',
  highSchool: 'High School',
  apprenticeship: 'Apprenticeship',
  universityBachelor: 'University Degree (Bachelor)',
  universityMaster: 'University Degree (Master)',
  universityPhd: 'University Degree (PhD)',
} as const

export type EducationLevelKey = keyof typeof EDUCATION_LEVELS