import { DropdownOptions } from '@talent-connect/talent-pool/types'
import { keyBy, mapValues } from 'lodash'

export const desiredPositions: DropdownOptions = [
  {
    id: 'agileScrumCoach',
    label: 'Agile/SCRUM Coach',
  },
  {
    id: 'azureSpecialist',
    label: 'Azure Specialist',
  },
  {
    id: 'backendDeveloper',
    label: 'Backend Developer',
  },
  {
    id: 'businessAnalyst',
    label: 'Business Analyst',
  },
  {
    id: 'dataAnalyst',
    label: 'Data Analyst',
  },
  {
    id: 'dataScientist',
    label: 'Data Scientist',
  },
  {
    id: 'devOpsSpecialist',
    label: 'DevOps Specialist',
  },
  {
    id: 'frontendDeveloper',
    label: 'Frontend Developer',
  },
  {
    id: 'fullstackDeveloper',
    label: 'Fullstack Developer',
  },
  {
    id: 'javaDeveloper',
    label: 'Java Developer',
  },
  {
    id: 'nodeJsDeveloper',
    label: 'Node.js Developer',
  },
  {
    id: 'productDesigner',
    label: 'Product Designer',
  },
  {
    id: 'pythonDeveloper',
    label: 'Python Developer',
  },
  {
    id: 'qaEngineer',
    label: 'QA Engineer',
  },
  {
    id: 'reactDeveloper',
    label: 'React Developer',
  },
  {
    id: 'requirementsEngineer',
    label: 'Requirements Engineer',
  },
  {
    id: 'salesforceAdministrator',
    label: 'Salesforce Administrator',
  },
  {
    id: 'systemEngineer',
    label: 'System Engineer',
  },
  {
    id: 'technicalArchitect',
    label: 'Technical Architect',
  },
  {
    id: 'uiDesigner',
    label: 'UI Designer',
  },
  {
    id: 'uiDeveloper',
    label: 'UI Developer',
  },
  {
    id: 'uiUxDesigner',
    label: 'UI/UX Designer',
  },
  {
    id: 'usabilityengineer',
    label: 'Usability engineer',
  },
  {
    id: 'userResearcher',
    label: 'User Researcher',
  },
  {
    id: 'uxDesigner',
    label: 'UX Designer',
  },
]

export const desiredPositionsIdToLabelMap = mapValues(
  keyBy(desiredPositions, 'id'),
  'label'
)

