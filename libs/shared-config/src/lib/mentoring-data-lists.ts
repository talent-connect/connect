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

export const PROFESSIONAL_EXPERIENCE_FIELDS = {
  humanResourcesAndRecruiting: 'Human resources and recruiting',
  marketingSocialMediaAndSales: 'Marketing, social media and sales',
  projectAndProductManagement: 'Project and product management',
  requirementsAndBusinessAnalysis: 'Requirements and business analysis',
  softwareDevelopment: 'Software development',
  testingAndQa: 'Testing and QA',
  usabilityAndUiDesign: 'Usability and UI design',
} as const

export type ProfessionalExperienceFieldKey =
  keyof typeof PROFESSIONAL_EXPERIENCE_FIELDS

export const MENTORING_TOPIC_GROUPS = {
  overarchingTopics: '🌈 Overarching topics',
  productAndProjectManagement: '📋 Product and project management',
  softwareDevelopment: '👩‍💻 Software development',
  requirementsAnalysisAndResearch: '🧪 Requirements analysis and research',
  uxAndUiDesign: '🎨 UX and UI design',
  testingAndQualityAssurance: '🏎️ Testing and Quality Assurance',
  toolsAndFrameworks: '🛠️ Tools and frameworks',
} as const

export const MENTORING_TOPICS = [
  {
    id: 'applicationProcessAndPortfolio',
    label: 'Application process and portfolio',
    group: 'overarchingTopics',
  },
  { id: 'communication', label: 'Communication', group: 'overarchingTopics' },
  {
    id: 'crossCulturalTeams',
    label: 'Cross-cultural teams',
    group: 'overarchingTopics',
  },
  {
    id: 'crossFunctionalWork',
    label: 'Cross-functional work',
    group: 'overarchingTopics',
  },
  { id: 'facilitation', label: 'Facilitation', group: 'overarchingTopics' },
  {
    id: 'givingReceivingFeedback',
    label: 'Giving / receiving feedback',
    group: 'overarchingTopics',
  },
  {
    id: 'marketingAndSocialMedia',
    label: 'Marketing and social media',
    group: 'overarchingTopics',
  },
  { id: 'sales', label: 'Sales', group: 'overarchingTopics' },
  {
    id: 'selfOrganisation',
    label: 'Self-organisation',
    group: 'overarchingTopics',
  },
  {
    id: 'socialNetworkProfileTuning',
    label: 'Social network profile tuning',
    group: 'overarchingTopics',
  },
  {
    id: 'storytellingAndPresentation',
    label: 'Storytelling and presentation',
    group: 'overarchingTopics',
  },
  {
    id: 'teamLeadership',
    label: 'Team leadership',
    group: 'overarchingTopics',
  },
  {
    id: 'agileFrameworks',
    label: 'Agile frameworks',
    group: 'productAndProjectManagement',
  },
  {
    id: 'budgetCalculation',
    label: 'Budget calculation',
    group: 'productAndProjectManagement',
  },
  {
    id: 'businessDevelopment',
    label: 'Business development',
    group: 'productAndProjectManagement',
  },
  {
    id: 'changeManagement',
    label: 'Change management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'enterpriseArchitectureManagement',
    label: 'Enterprise architecture management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'marketResearch',
    label: 'Market research',
    group: 'productAndProjectManagement',
  },
  {
    id: 'planningAndRoadmaps',
    label: 'Planning and roadmaps',
    group: 'productAndProjectManagement',
  },
  {
    id: 'prioritisationMetrics',
    label: 'Prioritisation metrics',
    group: 'productAndProjectManagement',
  },
  {
    id: 'productBacklogManagement',
    label: 'Product Backlog management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'productManagement',
    label: 'Product management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'projectManagement',
    label: 'Project management',
    group: 'productAndProjectManagement',
  },
  {
    id: 'androidMobileDevelopment',
    label: 'Android Mobile Development',
    group: 'softwareDevelopment',
  },
  {
    id: 'basicProgrammingSkills',
    label: 'Basic programming skills',
    group: 'softwareDevelopment',
  },
  {
    id: 'computerNetworking',
    label: 'Computer networking',
    group: 'softwareDevelopment',
  },
  {
    id: 'crossBrowserDevelopment',
    label: 'Cross-browser development',
    group: 'softwareDevelopment',
  },
  {
    id: 'dataAnalytics',
    label: 'Data analytics',
    group: 'softwareDevelopment',
  },
  {
    id: 'databaseManagement',
    label: 'Database management',
    group: 'softwareDevelopment',
  },
  {
    id: 'devopsAndCloud',
    label: 'DevOps and Cloud',
    group: 'softwareDevelopment',
  },
  {
    id: 'hybridAppDevelopment',
    label: 'Hybrid App Development',
    group: 'softwareDevelopment',
  },
  {
    id: 'hardwareAndNetworks',
    label: 'Hardware and networks',
    group: 'softwareDevelopment',
  },
  { id: 'iot', label: 'IoT', group: 'softwareDevelopment' },
  {
    id: 'iosMobileDevelopment',
    label: 'iOS Mobile Development',
    group: 'softwareDevelopment',
  },
  {
    id: 'machineLearning',
    label: 'Machine learning',
    group: 'softwareDevelopment',
  },

  {
    id: 'dataAnalysis',
    label: 'Data analysis',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'designResearch',
    label: 'Design research',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'designThinking',
    label: 'Design Thinking',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'domainDrivenDesign',
    label: 'Domain driven design',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'mappingCustomerExperience',
    label: 'Mapping customer experience',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'prioritisationMetrics',
    label: 'Prioritisation metrics',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'processModelling',
    label: 'Process modelling',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'softwareDevelopmentLifeCycle',
    label: 'Software Development Life Cycle',
    group: 'requirementsAndBusinessAnalysis',
  },
  {
    id: 'technicalWriting',
    label: 'Technical writing',
    group: 'requirementsAndBusinessAnalysis',
  },
  { id: 'animation', label: 'Animation', group: 'uxAndUiDesign' },
  { id: 'branding', label: 'Branding', group: 'uxAndUiDesign' },
  {
    id: 'generalUserExperience',
    label: 'General user experience',
    group: 'uxAndUiDesign',
  },
  { id: 'graphicDesign', label: 'Graphic Design', group: 'uxAndUiDesign' },
  {
    id: 'informationArchitecture',
    label: 'Information architecture',
    group: 'uxAndUiDesign',
  },
  {
    id: 'interactionDesign',
    label: 'Interaction design',
    group: 'uxAndUiDesign',
  },
  {
    id: 'prototypingAndWireframing',
    label: 'Prototyping and wireframing',
    group: 'uxAndUiDesign',
  },
  {
    id: 'responsiveDesign',
    label: 'Responsive design',
    group: 'uxAndUiDesign',
  },
  {
    id: 'typographyColorTheory',
    label: 'Typography / color theory',
    group: 'uxAndUiDesign',
  },
  {
    id: 'automatedSoftwareTesting',
    label: 'Automated software testing',
    group: 'testingAndQa',
  },
  {
    id: 'behaviorDrivenDevelopment',
    label: 'Behavior-driven development',
    group: 'testingAndQa',
  },
  {
    id: 'crossBrowserTesting',
    label: 'Cross-browser testing',
    group: 'testingAndQa',
  },
  {
    id: 'functionalTesting',
    label: 'Functional Testing',
    group: 'testingAndQa',
  },
  {
    id: 'softwareTestingMethodologies',
    label: 'Software testing methodologies',
    group: 'testingAndQa',
  },
  {
    id: 'testDrivenDevelopment',
    label: 'Test-driven development',
    group: 'testingAndQa',
  },
  { id: 'testPlanning', label: 'Test planning', group: 'testingAndQa' },
  { id: 'testManagement', label: 'Test management', group: 'testingAndQa' },
  { id: 'usabilityTesting', label: 'Usability testing', group: 'testingAndQa' },
  { id: 'atlassianJira', label: 'Atlassian Jira', group: 'toolsAndFrameworks' },
  { id: 'aws', label: 'AWS', group: 'toolsAndFrameworks' },
  { id: 'azure', label: 'Azure', group: 'toolsAndFrameworks' },
  {
    id: 'balsamiqMockup',
    label: 'Balsamiq Mockup',
    group: 'toolsAndFrameworks',
  },
  { id: 'blockchain', label: 'Blockchain', group: 'toolsAndFrameworks' },
  { id: 'cucumber', label: 'Cucumber', group: 'toolsAndFrameworks' },
  { id: 'cypress', label: 'Cypress', group: 'toolsAndFrameworks' },
  { id: 'docker', label: 'Docker', group: 'toolsAndFrameworks' },
  { id: 'figma', label: 'Figma', group: 'toolsAndFrameworks' },
  { id: 'flutter', label: 'Flutter', group: 'toolsAndFrameworks' },
  { id: 'gcp', label: 'GCP', group: 'toolsAndFrameworks' },
  { id: 'git', label: 'Git', group: 'toolsAndFrameworks' },
  { id: 'gherkin', label: 'Gherkin', group: 'toolsAndFrameworks' },
  { id: 'htmlCss', label: 'HTML & CSS', group: 'toolsAndFrameworks' },
  { id: 'java', label: 'Java', group: 'toolsAndFrameworks' },
  { id: 'javascript', label: 'JavaScript', group: 'toolsAndFrameworks' },
  { id: 'jest', label: 'Jest', group: 'toolsAndFrameworks' },
  { id: 'mongodb', label: 'MongoDB', group: 'toolsAndFrameworks' },
  { id: 'mysql', label: 'MySQL', group: 'toolsAndFrameworks' },
  { id: 'nodejs', label: 'NodeJS', group: 'toolsAndFrameworks' },
  { id: 'python', label: 'Python', group: 'toolsAndFrameworks' },
  { id: 'react', label: 'React', group: 'toolsAndFrameworks' },
  { id: 'reactNative', label: 'React Native', group: 'toolsAndFrameworks' },
  { id: 'restApis', label: "REST API's", group: 'toolsAndFrameworks' },
  { id: 'salesforce', label: 'Salesforce', group: 'toolsAndFrameworks' },
  { id: 'selenium', label: 'Selenium', group: 'toolsAndFrameworks' },
  { id: 'sketch', label: 'Sketch', group: 'toolsAndFrameworks' },
  { id: 'sql', label: 'SQL', group: 'toolsAndFrameworks' },
  { id: 'vmware', label: 'VMWare', group: 'toolsAndFrameworks' },
  { id: 'virtualBox', label: 'Virtual Box', group: 'toolsAndFrameworks' },
  { id: 'xray', label: 'Xray', group: 'toolsAndFrameworks' },
  { id: 'zephyr', label: 'Zephyr', group: 'toolsAndFrameworks' },
]

export type MentoringTopicKey = typeof CATEGORIES[number]['id']
export type MentoringTopicLabel = typeof CATEGORIES[number]['label']

export const MENTORING_TOPICS_MAP = Object.fromEntries(
  MENTORING_TOPICS.map((topic) => [topic.id, topic.label])
) as Record<MentoringTopicKey, MentoringTopicLabel>

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
