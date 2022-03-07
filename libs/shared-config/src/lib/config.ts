export const REDI_LOCATION_NAMES = {
  berlin: 'Berlin',
  munich: 'Munich',
  nrw: 'NRW',
} as const

export const LANGUAGES = [
  'Afrikaans',
  'Albanian',
  'Amharic',
  'Arabic',
  'Aramaic',
  'Armenian',
  'Assamese',
  'Aymara',
  'Azerbaijani',
  'Balochi',
  'Bamanankan',
  'Bashkort (Bashkir)',
  'Basque',
  'Belarusan',
  'Bengali',
  'Bhojpuri',
  'Bislama',
  'Bosnian',
  'Brahui',
  'Bulgarian',
  'Burmese',
  'Cantonese',
  'Catalan',
  'Cebuano',
  'Chechen',
  'Cherokee',
  'Croatian',
  'Czech',
  'Dakota',
  'Danish',
  'Dari',
  'Dholuo',
  'Dutch',
  'English',
  'Esperanto',
  'Estonian',
  'Éwé',
  'Finnish',
  'French',
  'Georgian',
  'German',
  'Gikuyu',
  'Greek',
  'Guarani',
  'Gujarati',
  'Haitian Creole',
  'Hausa',
  'Hawaiian',
  'Hawaiian Creole',
  'Hebrew',
  'Hiligaynon',
  'Hindi',
  'Hungarian',
  'Icelandic',
  'Igbo',
  'Ilocano',
  'Indonesian (Bahasa Indonesia)',
  'Inuit/Inupiaq',
  'Irish Gaelic',
  'Italian',
  'Japanese',
  'Jarai',
  'Javanese',
  'K’iche’',
  'Kabyle',
  'Kannada',
  'Kashmiri',
  'Kazakh',
  'Khmer',
  'Khoekhoe',
  'Korean',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latin',
  'Latvian',
  'Lingala',
  'Lithuanian',
  'Macedonian',
  'Maithili',
  'Malagasy',
  'Malay (Bahasa Melayu)',
  'Malayalam',
  'Mandarin (Chinese)',
  'Marathi',
  'Mende',
  'Mongolian',
  'Nahuatl',
  'Navajo',
  'Nepali',
  'Norwegian',
  'Ojibwa',
  'Oriya',
  'Oromo',
  'Pashto',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Quechua',
  'Romani',
  'Romanian',
  'Russian',
  'Rwanda',
  'Samoan',
  'Sanskrit',
  'Serbian',
  'Shona',
  'Sindhi',
  'Sinhala',
  'Slovak',
  'Slovene',
  'Somali',
  'Spanish',
  'Swahili',
  'Swedish',
  'Tachelhit',
  'Tagalog',
  'Tajiki',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetic languages',
  'Tigrigna',
  'Tok Pisin',
  'Turkish',
  'Turkmen',
  'Ukrainian',
  'Urdu',
  'Uyghur',
  'Uzbek',
  'Vietnamese',
  'Warlpiri',
  'Welsh',
  'Wolof',
  'Xhosa',
  'Yakut',
  'Yiddish',
  'Yoruba',
  'Yucatec',
  'Zapotec',
  'Zulu',
] as const
export type Language = typeof LANGUAGES[number]

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

export const COURSES = [
  { id: 'introPython', label: 'Intro to Python', location: 'berlin' },
  { id: 'dataAnalytics', label: 'Data Analytics', location: 'berlin' },
  { id: 'htmlCss', label: 'HTML & CSS', location: 'berlin' },
  { id: 'javaScript', label: 'JavaScript', location: 'berlin' },
  { id: 'react', label: 'React', location: 'berlin' },
  { id: 'introJava', label: 'Intro to Java', location: 'berlin' },
  {
    id: 'intermediateJava',
    label: 'Programming with Java',
    location: 'berlin',
  },
  {
    id: 'introComputerScience',
    label: 'Intro to Computer Science',
    location: 'berlin',
  },
  {
    id: 'intermediatePython',
    label: 'Intermediate Python',
    location: 'berlin',
  },
  {
    id: 'salesforceFundamentals',
    label: 'Salesforce Fundamentals',
    location: 'berlin',
  },
  {
    id: 'cloudComputing',
    label: 'Cloud computing',
    location: 'berlin',
  },
  { id: 'iot', label: 'IoT', location: 'berlin' },
  {
    id: 'webDesign',
    label: 'Web Design',
    location: 'berlin',
  },
  { id: 'uiUxDesign', label: 'UX/UI Design', location: 'berlin' },
  {
    id: 'alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'berlin',
  },

  {
    id: 'munich_introComputerScience',
    label: `Introduction to Computer Science`,
    location: 'munich',
  },
  {
    id: 'munich_pythonIntermediate',
    label: `Python Intermediate`,
    location: 'munich',
  },
  {
    id: 'munich_dataScience',
    label: `Data Science`,
    location: 'munich',
  },
  {
    id: 'munich_frontendDevelopment',
    label: `Frontend Development`,
    location: 'munich',
  },
  {
    id: 'munich_cloudComputing',
    label: `Cloud Computing`,
    location: 'munich',
  },
  {
    id: 'munich_uxUiDesign',
    label: `UX/UI Design`,
    location: 'munich',
  },
  {
    id: 'munich_alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'munich',
  },

  {
    id: 'nrw_pythonIntroduction',
    label: 'Introduction to Python',
    location: 'nrw',
  },
  {
    id: 'nrw_dataAnalytics',
    label: 'Data Analytics',
    location: 'nrw',
  },
  {
    id: 'nrw_htmlCss',
    label: 'HTML & CSS',
    location: 'nrw',
  },
  {
    id: 'nrw_javascript',
    label: 'JavaScript',
    location: 'nrw',
  },
  {
    id: 'nrw_infrastructureBasics',
    label: 'Infrastructure Basics',
    location: 'nrw',
  },
  {
    id: 'nrw_cloudComputing',
    label: 'Cloud computing',
    location: 'nrw',
  },
  {
    id: 'nrw_webDesignFundamentals',
    label: 'Web Design Fundamentals',
    location: 'nrw',
  },
  {
    id: 'nrw_uxDesign',
    label: 'UX Design',
    location: 'nrw',
  },
  {
    id: 'nrw_alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'nrw',
  },
] as const
export type CourseKey = typeof COURSES[number]['id']

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

export const API_URL = process.env.NX_API_URL
  ? process.env.NX_API_URL
  : 'http://127.0.0.1:3003/api'
export const S3_UPLOAD_SIGN_URL = process.env.NX_S3_UPLOAD_SIGN_URL
  ? process.env.NX_S3_UPLOAD_SIGN_URL
  : 'http://127.0.0.1:3003/s3/sign'