export const topSkills = [
  {
    id: 'netFramework',
    label: '.NET Framework',
  },
  {
    id: 'adobeCreativeSuite',
    label: 'Adobe Creative Suite',
  },
  {
    id: 'adobePhotoshop',
    label: 'Adobe Photoshop',
  },
  {
    id: 'agileMethodology',
    label: 'Agile methodology',
  },
  {
    id: 'applicationOperation',
    label: 'Application operation ',
  },
  {
    id: 'artificialIntellegence',
    label: 'Artificial Intellegence ',
  },
  {
    id: 'aspNet',
    label: 'ASP.NET',
  },
  {
    id: 'atlassianConfluence',
    label: 'Atlassian Confluence',
  },
  {
    id: 'atlassianJira',
    label: 'Atlassian Jira',
  },
  {
    id: 'atlassianSuite',
    label: 'Atlassian Suite',
  },
  {
    id: 'aws',
    label: 'AWS',
  },
  {
    id: 'balsamiqMockup',
    label: 'Balsamiq Mockup',
  },
  {
    id: 'bpmn',
    label: 'BPMN',
  },
  {
    id: 'c',
    label: 'C#',
  },
  {
    id: 'c',
    label: 'C++',
  },
  {
    id: 'camunda',
    label: 'Camunda ',
  },
  {
    id: 'cloudApplications',
    label: 'Cloud applications',
  },
  {
    id: 'cloudComputing',
    label: 'Cloud computing ',
  },
  {
    id: 'conceptDevelopment',
    label: 'Concept development ',
  },
  {
    id: 'crm',
    label: 'CRM',
  },
  {
    id: 'css',
    label: 'CSS',
  },
  {
    id: 'customerService',
    label: 'Customer service',
  },
  {
    id: 'customerSupport',
    label: 'Customer support',
  },
  {
    id: 'dataAnalysis',
    label: 'Data analysis ',
  },
  {
    id: 'databaseDesign',
    label: 'Database design ',
  },
  {
    id: 'designThinking',
    label: 'Design Thinking',
  },
  {
    id: 'devOps',
    label: 'DevOps',
  },
  {
    id: 'domainDrivenDesign',
    label: 'Domain Driven Design ',
  },
  {
    id: 'domainModelling',
    label: 'Domain Modelling',
  },
  {
    id: 'figma',
    label: 'Figma',
  },
  {
    id: 'git',
    label: 'Git',
  },
  {
    id: 'googleCloudPlatform',
    label: 'Google cloud Platform ',
  },
  {
    id: 'graphicDesign',
    label: 'Graphic design',
  },
  {
    id: 'hpAlm',
    label: 'HP ALM',
  },
  {
    id: 'hpQualityCenter',
    label: 'HP Quality Center',
  },
  {
    id: 'html',
    label: 'HTML',
  },
  {
    id: 'illustrator',
    label: 'Illustrator ',
  },
  {
    id: 'informationArchitecture',
    label: 'Information architecture',
  },
  {
    id: 'interactionDesign',
    label: 'Interaction design ',
  },
  {
    id: 'invision',
    label: 'Invision',
  },
  {
    id: 'itServiceManagement',
    label: 'IT Service management',
  },
  {
    id: 'itil',
    label: 'ITIL',
  },
  {
    id: 'java',
    label: 'Java',
  },
  {
    id: 'javaScript',
    label: 'JavaScript',
  },
  {
    id: 'kafka',
    label: 'Kafka',
  },
  {
    id: 'kanban',
    label: 'Kanban ',
  },
  {
    id: 'leanPrinciples',
    label: 'Lean principles',
  },
  {
    id: 'linux',
    label: 'Linux',
  },
  {
    id: 'macOsServer',
    label: 'MacOS Server',
  },
  {
    id: 'microsoftAzure',
    label: 'Microsoft Azure',
  },
  {
    id: 'microsoftOffice',
    label: 'Microsoft Office ',
  },
  {
    id: 'networkAdministration',
    label: 'Network Administration ',
  },
  {
    id: 'networkDesign',
    label: 'Network Design ',
  },
  {
    id: 'networkSecurity',
    label: 'Network Security',
  },
  {
    id: 'nodeJs',
    label: 'Node.js',
  },
  {
    id: 'operationsManagement',
    label: 'Operations management',
  },
  {
    id: 'oracleDatabase',
    label: 'Oracle database ',
  },
  {
    id: 'php',
    label: 'PHP',
  },
  {
    id: 'problemSolving',
    label: 'Problem solving',
  },
  {
    id: 'processModelling',
    label: 'Process modelling ',
  },
  {
    id: 'processOptimization',
    label: 'Process optimization',
  },
  {
    id: 'productDevelopment',
    label: 'Product development',
  },
  {
    id: 'productManagement',
    label: 'Product management',
  },
  {
    id: 'programManagement',
    label: 'Program management',
  },
  {
    id: 'projectManagement',
    label: 'Project management',
  },
  {
    id: 'prototyping',
    label: 'Prototyping ',
  },
  {
    id: 'python',
    label: 'Python',
  },
  {
    id: 'qualitativeResearch',
    label: 'Qualitative research',
  },
  {
    id: 'qualityAssurance',
    label: 'Quality assurance',
  },
  {
    id: 'qualityManagement',
    label: 'Quality management',
  },
  {
    id: 'quantitativeResearch',
    label: 'Quantitative research',
  },
  {
    id: 'rProgrammingLanguage',
    label: 'R (Programming language)',
  },
  {
    id: 'reactJs',
    label: 'React.js',
  },
  {
    id: 'requirementsAnalysis',
    label: 'Requirements analysis ',
  },
  {
    id: 'responsiveWebDesign',
    label: 'Responsive Web design',
  },
  {
    id: 'salesforce',
    label: 'Salesforce',
  },
  {
    id: 'sapProducts',
    label: 'SAP Products',
  },
  {
    id: 'scrum',
    label: 'Scrum',
  },
  {
    id: 'sketch',
    label: 'Sketch',
  },
  {
    id: 'sketching',
    label: 'Sketching',
  },
  {
    id: 'softwareArchitecture',
    label: 'Software architecture',
  },
  {
    id: 'softwareDevelopmentLifecycle',
    label: 'Software development lifecycle',
  },
  {
    id: 'sql',
    label: 'SQL',
  },
  {
    id: 'teamLeadership',
    label: 'Team leadership',
  },
  {
    id: 'technicalSupport',
    label: 'Technical support',
  },
  {
    id: 'testing',
    label: 'Testing',
  },
  {
    id: 'troubleshooting',
    label: 'Troubleshooting',
  },
  {
    id: 'typography',
    label: 'Typography ',
  },
  {
    id: 'uml',
    label: 'UML',
  },
  {
    id: 'usabilityTesting',
    label: 'Usability testing',
  },
  {
    id: 'userExperience',
    label: 'User Experience',
  },
  {
    id: 'userStoryMapping',
    label: 'User story mapping',
  },
  {
    id: 'userCenteredDesign',
    label: 'User-centered design ',
  },
  {
    id: 'visualBasic',
    label: 'Visual Basic',
  },
  {
    id: 'vmWare',
    label: 'VMWare',
  },
  {
    id: 'webApplications',
    label: 'Web Applications',
  },
  {
    id: 'webDesign',
    label: 'Web Design',
  },
  {
    id: 'webDevelopment',
    label: 'Web Development',
  },
  {
    id: 'webServices',
    label: 'Web Services',
  },
  {
    id: 'windowsServer',
    label: 'Windows Server',
  },
  {
    id: 'wireframes',
    label: 'Wireframes',
  },
  {
    id: 'xRay',
    label: 'X-ray',
  },
  {
    id: 'xml',
    label: 'XML',
  },
  {
    id: 'zephyr',
    label: 'Zephyr',
  },
]

