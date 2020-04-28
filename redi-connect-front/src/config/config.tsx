import keyBy from 'lodash/keyBy'
import mapValues from 'lodash/mapValues'

import { Categories } from '../types/Categories'
import { Language } from '../types/Language'
import { Gender } from '../types/Gender'
import { EducationLevel } from '../types/EducationLevel'
import { Course } from '../types/Course'

export const categories: Categories = [
  { id: 'blockchain', label: 'Blockchain', colour: '#db8484' },
  { id: 'basicComputer', label: 'Basic Computer', colour: '#9a5454' },
  { id: 'basicJava', label: 'Basic Java', colour: '#9a5454' },
  { id: 'basicPython', label: 'Basic Python', colour: '#9a5454' },
  { id: 'react', label: 'React', colour: '#c984db' },
  { id: 'itAndNetworking', label: 'IT & Networking', colour: '#979a54' },
  { id: 'swift', label: 'Swift', colour: '#84b2db' },
  {
    id: 'interviewsAndCommunication',
    label: 'Interviews & Communications',
    colour: '#5c9a54'
  },
  { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI', colour: '#84dbca' },
  {
    id: 'cvPersonalPresentation',
    label: 'CV & Personal presentation',
    colour: '#549a7b'
  },
  { id: 'mobileDevelopment', label: 'Mobile Development', colour: '#89db84' },
  { id: 'jobOrientation', label: 'Job Orientation', colour: '#54969a' },
  { id: 'pythonDataScience', label: 'Python Data Science', colour: '#dbd784' },
  { id: 'entrepreneurship', label: 'Entrepreneurship', colour: '#547b9a' },
  { id: 'javaDevelopment', label: 'Java Development', colour: '#db9c84' },
  { id: 'iot', label: 'IoT', colour: '#57549a' },
  { id: 'webDevelopment', label: 'Web Development', colour: '#8484db' },
  { id: 'javascript', label: 'JavaScript', colour: '#8484db' },
  { id: 'htmlcss', label: 'HTML&CSS', colour: '#8484db' },
  {
    id: 'findingInternship',
    label: 'Finding an internship',
    colour: '#91549a'
  },
  { id: 'freelancing', label: 'Freelancing', colour: '#91549a' },
  { id: 'salesforce', label: 'Salesforce', colour: '#91549a' },
  { id: 'dontKnowYet', label: "I don't know yet", colour: '#bbbbbb' }
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
  'English',
  'German',
  'Arabic',
  'Farsi',
  'Tigrinya'
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
  { id: 'introNetworking', label: 'Intro to Networking' },
  { id: 'alumni', label: "I'm a ReDI School alumni (I took a course before)" }
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
