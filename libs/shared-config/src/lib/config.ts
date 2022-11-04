export const REDI_LOCATION_NAMES = {
  berlin: 'Berlin',
  hamburg: 'Hamburg',
  munich: 'Munich',
  nrw: 'NRW',
} as const

export const CATEGORY_GROUPS = {
  softwareEngineering: '👩‍💻 Software Engineering',
  design: '🎨 Design',
  otherProfessions: '🏄‍♀️ Other Professions',
  careerSupport: '✋ Career Support',
  language: '🗣️ Language Support',
  other: '🤗 Other',
} as const

export const CATEGORIES = [
  {
    id: 'basicProgrammingSkills',
    label: 'Basic programming skills',
    group: 'softwareEngineering',
  },
  { id: 'htmlCss', label: 'HTML & CSS', group: 'softwareEngineering' },
  { id: 'javascript', label: 'JavaScript', group: 'softwareEngineering' },
  { id: 'react', label: 'React', group: 'softwareEngineering' },
  { id: 'java', label: 'Java', group: 'softwareEngineering' },
  { id: 'python', label: 'Python', group: 'softwareEngineering' },
  {
    id: 'dataAnalytics',
    label: 'Data Analytics',
    group: 'softwareEngineering',
  },
  {
    id: 'machineLearning',
    label: 'Machine Learning',
    group: 'softwareEngineering',
  },
  {
    id: 'mobileDevelopmentIos',
    label: 'iOS Mobile Development',
    group: 'softwareEngineering',
  },
  {
    id: 'mobileDevelopmentAndroid',
    label: 'Android Mobile Development',
    group: 'softwareEngineering',
  },
  { id: 'salesforce', label: 'Salesforce', group: 'softwareEngineering' },
  {
    id: 'devOpsCloud',
    label: 'DevOps and Cloud (e.g. Azure, AWS)',
    group: 'softwareEngineering',
  },
  { id: 'iot', label: 'IoT', group: 'softwareEngineering' },
  {
    id: 'computerNetworking',
    label: 'Computer Networking',
    group: 'softwareEngineering',
  },
  { id: 'blockchain', label: 'Blockchain', group: 'softwareEngineering' },
  {
    id: 'productManagement',
    label: 'Product Management',
    group: 'otherProfessions',
  },
  {
    id: 'projectManagement',
    label: 'Project Management',
    group: 'otherProfessions',
  },
  {
    id: 'digitalMarketing',
    label: 'Digital Marketing',
    group: 'otherProfessions',
  },
  {
    id: 'businessDevelopment',
    label: 'Business Development',
    group: 'otherProfessions',
  },
  { id: 'sales', label: 'Sales', group: 'otherProfessions' },
  {
    id: 'qualityAssurance',
    label: 'Quality Assurance',
    group: 'otherProfessions',
  },
  { id: 'basicGerman', label: 'Basic German 🇩🇪', group: 'language' },
  { id: 'businessGerman', label: 'Business German 🇩🇪', group: 'language' },
  { id: 'english', label: 'English 🇬🇧', group: 'language' },
  { id: 'graphicDesign', label: 'Graphic Design', group: 'design' },
  {
    id: 'userInterfaceDesign',
    label: 'User Interface Design',
    group: 'design',
  },
  {
    id: 'userExperienceDesign',
    label: 'User Experience Design',
    group: 'design',
  },
  {
    id: 'motivationAndEncouragement',
    label: 'Motivation & encouragement',
    group: 'other',
  },
  { id: 'friendAndHelp', label: 'Be a friend and help', group: 'other' },
  { id: 'dontKnowYet', label: "I don't know yet", group: 'other' },
  {
    id: 'careerOrientationAndPlanning',
    label: 'Career orientation & planning',
    group: 'careerSupport',
  },
  {
    id: 'internshipOrWorkingStudent',
    label: 'Internship / working student position search',
    group: 'careerSupport',
  },
  { id: 'jobSearch', label: 'Job search', group: 'careerSupport' },
  {
    id: 'jobApplicationsCvPreparationEnglish',
    label: 'Job applications and CV preparation in English',
    group: 'careerSupport',
  },
  {
    id: 'jobApplicationsCvPreparationGerman',
    label: 'Job applications and CV preparation in German',
    group: 'careerSupport',
  },
  {
    id: 'interviewPreparation',
    label: 'Interview preparation',
    group: 'careerSupport',
  },
  {
    id: 'codingChallengePreparation',
    label: 'Coding challenge preparation',
    group: 'careerSupport',
  },
  {
    id: 'buildingProfessionalNetwork',
    label: 'Building a professional network',
    group: 'careerSupport',
  },
  { id: 'entrepreneurship', label: 'Entrepreneurship', group: 'careerSupport' },
  { id: 'freelancing', label: 'Freelancing', group: 'careerSupport' },
] as const
export type CategoryKey = typeof CATEGORIES[number]['id']
export type CategoryLabel = typeof CATEGORIES[number]['label']

