export const MENTORING_GOALS = {
  buildingAProfessionalNetwork: 'Building a professional network',
  jobSearchAndApplicationProcess: 'Job search and application process',
  entrepreneurshipAndFreelancing: 'Entrepreneurship and freelancing',
  tutoringInAParticularSkillTool: 'Tutoring in a particular skill / tool',
  careerOrientatioPlanning: 'Career orientation & planning',
  preparationForACertificationInterview:
    'Preparation for a certification / interview',
} as const

export type MentoringGoalKey = keyof typeof MENTORING_GOALS

export const DESIRED_ROLES = {
  marketingSocialMediaAndSales: 'Marketing, social media and sales',
  productAndProjectManagement: 'Product and project management',
  requirementsAnalysisAndResearch: 'Requirements analysis and research',
  softwareDevelopment: 'Software development',
  uxAndUiDesign: 'UX and UI design',
  testingAndQualityAssurance: 'Testing and Quality Assurance',
  other: 'Other',
} as const

export const FIELDS_OF_EXPERTISE = {
  humanResourcesAndRecruiting: 'Human resources and recruiting',
  ...DESIRED_ROLES,
} as const

export type FieldOfExperienceKey = keyof typeof FIELDS_OF_EXPERTISE

export const MENTORING_TOPIC_GROUPS = {
  overarchingTopics: '🌈 Overarching topics',
  requirementsAnalysisAndResearch: '🧪 Requirements analysis and research',
  uxAndUiDesign: '🎨 UX and UI design',
  testingAndQualityAssurance: '🏎️ Testing and Quality Assurance',
  productAndProjectManagement: '📋 Product and project management',
  softwareDevelopment: '👩‍💻 Software development',
  toolsAndFrameworks: '🛠️ Tools and frameworks',
  toolsAndFrameworks2: '🛠️ Tools and frameworks',
} as const

/*
overarchingTopics
productAndProjectManagement
softwareDevelopment
*/

