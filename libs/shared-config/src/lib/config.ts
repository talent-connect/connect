import { keyBy, mapValues } from 'lodash'

import {
  Categories,
  CategoryGroups,
  Course,
  EducationLevel,
  Gender,
  Language,
  RediLocation,
} from '@talent-connect/shared-types'

export const rediLocationNames: { [K in RediLocation]?: string } = {
  berlin: 'Berlin',
  munich: 'Munich',
  nrw: 'NRW',
}

export const categoryGroups: CategoryGroups = [
  { id: 'softwareEngineering', label: '👩‍💻 Software Engineering' },
  { id: 'design', label: '🎨 Design' },
  { id: 'otherProfessions', label: '🏄‍♀️ Other Professions' },
  { id: 'careerSupport', label: '✋ Career Support' },
  { id: 'language', label: '🗣️ Language Support' },
  { id: 'other', label: '🤗 Other' },
]
export const categories: Categories = [
  {
    id: 'basicProgrammingSkills',
    label: 'Basic programming skills',
    group: 'softwareEngineering',
  },
  { id: 'htmlCss', label: 'HTML & CSS', group: 'softwareEngineering' },
  { id: 'javascript', label: 'Javascript', group: 'softwareEngineering' },
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
]

export const categoriesIdToLabelMap = mapValues(
  keyBy(categories, 'id'),
  'label'
)
export const categoriesIdToColourMap = mapValues(
  keyBy(categories, 'id'),
  'colour'
)

export const Languages: Language[] = [
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
]

export const genders: Gender[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
]

export const gendersIdToLabelMap = mapValues(keyBy(genders, 'id'), 'label')

export const educationLevels: EducationLevel[] = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' },
]

export const educationLevelsIdToLabelMap = mapValues(
  keyBy(educationLevels, 'id'),
  'label'
)

export const courses: (Course & { location: RediLocation })[] = [
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
    id: 'salesforceFundamentals',
    label: 'Salesforce Fundamentals',
    location: 'berlin',
  },
  { id: 'azureFundamentals', label: 'Azure Fundamentals', location: 'berlin' },
  {
    id: 'webDesignFundamentals',
    label: 'Web Design Fundamentals',
    location: 'berlin',
  },
  { id: 'uiUxDesign', label: 'UX/UI Design', location: 'berlin' },
  {
    id: 'alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'berlin',
  },
  {
    id: 'munich_dcp_spring2021_introductionToComputerScience',
    label: 'Introduction to computer science',
    location: 'munich',
  },
  {
    id: 'munich_dcp_spring2021_pythonIntermediate',
    label: 'Python Intermediate',
    location: 'munich',
  },
  {
    id: 'munich_dcp_spring2021_frontEndDevelopment',
    label: 'Front-end development',
    location: 'munich',
  },
  { id: 'munich_dcp_spring2021_react', label: 'React', location: 'munich' },
  {
    id: 'munich_dcp_spring2021_backendDevelopment',
    label: 'Back-end development',
    location: 'munich',
  },
  {
    id: 'munich_dcp_spring2021_dataScience',
    label: 'Data Science',
    location: 'munich',
  },
  {
    id: 'munich_dcp_spring2021_cloudComputing',
    label: 'Cloud computing',
    location: 'munich',
  },
  {
    id: 'munich_alumni',
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'munich',
  },
  {
    id: 'nrw_webDesignFundamentals',
    label: 'Web Design Fundamentals',
    location: 'nrw',
  },
  { id: 'nrw_htmlCsss', label: 'HTML & CSS', location: 'nrw' },
  {
    id: 'nrw_introductionToPython',
    label: 'Introduction to Python',
    location: 'nrw',
  },
  {
    id: 'nrw_networkingFundamentals',
    label: 'Networking Fundamentals',
    location: 'nrw',
  },
  {
    id: 'nrw_alumni',
    label: "I'm a ReDI School alumni (I took a course before)",
    location: 'nrw',
  },
]

export const courseIdToLabelMap = mapValues(keyBy(courses, 'id'), 'label')
interface ReportProblemCategory {
  id: string
  label: string
}

export const reportProblemCategories: ReportProblemCategory[] = [
  { id: 'wantToQuit', label: 'I want to quit' },
]

export const mentoringSessionDurationOptions: number[] = [
  15,
  30,
  45,
  60,
  75,
  90,
  105,
  120,
  135,
  150,
  165,
  180,
]

interface MenteeOccupationCategory {
  id: string
  label: string
}

export const menteeOccupationCategories: MenteeOccupationCategory[] = [
  { id: 'job', label: 'Job (full-time/part-time)' },
  { id: 'student', label: 'Student (enrolled at university)' },
  { id: 'lookingForJob', label: 'Looking for a job' },
  { id: 'other', label: 'Other' },
]

export const menteeOccupationCategory_idToLabelMap = mapValues(
  keyBy(menteeOccupationCategories, 'id'),
  'label'
)

export const menteeCountCapacityOptions: number[] = [0, 1, 2]

export const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/'

export const API_URL = process.env.NX_API_URL
  ? process.env.NX_API_URL
  : 'http://127.0.0.1:3003/api'
export const S3_UPLOAD_SIGN_URL = process.env.NX_S3_UPLOAD_SIGN_URL
  ? process.env.NX_S3_UPLOAD_SIGN_URL
  : 'http://127.0.0.1:3003/s3/sign'
