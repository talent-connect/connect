import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';

import { Categories } from '../types/Categories';
import { Language } from '../types/Language';
import { Gender } from '../types/Gender';
import { EducationLevel } from '../types/EducationLevel';
import { Course } from '../types/Course';
import { RediLocation } from '../types/RediLocation';

export const rediLocationNames: { [K in RediLocation]?: string } = {
  berlin: 'Berlin',
  munich: 'Munich',
  nrw: 'NRW',
};

export let categories: Categories;

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
      group: 'careerSupport',
    },
    { id: 'helpToImproveGerman', label: 'German language skills', group: 'other' },
    { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI', group: 'other' },
    {
      id: 'cvPersonalPresentation',
      label: 'CV & Personal presentation',
      group: 'careerSupport',
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
    { id: 'findingInternship', label: 'Finding an internship', group: 'careerSupport' },
    { id: 'freelancing', label: 'Freelancing', group: 'other' },
    { id: 'salesforce', label: 'Salesforce', group: 'other' },
    { id: 'dontKnowYet', label: "I don't know yet", group: 'other' },
  ];
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'munich') {
  categories = [
    {
      id: 'munich_frontEndDevelopmentHTMLCSS',
      label: 'Front-End Dev with HTML/CSS',
      group: 'coding',
    },
    {
      id: 'munich_frontEndDevelopmentJavaScript',
      label: 'Front-End Dev with JavaScript',
      group: 'coding',
    },
    {
      id: 'munich_softwareDevelopmentBasicJava',
      label: 'Software Dev basic (Java)',
      group: 'coding',
    },
    {
      id: 'munich_softwareDevelopmentIntermediateJava',
      label: 'Software Dev intermediate (Java)',
      group: 'coding',
    },
    { id: 'munich_dataAnalyticsBasic', label: 'Basic Data Analytics', group: 'coding' },
    {
      id: 'munich_dataAnalyticsIntermediate',
      label: 'Intermediate Data Analytics ',
      group: 'coding',
    },
    { id: 'munich_devOps', label: 'DevOps', group: 'coding' },
    { id: 'munich_itAndNetworking', label: 'Networking', group: 'coding' },
    {
      id: 'munich_helpAndGuidanceOnHowToUseAComputer',
      label: 'Basic Computer Skills in English',
      group: 'coding',
    },
    {
      id: 'munich_helpAndGuidanceOnHowToUseAComputer_de',
      label: 'Basic Computer Skills in German',
      group: 'coding',
    },
    {
      id: 'munich_programmingSkillsAndHelpForLearning',
      label: 'Basic programming skills',
      group: 'coding',
    },
    {
      id: 'munich_careerPlanningAndJobOrientation',
      label: 'Career planning & job orientation',
      group: 'careerSupport',
    },
    {
      id: 'munich_helpForCvPreparationAndApplicationProcess',
      label: 'CV preparation & applications',
      group: 'careerSupport',
    },
    {
      id: 'munich_helpForInterviewPreparation',
      label: 'Interview preparation',
      group: 'careerSupport',
    },
    {
      id: 'munich_motivationAndEncouragement',
      label: 'Motivation & encouragement',
      group: 'other',
    },
    { id: 'munich_helpToImproveEnglish', label: 'English language skills', group: 'other' },
    { id: 'munich_helpToImproveGerman', label: 'German language skills', group: 'other' },
    { id: 'munich_freelancing', label: 'Freelancing', group: 'other' },
    { id: 'munich_entrepreneurship', label: 'Entrepreneurship', group: 'other' },
    {
      id: 'munich_beAFriendToHelpInNewAndDifficultSituationsHereInGermany',
      label: 'Be a friend and help',
      group: 'other',
    },
    { id: 'munich_dontKnowYet', label: "I don't know yet", group: 'other' },
  ];
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'nrw') {
  categories = [
    { id: 'nrw_userInterfaceDesign', label: 'User Interface Design', group: 'other' },
    { id: 'nrw_userExperienceDesign', label: 'User Experience Design', group: 'other' },
    { id: 'nrw_python', label: 'Python', group: 'coding' },
    { id: 'nrw_dataAnalytics', label: 'Data Analytics ', group: 'coding' },
    { id: 'nrw_machineLearning', label: 'Machine Learning', group: 'coding' },
    { id: 'nrw_HtmlCss', label: 'HTML & CSS', group: 'coding' },
    {
      id: 'nrw_webDevelopmentJavacsript',
      label: 'Web Development with Javascript',
      group: 'coding',
    },
    { id: 'nrw_webDevelopmentReact', label: 'Web Development with React', group: 'coding' },
    { id: 'nrw_basicNetworking', label: 'Basic Networking', group: 'coding' },
    { id: 'nrw_iot', label: 'IoT', group: 'coding' },
    { id: 'nrw_cloud', label: 'Cloud', group: 'coding' },
    { id: 'nrw_businessGerman', label: 'Business German', group: 'careerSupport' },
    { id: 'nrw_jobOrientation', label: 'Job Orientation', group: 'careerSupport' },
    {
      id: 'nrw_cvPreparationAndLinkedInProfile',
      label: 'CV Preparation & LinkedIn Profile',
      group: 'careerSupport',
    },
    {
      id: 'nrw_jobApplicationJobInterview',
      label: 'Job Application & Job Interview',
      group: 'careerSupport',
    },
    { id: 'nrw_howToFindAnInternship', label: 'How to find an Internship', group: 'careerSupport' },
    {
      id: 'nrw_howToBuildProfessionalNetwork',
      label: 'How to Build a Professional Network',
      group: 'careerSupport',
    },
    { id: 'nrw_entrepreneurship', label: 'Entrepreneurship', group: 'careerSupport' },
    { id: 'nrw_freelancing', label: 'Freelancing', group: 'careerSupport' },
  ];
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'location-picker') {
  categories = [];
} else {
  throw new Error('Invalid RediLocation');
}