export const MENTORING_TOPICS = [
  {
    id: 'Application process and portfolio',
    label: 'Application process and portfolio',
    group: 'overarchingTopics',
  },
  { id: 'Communication', label: 'Communication', group: 'overarchingTopics' },
  { id: 'Cross-cultural teams', label: 'Cross-cultural teams', group: '' },
  {
    id: 'Cross-functional work',
    label: 'Cross-functional work',
    group: 'overarchingTopics',
  },
  { id: 'Facilitation', label: 'Facilitation', group: 'overarchingTopics' },
  {
    id: 'Giving / receiving feedback',
    label: 'Giving / receiving feedback',
    group: 'overarchingTopics',
  },
  {
    id: 'Self-organisation',
    label: 'Self-organisation',
    group: 'overarchingTopics',
  },
  {
    id: 'Social network profile tuning',
    label: 'Social network profile tuning',
    group: 'overarchingTopics',
  },
  {
    id: 'Storytelling and presentation',
    label: 'Storytelling and presentation',
    group: 'overarchingTopics',
  },
  {
    id: 'Team leadership',
    label: 'Team leadership',
    group: 'overarchingTopics',
  },
  {
    id: 'Time management',
    label: 'Time management',
    group: 'overarchingTopics',
  },
  {
    id: 'Marketing and social media',
    label: 'Marketing and social media',
    group: 'marketingSocialMediaAndSales',
  },
  { id: 'Sales', label: 'Sales', group: 'marketingSocialMediaAndSales' },
  {
    id: 'Data analysis',
    label: 'Data analysis',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Design research',
    label: 'Design research',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Design Thinking',
    label: 'Design Thinking',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Domain driven design',
    label: 'Domain driven design',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Mapping customer experience',
    label: 'Mapping customer experience',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Prioritisation metrics',
    label: 'Prioritisation metrics',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Process modelling',
    label: 'Process modelling',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Software Development Life Cycle',
    label: 'Software Development Life Cycle',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Technical writing',
    label: 'Technical writing',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'User story mapping',
    label: 'User story mapping',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Qualitative User Research',
    label: 'Qualitative User Research',
    group: 'requirementsAnalysisAndResearch',
  },
  {
    id: 'Quantitative User Research',
    label: 'Quantitative User Research',
    group: 'requirementsAnalysisAndResearch',
  },
  { id: 'Animation', label: 'Animation', group: 'uxAndUiDesign' },
  { id: 'Branding', label: 'Branding', group: 'uxAndUiDesign' },
  {
    id: 'General user experience',
    label: 'General user experience',
    group: 'uxAndUiDesign',
  },
  { id: 'Graphic Design', label: 'Graphic Design', group: 'uxAndUiDesign' },
  {
    id: 'Information architecture',
    label: 'Information architecture',
    group: 'uxAndUiDesign',
  },
  {
    id: 'Interaction design',
    label: 'Interaction design',
    group: 'uxAndUiDesign',
  },
  {
    id: 'Prototyping and wireframing',
    label: 'Prototyping and wireframing',
    group: 'uxAndUiDesign',
  },
  {
    id: 'Responsive design',
    label: 'Responsive design',
    group: 'uxAndUiDesign',
  },
  {
    id: 'Typography / color theory',
    label: 'Typography / color theory',
    group: 'uxAndUiDesign',
  },
  {
    id: 'Visual communication',
    label: 'Visual communication',
    group: 'uxAndUiDesign',
  },
  {
    id: 'Automated software testing',
    label: 'Automated software testing',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Behavior-driven development',
    label: 'Behavior-driven development',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Cross-browser testing',
    label: 'Cross-browser testing',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Functional Testing',
    label: 'Functional Testing',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Software testing methodologies',
    label: 'Software testing methodologies',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Test-driven development',
    label: 'Test-driven development',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Test planning',
    label: 'Test planning',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Test management',
    label: 'Test management',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Usability testing',
    label: 'Usability testing',
    group: 'testingAndQualityAssurance',
  },
  {
    id: 'Agile frameworks',
    label: 'Agile frameworks',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Budget calculation',
    label: 'Budget calculation',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Business development',
    label: 'Business development',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Change management',
    label: 'Change management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Enterprise architecture management',
    label: 'Enterprise architecture management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Market research',
    label: 'Market research',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Planning and roadmaps',
    label: 'Planning and roadmaps',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Prioritisation metrics',
    label: 'Prioritisation metrics',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Product Backlog management',
    label: 'Product Backlog management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Product management',
    label: 'Product management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Project management',
    label: 'Project management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Project management office',
    label: 'Project management office',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Value-driven product development',
    label: 'Value-driven product development',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Value metrics',
    label: 'Value metrics',
    group: 'productAndProjectManagement',
  },
  {
    id: 'Android Mobile Development',
    label: 'Android Mobile Development',
    group: 'softwareDevelopment',
  },
  {
    id: 'Basic programming skills',
    label: 'Basic programming skills',
    group: 'softwareDevelopment',
  },
  {
    id: 'Computer networking',
    label: 'Computer networking',
    group: 'softwareDevelopment',
  },
  {
    id: 'Cross-browser development',
    label: 'Cross-browser development',
    group: 'softwareDevelopment',
  },
  {
    id: 'Data analytics',
    label: 'Data analytics',
    group: 'softwareDevelopment',
  },
  {
    id: 'Database management',
    label: 'Database management',
    group: 'softwareDevelopment',
  },
  {
    id: 'DevOps and Cloud',
    label: 'DevOps and Cloud',
    group: 'softwareDevelopment',
  },
  {
    id: 'Hybrid App Development',
    label: 'Hybrid App Development',
    group: 'softwareDevelopment',
  },
  {
    id: 'Hardware and networks',
    label: 'Hardware and networks',
    group: 'softwareDevelopment',
  },
  { id: 'IoT', label: 'IoT', group: 'softwareDevelopment' },
  {
    id: 'iOS Mobile Development',
    label: 'iOS Mobile Development',
    group: 'softwareDevelopment',
  },
  {
    id: 'Machine learning',
    label: 'Machine learning',
    group: 'softwareDevelopment',
  },
  { id: 'Security', label: 'Security', group: 'softwareDevelopment' },
  {
    id: 'Atlassian Jira',
    label: 'Atlassian Jira',
    group: 'toolsAndFrameworks',
  },
  { id: 'AWS', label: 'AWS', group: 'toolsAndFrameworks' },
  { id: 'Azure', label: 'Azure', group: 'toolsAndFrameworks' },
  {
    id: 'Balsamiq Mockup',
    label: 'Balsamiq Mockup',
    group: 'toolsAndFrameworks',
  },
  { id: 'Blockchain', label: 'Blockchain', group: 'toolsAndFrameworks' },
  { id: 'Cucumber', label: 'Cucumber', group: 'toolsAndFrameworks' },
  { id: 'Cypress', label: 'Cypress', group: 'toolsAndFrameworks' },
  { id: 'Docker', label: 'Docker', group: 'toolsAndFrameworks' },
  { id: 'Figma', label: 'Figma', group: 'toolsAndFrameworks' },
  { id: 'Flutter', label: 'Flutter', group: 'toolsAndFrameworks' },
  { id: 'GCP', label: 'GCP', group: 'toolsAndFrameworks' },
  { id: 'Git', label: 'Git', group: 'toolsAndFrameworks' },
  { id: 'Gherkin', label: 'Gherkin', group: 'toolsAndFrameworks' },
  { id: 'HTML & CSS', label: 'HTML & CSS', group: 'toolsAndFrameworks' },
  { id: 'Java', label: 'Java', group: 'toolsAndFrameworks' },
  { id: 'JavaScript', label: 'JavaScript', group: 'toolsAndFrameworks' },
  { id: 'Jest', label: 'Jest', group: 'toolsAndFrameworks' },
  { id: 'MongoDB', label: 'MongoDB', group: 'toolsAndFrameworks' },
  { id: 'MySQL', label: 'MySQL', group: 'toolsAndFrameworks' },
  { id: 'NodeJS', label: 'NodeJS', group: 'toolsAndFrameworks' },
  { id: 'Python', label: 'Python', group: 'toolsAndFrameworks' },
  { id: 'React', label: 'React', group: 'toolsAndFrameworks' },
  { id: 'React Native', label: 'React Native', group: 'toolsAndFrameworks' },
  { id: "REST API's", label: "REST API's", group: 'toolsAndFrameworks' },
  { id: 'Salesforce', label: 'Salesforce', group: 'toolsAndFrameworks' },
  { id: 'Selenium', label: 'Selenium', group: 'toolsAndFrameworks' },
  { id: 'Sketch', label: 'Sketch', group: 'toolsAndFrameworks' },
  { id: 'SQL', label: 'SQL', group: 'toolsAndFrameworks' },
  { id: 'Xray', label: 'Xray', group: 'toolsAndFrameworks' },
  { id: 'Zephyr', label: 'Zephyr', group: 'toolsAndFrameworks' },
  { id: 'VMWare', label: 'VMWare', group: 'toolsAndFrameworks' },
  { id: 'Virtual Box', label: 'Virtual Box', group: 'toolsAndFrameworks' },
]

export type MentoringTopicKey = typeof MENTORING_TOPICS[number]['id']
export type MentoringTopicLabel = typeof MENTORING_TOPICS[number]['label']

export const MENTORING_TOPICS_MAP = Object.fromEntries(
  MENTORING_TOPICS.map((topic) => [topic.id, topic.label])
) as Record<MentoringTopicKey, MentoringTopicLabel>

// TODO: these are the **old** 'categories' (i.e. mentoring topics). To be deleted after
// we migrate to the above!
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
] as const
export type CategoryKey = typeof CATEGORIES[number]['id']
export type CategoryLabel = typeof CATEGORIES[number]['label']

export const CATEGORIES_MAP = Object.fromEntries(
  CATEGORIES.map((cat) => [cat.id, cat.label])
) as Record<CategoryKey, CategoryLabel>