export const CATEGORIES_MAP = Object.fromEntries(
  CATEGORIES.map((cat) => [cat.id, cat.label])
) as Record<CategoryKey, CategoryLabel>

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
  { id: 'BERLIN_CYBERSECURITY', label: 'CyberSecurity', location: 'berlin' },
  { id: 'BERLIN_DATA_CIRCLE', label: 'Data Circle', location: 'berlin' },
  {
    id: 'BERLIN_PROGRAMMING_WITH_JAVA',
    label: 'Programming with Java',
    location: 'berlin',
  },
  { id: 'BERLIN_JAVA_CIRCLE', label: 'Java Circle', location: 'berlin' },
  {
    id: 'BERLIN_PYTHON_FOUNDATION',
    label: 'Python Foundation',
    location: 'berlin',
  },
  { id: 'BERLIN_DATA_ANALYTICS', label: 'Data Analytics', location: 'berlin' },
  {
    id: 'BERLIN_SALESFORCE_FUNDAMENTALS',
    label: 'Salesforce Fundamentals',
    location: 'berlin',
  },
  {
    id: 'BERLIN_INTRO_TO_COMPUTER_SCIENCE',
    label: 'Intro to Computer Science',
    location: 'berlin',
  },
  { id: 'BERLIN_HTML_CSS', label: 'HTML & CSS', location: 'berlin' },
  { id: 'BERLIN_JAVASCRIPT', label: 'JavaScript', location: 'berlin' },
  { id: 'BERLIN_REACT', label: 'React', location: 'berlin' },
  { id: 'BERLIN_UX_UI_BASICS', label: 'UX/UI Basics', location: 'berlin' },
  {
    id: 'BERLIN_UX_UI_INTERMEDIATE',
    label: 'UX/UI Intermediate',
    location: 'berlin',
  },
  {
    id: 'BERLIN_CODING_FUNDAMENTALS',
    label: 'Coding Fundamentals',
    location: 'berlin',
  },
  {
    id: 'BERLIN_DIGITAL_LITERACY_PROGRAM',
    label: 'Digital Literacy Program',
    location: 'berlin',
  },
  {
    id: 'BERLIN_ALUMNI',
    label: 'Alumni (I took a course in the past)',
    location: 'berlin',
  },
  { id: 'NRW_HTML_AND_CSS', label: 'HTML and CSS', location: 'nrw' },
  { id: 'NRW_JAVASCRIPT', label: 'JavaScript', location: 'nrw' },
  { id: 'NRW_REACT', label: 'React', location: 'nrw' },
  {
    id: 'NRW_INTRODUCTION_TO_PYTHON',
    label: 'Introduction to Python',
    location: 'nrw',
  },
  { id: 'NRW_DATA_ANALYTICS', label: 'Data Analytics', location: 'nrw' },
  { id: 'NRW_MACHINE_LEARNING', label: 'Machine Learning', location: 'nrw' },
  {
    id: 'NRW_UX_UI_DESIGN_BASICS',
    label: 'UX/UI Design Basics',
    location: 'nrw',
  },
  {
    id: 'NRW_UX_UI_DESIGN_INTERMEDIATE',
    label: 'UX/UI Design Intermediate',
    location: 'nrw',
  },
  {
    id: 'NRW_INFRASTRUCTURE_BASICS',
    label: 'Infrastructure Basics',
    location: 'nrw',
  },
  { id: 'NRW_CLOUD_COMPUTING', label: 'Cloud Computing', location: 'nrw' },
  {
    id: 'NRW_INTERNET_OF_THINGS',
    label: 'Internet of Things',
    location: 'nrw',
  },
  {
    id: 'NRW_ALUMNI',
    label: 'Alumni (I took a course in the past)',
    location: 'nrw',
  },
  {
    id: 'MUNICH_INTRODUCTION_TO_COMPUTER_SCIENCE_ONLINE',
    label: 'Introduction to Computer Science (Online)',
    location: 'munich',
  },
  {
    id: 'MUNICH_INTRODUCTION_TO_COMPUTER_SCIENCE_HYBRID',
    label: 'Introduction to Computer Science (Hybrid)',
    location: 'munich',
  },
  {
    id: 'MUNICH_INTRODUCTION_TO_COMPUTER_SCIENCE_UKR',
    label: 'Introduction to Computer Science (UKR)',
    location: 'munich',
  },
  {
    id: 'MUNICH_PYTHON_INTERMEDIATE_ONLINE',
    label: 'Python Intermediate (Online)',
    location: 'munich',
  },
  {
    id: 'MUNICH_PYTHON_INTERMEDIATE_HYBRID',
    label: 'Python Intermediate (Hybrid)',
    location: 'munich',
  },
  {
    id: 'MUNICH_FRONT_END_DEVELOPMENT_HTML_CSS',
    label: 'Front-End Development (HTML/CSS)',
    location: 'munich',
  },
  {
    id: 'MUNICH_FRONT_END_DEVELOPMENT_JAVASCRIPT',
    label: 'Front-End Development (JavaScript)',
    location: 'munich',
  },
  { id: 'MUNICH_UX_UI_DESIGN', label: 'UX/UI Design', location: 'munich' },
  { id: 'MUNICH_DATA_ANALYTICS', label: 'Data Analytics', location: 'munich' },
  {
    id: 'MUNICH_BACK_END_DEVELOPMENT',
    label: 'Back-End Development',
    location: 'munich',
  },
  {
    id: 'MUNICH_DIGITAL_LITERACY_PROGRAM',
    label: 'Digital Literacy Program',
    location: 'munich',
  },
  {
    id: 'MUNICH_ALUMNI',
    label: 'Alumni (I took a course in the past)',
    location: 'munich',
  },
  { id: 'HAMBURG_INTRO_TO_CS', label: 'Intro to CS', location: 'hamburg' },
  { id: 'HAMBURG_HTML_CSS', label: 'HTML/CSS', location: 'hamburg' },
  {
    id: 'HAMBURG_UX_UI_DESIGN_BASIS',
    label: 'UX/UI Design Basis',
    location: 'hamburg',
  },
  {
    id: 'HAMBURG_INTERNET_OF_THINGS',
    label: 'Internet of Things',
    location: 'hamburg',
  },
  {
    id: 'HAMBURG_ALUMNI',
    label: 'Alumni (I took a course in the past)',
    location: 'hamburg',
  },
]
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

export const MENTORSHIP_MATCH_STATUS_LABELS: any = {
  applied: 'Pending',
  accepted: 'Accepted',
  completed: 'Accepted',
  cancelled: 'Cancelled',
  'declined-by-mentor': 'Declined',
  'invalidated-as-other-mentor-accepted': 'Cancelled',
}

export const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/'

export const API_URL = process.env.NX_API_URL
  ? process.env.NX_API_URL
  : 'http://127.0.0.1:3003/api'
export const S3_UPLOAD_SIGN_URL = process.env.NX_S3_UPLOAD_SIGN_URL
  ? process.env.NX_S3_UPLOAD_SIGN_URL
  : 'http://127.0.0.1:3003/s3/sign'
