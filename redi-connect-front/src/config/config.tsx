import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'

import { Categories } from '../types/Categories'
import { Language } from '../types/Language'
import { Gender } from '../types/Gender'
import { EducationLevel } from '../types/EducationLevel'
import { Course } from '../types/Course'
import { RediLocation } from '../types/RediLocation'

export let categories: Categories

if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'berlin') {
  categories = [
    { id: 'blockchain', label: 'Blockchain', group: 'coding' },
    { id: 'basicComputer', label: 'Basic Computer', group: 'coding' },
    { id: 'basicJava', label: 'Basic Java', group: 'coding' },
    { id: 'basicPython', label: 'Basic Python', group: 'coding' },
    { id: 'react', label: 'React', group: 'coding' },
    { id: 'itAndNetworking', label: 'IT & Networking', group: 'careerSupport' },
    { id: 'swift', label: 'Swift', group: 'coding' },
    {
      id: 'interviewsAndCommunication',
      label: 'Interviews & Communications',
      group: 'careerSupport'
    },
    { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI', group: 'other' },
    {
      id: 'cvPersonalPresentation',
      label: 'CV & Personal presentation',
      group: 'careerSupport'
    },
    { id: 'mobileDevelopment', label: 'Mobile Development', group: 'coding' },
    { id: 'jobOrientation', label: 'Job Orientation', group: 'careerSupport' },
    { id: 'pythonDataScience', label: 'Python Data Science', group: 'coding' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', group: 'other' },
    { id: 'javaDevelopment', label: 'Java Development', group: 'coding' },
    { id: 'iot', label: 'IoT', group: 'coding' },
    { id: 'webDevelopment', label: 'Web Development', group: 'coding' },
    { id: 'javascript', label: 'JavaScript', group: 'coding' },
    { id: 'htmlcss', label: 'HTML&CSS', group: 'coding' },
    {
      id: 'findingInternship',
      label: 'Finding an internship',
      group: 'careerSupport'
    },
    { id: 'freelancing', label: 'Freelancing', group: 'other' },
    { id: 'salesforce', label: 'Salesforce', group: 'other' },
    { id: 'dontKnowYet', label: "I don't know yet", group: 'other' }
  ]
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich') {
  categories = [
    { id: 'munich_programmingSkillsAndHelpForLearning', label: 'Programming skills and help for learning', group: 'careerSupport' },
    { id: 'munich_careerPlanningAndJobOrientation', label: 'Career planning and job orientation', group: 'careerSupport' },
    { id: 'munich_helpForCvPreparationAndApplicationProcess', label: 'Help for CV preparation and application process', group: 'careerSupport' },
    { id: 'munich_helpForInterviewPreparation', label: 'Help for interview preparation', group: 'careerSupport' },
    { id: 'munich_helpToImproveEnglish', label: 'Help to improve English', group: 'careerSupport' },
    { id: 'munich_helpToImproveGerman', label: 'Help to improve German', group: 'careerSupport' },
    { id: 'munich_helpAndGuidanceOnHowToUseAComputer', label: 'Help and guidance on how to use a computer', group: 'careerSupport' },
    { id: 'munich_motivationAndEncouragement', label: 'Motivation and encouragement', group: 'careerSupport' },
    { id: 'munich_beAFriendToHelpInNewAndDifficultSituationsHereInGermany', label: 'Be a friend to help in new and difficult situations here in Germany', group: 'careerSupport' }
  ]
} else {
  throw new Error('Invalid RediLocation')
}

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

export const gendersIdToLabelMap = mapValues(keyBy(genders, 'id'), 'label')

export const educationLevels: EducationLevel[] = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' }
]

let _courses: Course[]
if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'berlin') {
  _courses = [
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
    { id: 'introNetworking', label: 'Intro to Networking' },
    { id: 'alumni', label: "I'm a ReDI School alumni (I took a course before)" }
  ]
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich') {
  _courses = [
    { id: 'munich_dcp_frontEndDevelopment1', label: 'Front-End Development 1' },
    { id: 'munich_dcp_frontEndDevelopment2', label: 'Front-End Development 2' },
    { id: 'munich_dcp_softwareDevelopment1', label: 'Software Development 1' },
    { id: 'munich_dcp_softwareDevelopment2', label: 'Software Development 2' },
    { id: 'munich_dcp_dataAnalytics1', label: 'Data Analytics 1' },
    { id: 'munich_dcp_dataAnalytics2', label: 'Data Analytics 2' },
    { id: 'munich_dcp_devOps', label: 'DevOps' },
    { id: 'munich_dcp_networking', label: 'Networking' },
    { id: 'munich_women_beginners', label: 'Women Program Beginners' },
    { id: 'munich_women_programBasics1', label: 'Women Program Basics 1' },
    { id: 'munich_women_programBasics2', label: 'Women Program Basics 2' },
    { id: 'munich_women_basicsEnglish', label: 'Women Program Basics English' },
    { id: 'munich_women_introToProgramming', label: 'Women Program Intro to programming' }
  ]
} else {
  throw new Error('Invalid RediLocation')
}
export const courses = _courses

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
