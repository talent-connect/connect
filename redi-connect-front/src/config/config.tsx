import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'

import { Categories } from '../types/Categories'
import { Language } from '../types/Language'
import { Gender } from '../types/Gender'
import { EducationLevel } from '../types/EducationLevel'
import { Course } from '../types/Course'

export const categories: Categories = [
  { id: 'blockchain', label: 'Blockchain', colour: '#db8484', group: 'coding' },
  { id: 'basicComputer', label: 'Basic Computer', colour: '#9a5454', group: 'coding' },
  { id: 'basicJava', label: 'Basic Java', colour: '#9a5454', group: 'coding' },
  { id: 'basicPython', label: 'Basic Python', colour: '#9a5454', group: 'coding' },
  { id: 'react', label: 'React', colour: '#c984db', group: 'coding' },
  { id: 'itAndNetworking', label: 'IT & Networking', colour: '#979a54', group: 'careerSupport' },
  { id: 'swift', label: 'Swift', colour: '#84b2db', group: 'coding' },
  {
    id: 'interviewsAndCommunication',
    label: 'Interviews & Communications',
    colour: '#5c9a54',
    group: 'careerSupport'
  },
  { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI', colour: '#84dbca', group: 'other' },
  {
    id: 'cvPersonalPresentation',
    label: 'CV & Personal presentation',
    colour: '#549a7b',
    group: 'careerSupport'
  },
  { id: 'mobileDevelopment', label: 'Mobile Development', colour: '#89db84', group: 'coding' },
  { id: 'jobOrientation', label: 'Job Orientation', colour: '#54969a', group: 'careerSupport' },
  { id: 'pythonDataScience', label: 'Python Data Science', colour: '#dbd784', group: 'coding' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', colour: '#547b9a', group: 'other' },
  { id: 'javaDevelopment', label: 'Java Development', colour: '#db9c84', group: 'coding' },
  { id: 'iot', label: 'IoT', colour: '#57549a', group: 'coding' },
  { id: 'webDevelopment', label: 'Web Development', colour: '#8484db', group: 'coding' },
  { id: 'javascript', label: 'JavaScript', colour: '#8484db', group: 'coding' },
  {
    id: 'findingInternship',
    label: 'Finding an internship',
    colour: '#91549a',
    group: 'careerSupport'
  },
  { id: 'freelancing', label: 'Freelancing', colour: '#91549a', group: 'other' },
  { id: 'salesforce', label: 'Salesforce', colour: '#91549a', group: 'other' },
  { id: 'dontKnowYet', label: "I don't know yet", colour: '#bbbbbb', group: 'other' }
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
  'Zulu'
]

export const genders: Gender[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' }
]

export const educationLevels: EducationLevel[] = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' }
]

export const courses: Course[] = [
  { id: 'basicComputerTraining', label: 'Basic Computer Training' },
  { id: 'introPython', label: 'Intro to Python' },
  { id: 'javaScript', label: 'Javascript' },
  { id: 'react', label: 'React' },
  { id: 'intermediateJava', label: 'Intermediate Java' },
  { id: 'iotInAction', label: 'IoT in Action!' },
  { id: 'dataSciencePython', label: 'Data Science with Python' },
  { id: 'htmlCss', label: 'HTML&CSS' },
  { id: 'salesforceFundamentals', label: 'Salesforce Fundamentals' },
  { id: 'blockchainBasics', label: 'Blockchain Basics' },
  { id: 'introIosAppsSwift', label: 'Intro to iOS Apps with Swift' },
  { id: 'introJava', label: 'Intro to Java' },
  { id: 'uiUxWomen', label: 'UI/UX Women' },
  { id: 'introNetworking', label: 'Intro to Networking' }
]

export const courseIdToLabelMap = mapValues(keyBy(courses, 'id'), 'label')

interface ReportProblemCategory {
  id: string
  label: string
}

export const reportProblemCategories: ReportProblemCategory[] = [
  { id: 'wantToQuit', label: 'I want to quit' }
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
  180
]

interface MenteeOccupationCategory {
  id: string
  label: string
}

export const menteeOccupationCategories: MenteeOccupationCategory[] = [
  { id: 'job', label: 'Job (full-time/part-time)' },
  { id: 'student', label: 'Student (enrolled at university)' },
  { id: 'lookingForJob', label: 'Looking for a job' },
  { id: 'other', label: 'Other' }
]

export const menteeOccupationCategory_idToLabelMap = mapValues(
  keyBy(menteeOccupationCategories, 'id'),
  'label'
)

export const menteeCountCapacityOptions: number[] = [1, 2]

export const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/'

export const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://127.0.0.1:3003/api'
export const S3_UPLOAD_SIGN_URL = process.env.REACT_APP_S3_UPLOAD_SIGN_URL
  ? process.env.REACT_APP_S3_UPLOAD_SIGN_URL
  : 'http://127.0.0.1:3003/s3/sign'
