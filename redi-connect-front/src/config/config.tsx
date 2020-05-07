import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';

import { Categories } from '../types/Categories';
import { Language } from '../types/Language';
import { Gender } from '../types/Gender';
import { EducationLevel } from '../types/EducationLevel';
import { Course } from '../types/Course';
import { RediLocation } from '../types/RediLocation';

export let categories: Categories;

if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'berlin') {
  categories = [
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
      colour: '#5c9a54',
    },
    { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI', colour: '#84dbca' },
    {
      id: 'cvPersonalPresentation',
      label: 'CV & Personal presentation',
      colour: '#549a7b',
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
      colour: '#91549a',
    },
    { id: 'freelancing', label: 'Freelancing', colour: '#91549a' },
    { id: 'salesforce', label: 'Salesforce', colour: '#91549a' },
    { id: 'dontKnowYet', label: "I don't know yet", colour: '#bbbbbb' },
  ];
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich') {
  categories = [
    { id: "munich_programmingSkillsAndHelpForLearning", colour: "#db8484", label: "Programming skills and help for learning" },
    { id: "munich_careerPlanningAndJobOrientation", colour: "#db8484", label: "Career planning and job orientation" },
    { id: "munich_helpForCvPreparationAndApplicationProcess", colour: "#db8484", label: "Help for CV preparation and application process" },
    { id: "munich_helpForInterviewPreparation", colour: "#db8484", label: "Help for interview preparation" },
    { id: "munich_helpToImproveEnglish", colour: "#db8484", label: "Help to improve English" },
    { id: "munich_helpToImproveGerman", colour: "#db8484", label: "Help to improve German" },
    { id: "munich_helpAndGuidanceOnHowToUseAComputer", colour: "#db8484", label: "Help and guidance on how to use a computer" },
    { id: "munich_motivationAndEncouragement", colour: "#db8484", label: "Motivation and encouragement" },
    { id: "munich_beAFriendToHelpInNewAndDifficultSituationsHereInGermany", colour: "#db8484", label: "Be a friend to help in new and difficult situations here in Germany" }
  ];
} else {
  throw new Error('Invalid RediLocation')
}

export const categoriesIdToLabelMap = mapValues(
  keyBy(categories, 'id'),
  'label'
);
export const categoriesIdToColourMap = mapValues(
  keyBy(categories, 'id'),
  'colour'
);

export const Languages: Language[] = [
  'English',
  'German',
  'Arabic',
  'Farsi',
  'Tigrinya',
];

export const genders: Gender[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
];

export const educationLevels: EducationLevel[] = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' },
];

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
    { id: 'alumni', label: "I'm a ReDI School alumni (I took a course before)" },
  ];
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
    { id: 'munich_women_introToProgramming', label: 'Women Program Intro to programming' },
  ];
} else {
  throw new Error('Invalid RediLocation')
}
export const courses = _courses;

export const courseIdToLabelMap = mapValues(keyBy(courses, 'id'), 'label');

interface ReportProblemCategory {
  id: string;
  label: string;
}

export const reportProblemCategories: ReportProblemCategory[] = [
  { id: 'wantToQuit', label: 'I want to quit' },
];

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
];

interface MenteeOccupationCategory {
  id: string;
  label: string;
}

export const menteeOccupationCategories: MenteeOccupationCategory[] = [
  { id: 'job', label: 'Job (full-time/part-time)' },
  { id: 'student', label: 'Student (enrolled at university)' },
  { id: 'lookingForJob', label: 'Looking for a job' },
  { id: 'other', label: 'Other' },
];

export const menteeOccupationCategory_idToLabelMap = mapValues(
  keyBy(menteeOccupationCategories, 'id'),
  'label'
);

export const menteeCountCapacityOptions: number[] = [1, 2];

export const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/';

export const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://127.0.0.1:3003/api';
export const S3_UPLOAD_SIGN_URL = process.env.REACT_APP_S3_UPLOAD_SIGN_URL
  ? process.env.REACT_APP_S3_UPLOAD_SIGN_URL
  : 'http://127.0.0.1:3003/s3/sign';