export const topSkillsIdToLabelMap = mapValues(keyBy(topSkills, 'id'), 'label')

export const languageProficiencyLevels: DropdownOptions = [
  { id: 'elementaryProficiency', label: 'Elementary proficiency' },
  { id: 'limitedWorkingProficiency', label: 'Limited working proficiency' },
  { id: 'fullWorkingProficiency', label: 'Full working proficiency' },
  {
    id: 'nativeOrBilingualProficiency',
    label: 'Native or bilingual proficiency',
  },
]

export const languageProficiencyLevelsIdToLabelMap = mapValues(
  keyBy(languageProficiencyLevels, 'id'),
  'label'
)

export const yearsOfRelevantExperienceOptions: DropdownOptions = [
  { id: 'none', label: 'None' },
  { id: '1', label: '1 year' },
  { id: '2', label: '2 years' },
  { id: '3', label: '3 years' },
  { id: '4', label: '4 years' },
  { id: '5', label: '5 years' },
  { id: '6', label: '6 years' },
  { id: '7', label: '7 years' },
  { id: '8', label: '8 years' },
  { id: '9', label: '9 years' },
  { id: '10', label: '10 years' },
  { id: '11', label: '11 years' },
  { id: '12', label: '12 years' },
  { id: '13', label: '13 years' },
  { id: '14', label: '14 years' },
  { id: '15', label: '15 years' },
  { id: '16', label: '16 years' },
  { id: '17', label: '17 years' },
  { id: '18', label: '18 years' },
  { id: '19', label: '19 years' },
  { id: '20OrMore', label: '20 or more years' },
]

export const desiredEmploymentTypeOptions = [
  { id: 'partTime', label: 'Part-time employment' },
  { id: 'fullTime', label: 'Full-time employment' },
  { id: 'werkstudium', label: 'Werkstudium' },
  { id: 'Internship', label: 'Internship' },
]

export const desiredEmploymentTypeOptionsIdToLabelMap = mapValues(
  keyBy(desiredEmploymentTypeOptions, 'id'),
  'label'
)

export const availabilityOptions = [
  { id: 'immediately', label: 'Immediately' },
  { id: 'oneMonthNotice', label: 'One month notice' },
  { id: 'twoMonthNotice', label: 'Two months notice' },
  { id: 'threeMonthNotice', label: 'Three months notice' },
  { id: 'date', label: 'Date' },
]

export const availabilityOptionsIdToLabelMap = mapValues(
  keyBy(availabilityOptions, 'id'),
  'label'
)
