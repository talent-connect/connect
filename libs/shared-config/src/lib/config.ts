export const REDI_LOCATION_NAMES = {
  berlin: 'Berlin',
  munich: 'Munich',
  nrw: 'NRW',
} as const

export type ReDILocationKey = keyof typeof REDI_LOCATION_NAMES

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


export const REPORT_PROBLEM_CATEGORIES = [
  { id: 'wantToQuit', label: 'I want to quit' },
] as const

export const MENTORING_SESSION_DURATION_OPTIONS = [
  15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180,
] as const

export type MentoringSessionDurationOption =
  typeof MENTORING_SESSION_DURATION_OPTIONS[number]

export const MENTEE_OCCUPATION_CATEGORY = {
  job: 'Job (full-time/part-time)',
  student: 'Student (enrolled at university)',
  lookingForJob: 'Looking for a job',
  other: 'Other',
} as const

export type MenteeOccupationCategoryKey =
  keyof typeof MENTEE_OCCUPATION_CATEGORY

export const MENTEE_COUNT_CAPACITY_OPTIONS = [0, 1, 2] as const

export type MenteeCountCapacityOption =
  typeof MENTEE_COUNT_CAPACITY_OPTIONS[number]

// TODO: a duplicate lives in apps/api/lib/email/email.js, keep this
// in sync with it!
export const MENTOR_DECLINES_MENTORSHIP_REASON_FOR_DECLINING = {
  notEnoughTimeNowToBeMentor:
    "I don't have enough time right now to be a mentor",
  notRightExpertise: "I don't have the right expertise",
  anotherMentorMoreSuitable: 'I think another mentor would be more suitable',
  other: 'Other',
}

export const RED_MATCH_STATUSES = {
  accepted: 'Accepted',
  completed: 'Completed',
  cancelled: 'Cancelled',
  applied: 'Applied',
  'declined-by-mentor': 'Declined by mentor',
  'invalidated-as-other-mentor-accepted':
    'Invalidated due to other mentor accepting',
} as const

export const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/'

export const API_URL = process.env.NX_API_URL || 'http://127.0.0.1:3003/api'

export const S3_UPLOAD_SIGN_URL = process.env.NX_S3_UPLOAD_SIGN_URL || 'http://127.0.0.1:3003/s3/sign'
