export const CATEGORY_GROUPS = {
  softwareEngineering: '👩‍💻 Software Engineering',
  design: '🎨 Design',
  otherProfessions: '🏄‍♀️ Other Professions',
  careerSupport: '✋ Career Support',
  language: '🗣️ Language Support',
  other: '🤗 Other',
} as const

type CategoryKey =
  'basicProgrammingSkills' |
  'htmlCss' |
  'javascript' |
  'react' |
  'java' |
  'python' |
  'dataAnalytics' |
  'machineLearning' |
  'mobileDevelopmentIos' |
  'mobileDevelopmentAndroid' |
  'salesforce' |
  'devOpsCloud' |
  'iot' |
  'computerNetworking' |
  'blockchain' |
  'productManagement' |
  'projectManagement' |
  'digitalMarketing' |
  'businessDevelopment' |
  'sales' |
  'qualityAssurance' |
  'basicGerman' |
  'businessGerman' |
  'english' |
  'graphicDesign' |
  'userInterfaceDesign' |
  'userExperienceDesign' |
  'motivationAndEncouragement' |
  'friendAndHelp' |
  'dontKnowYet' |
  'careerOrientationAndPlanning' |
  'internshipOrWorkingStudent' |
  'jobSearch' |
  'jobApplicationsCvPreparationEnglish' |
  'jobApplicationsCvPreparationGerman' |
  'interviewPreparation' |
  'codingChallengePreparation' |
  'buildingProfessionalNetwork' |
  'entrepreneurship' |
  'freelancing';

interface Category {
  readonly label: string;
  readonly group: keyof typeof CATEGORY_GROUPS
}

const Categories: Record<CategoryKey, Category> = {
  basicProgrammingSkills: {
    label: 'Basic programming skills',
    group: 'softwareEngineering',
  },
  htmlCss: {
    label: 'HTML & CSS',
    group: 'softwareEngineering',
  },
  javascript: {
    label: 'Javascript', 
    group: 'softwareEngineering',
  },
  react: {
    label: 'React', 
    group: 'softwareEngineering',
  },
  java: {
    label: 'Java', 
    group: 'softwareEngineering',
  },
  python: {
    label: 'Python', 
    group: 'softwareEngineering',
  },
  dataAnalytics: {
    label: 'Data Analytics',
    group: 'softwareEngineering',
  },
  machineLearning: {
    label: 'Machine Learning',
    group: 'softwareEngineering',
  },
  mobileDevelopmentIos: {
    label: 'iOS Mobile Development',
    group: 'softwareEngineering',
  },
  mobileDevelopmentAndroid: {
    label: 'Android Mobile Development',
    group: 'softwareEngineering',
  },
  salesforce: {
    label: 'Salesforce',
    group: 'softwareEngineering'
  },
  devOpsCloud: {
    label: 'DevOps and Cloud (e.g. Azure, AWS)',
    group: 'softwareEngineering',
  },
  iot: {
    label: 'IoT',
    group: 'softwareEngineering'
  },
  computerNetworking: {
    label: 'Computer Networking',
    group: 'softwareEngineering',
  },
  blockchain: {
    label: 'Blockchain',
    group: 'softwareEngineering'
  },
  productManagement: {
    label: 'Product Management',
    group: 'otherProfessions',
  },
  projectManagement: {
    label: 'Project Management',
    group: 'otherProfessions',
  },
  digitalMarketing: {
    label: 'Digital Marketing',
    group: 'otherProfessions',
  },
  businessDevelopment: {
    label: 'Business Development',
    group: 'otherProfessions',
  },
  sales: {
    label: 'Sales', 
    group: 'otherProfessions'
  },
  qualityAssurance: {
    label: 'Quality Assurance',
    group: 'otherProfessions',
  },
  basicGerman: {
    label: 'Basic German 🇩🇪', 
    group: 'language'
  },
  businessGerman: {
    label: 'Business German 🇩🇪', 
    group: 'language'
  },
  english: {
    label: 'English 🇬🇧', 
    group: 'language'
  },
  graphicDesign: {
    label: 'Graphic Design',
    group: 'design'
  },
  userInterfaceDesign: {
    label: 'User Interface Design',
    group: 'design',
  },
  userExperienceDesign: {
    label: 'User Experience Design',
    group: 'design',
  },
  motivationAndEncouragement: {
    label: 'Motivation & encouragement',
    group: 'other',
  },
  friendAndHelp: {
    label: 'Be a friend and help',
    group: 'other'
  },
  dontKnowYet: {
    label: "I don't know yet",
    group: 'other'
  },
  careerOrientationAndPlanning: {
    label: 'Career orientation & planning',
    group: 'careerSupport',
  },
  internshipOrWorkingStudent: {
    label: 'Internship / working student position search',
    group: 'careerSupport',
  },
  jobSearch: {
    label: 'Job search',
    group: 'careerSupport'
  },
  jobApplicationsCvPreparationEnglish: {
    label: 'Job applications and CV preparation in English',
    group: 'careerSupport',
  },
  jobApplicationsCvPreparationGerman: {
    label: 'Job applications and CV preparation in German',
    group: 'careerSupport',
  },
  interviewPreparation: {
    label: 'Interview preparation',
    group: 'careerSupport',
  },
  codingChallengePreparation: {
    label: 'Coding challenge preparation',
    group: 'careerSupport',
  },
  buildingProfessionalNetwork: {
    label: 'Building a professional network',
    group: 'careerSupport',
  },
  entrepreneurship: {
    label: 'Entrepreneurship', 
    group: 'careerSupport'
  },
  freelancing: {
    label: 'Freelancing', 
    group: 'careerSupport'
  }
} as const

export const CATEGORIES = Object.entries(Categories)
  .map(([key, value]) => ({ id: key as keyof typeof Categories, ...value }))

export const CATEGORIES_MAP = Object.entries(Categories)
  .reduce((t, [key, value]) =>
    ({ ...t, [key]: value.label }),
    {} as { [K in keyof typeof Categories]: typeof Categories[K]['label'] })