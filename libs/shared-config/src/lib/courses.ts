import { ReDILocationKey } from './config';

type CommonCourses =
  'cloudComputing' | 
  'alumni';

type BerlinCourses =
  CommonCourses |
  'introPython' |
  'dataAnalytics' |
  'htmlCss' |
  'javaScript' |
  'react' |
  'introJava' |
  'intermediateJava' |
  'introComputerScience' |
  'intermediatePython' |
  'salesforceFundamentals' |
  'iot' |
  'webDesign' |
  'uiUxDesign';

type MunichCourses =
  CommonCourses |
  'introComputerScience' |
  'pythonIntermediate' |
  'dataScience' |
  'frontendDevelopment' |
  'uxUiDesign';

type NRWCourses =
  CommonCourses |
  'pythonIntroduction' |
  'dataAnalytics' |
  'htmlCss' |
  'javascript' |
  'infrastructureBasics' |
  'webDesignFundamentals' |
  'uxDesign';

export type CourseKey =
  BerlinCourses |
  `munich_${MunichCourses}` |
  `nrw_${NRWCourses}`;

interface Course {
  readonly label: string;
  readonly location: ReDILocationKey
}

const Courses: Record<CourseKey, Course> = {
  introPython: {
    label: 'Intro to Python',
    location: 'berlin'
  },
  dataAnalytics: {
    label: 'Data Analytics',
    location: 'berlin'
  },
  htmlCss: {
    label: 'HTML & CSS',
    location: 'berlin'
  },
  javaScript: {
    label: 'JavaScript',
    location: 'berlin'
  },
  react: {
    label: 'React',
    location: 'berlin'
  },
  introJava: {
    label: 'Intro to Java',
    location: 'berlin'
  },
  intermediateJava: {
    label: 'Programming with Java',
    location: 'berlin',
  },
  introComputerScience: {
    label: 'Intro to Computer Science',
    location: 'berlin',
  },
  intermediatePython: {
    label: 'Intermediate Python',
    location: 'berlin',
  },
  salesforceFundamentals: {
    label: 'Salesforce Fundamentals',
    location: 'berlin',
  },
  cloudComputing: {
    label: 'Cloud computing',
    location: 'berlin',
  },
  iot: {
    label: 'IoT',
    location: 'berlin'
  },
  webDesign: {
    label: 'Web Design',
    location: 'berlin',
  },
  uiUxDesign: {
    label: 'UX/UI Design',
    location: 'berlin'
  },
  alumni: {
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'berlin',
  },
  munich_introComputerScience: {
    label: `Introduction to Computer Science`,
    location: 'munich',
  },
  munich_pythonIntermediate: {
    label: `Python Intermediate`,
    location: 'munich',
  },
  munich_dataScience: {
    label: `Data Science`,
    location: 'munich',
  },
  munich_frontendDevelopment: {
    label: `Frontend Development`,
    location: 'munich',
  },
  munich_cloudComputing: {
    label: `Cloud Computing`,
    location: 'munich',
  },
  munich_uxUiDesign: {
    label: `UX/UI Design`,
    location: 'munich',
  },
  munich_alumni: {
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'munich',
  },
  nrw_pythonIntroduction: {
    label: 'Introduction to Python',
    location: 'nrw',
  },
  nrw_dataAnalytics: {
    label: 'Data Analytics',
    location: 'nrw',
  },
  nrw_htmlCss: {
    label: 'HTML & CSS',
    location: 'nrw',
  },
  nrw_javascript: {
    label: 'JavaScript',
    location: 'nrw',
  },
  nrw_infrastructureBasics: {
    label: 'Infrastructure Basics',
    location: 'nrw',
  },
  nrw_cloudComputing: {
    label: 'Cloud computing',
    location: 'nrw',
  },
  nrw_webDesignFundamentals: {
    label: 'Web Design Fundamentals',
    location: 'nrw',
  },
  nrw_uxDesign: {
    label: 'UX Design',
    location: 'nrw',
  },
  nrw_alumni: {
    label: `I'm a ReDI School alumni (I took a course before)`,
    location: 'nrw',
  }
}

export const COURSES = Object.entries(Courses)
  .map(([key, value]) => ({ id: key as CourseKey, ...value }))