export const categoriesIdToLabelMap = mapValues(keyBy(categories, 'id'), 'label');
export const categoriesIdToColourMap = mapValues(keyBy(categories, 'id'), 'colour');

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
];

export const genders: Gender[] = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
];

export const gendersIdToLabelMap = mapValues(keyBy(genders, 'id'), 'label');

export const educationLevels: EducationLevel[] = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' },
];

export const educationLevelsIdToLabelMap = mapValues(keyBy(educationLevels, 'id'), 'label');

let _courses: Course[];
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
    {
      id: 'munich_dcp_fall2020_introductionToComputerScience',
      label: 'Introduction to computer science',
    },
    { id: 'munich_dcp_fall2020_frontEndDevelopment', label: 'Front-end development' },
    { id: 'munich_dcp_fall2020_backendDevelopment', label: 'Back-end development' },
    { id: 'munich_dcp_fall2020_dataScience', label: 'Data Science' },
    { id: 'munich_dcp_fall2020_cloudComputing', label: 'Cloud computing' },
    { id: 'munich_dcp_fall2020_networking', label: 'Networking' },
    { id: 'munich_dcp_fall2020_networking', label: 'Women Program Basics English' },
    { id: 'munich_dcp_fall2020_networking', label: 'Women Program Intro to programming' },
    { id: 'munich_alumni', label: 'Alumni' },
  ];
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'nrw') {
  _courses = [
    { id: 'nrw_webDesignFundamentals', label: 'Web Design Fundamentals' },
    { id: 'nrw_htmlCsss', label: 'HTML & CSS' },
    { id: 'nrw_introductionToPython', label: 'Introduction to Python' },
    { id: 'nrw_networkingFundamentals', label: 'Networking Fundamentals' },
    { id: 'nrw_alumni', label: "I'm a ReDI School alumni (I took a course before)" },
  ];
} else if ((process.env.REACT_APP_REDI_LOCATION as RediLocation) === 'location-picker') {
  _courses = [];
} else {
  throw new Error('Invalid RediLocation');
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

export const menteeCountCapacityOptions: number[] = [0, 1, 2];

export const AWS_PROFILE_AVATARS_BUCKET_BASE_URL =
  'https://s3-eu-west-1.amazonaws.com/redi-connect-profile-avatars/';

export const API_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : 'http://127.0.0.1:3003/api';
export const S3_UPLOAD_SIGN_URL = process.env.REACT_APP_S3_UPLOAD_SIGN_URL
  ? process.env.REACT_APP_S3_UPLOAD_SIGN_URL
  : 'http://127.0.0.1:3003/s3/sign';
