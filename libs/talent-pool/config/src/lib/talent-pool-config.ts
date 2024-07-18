import { DropdownOptions } from '@talent-connect/talent-pool/types'
import { keyBy, mapValues } from 'lodash'

export const desiredPositions: DropdownOptions = [
  {
    id: 'administrativeAssistant',
    label: 'Administrative Assistant',
  },
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
    id: 'blockchainDeveloper',
    label: 'Blockchain Developer',
  },
  {
    id: 'businessAnalyst',
    label: 'Business Analyst',
  },
  { id: 'cloudEngineer', label: 'Cloud Engineer' },
  { id: 'cloudSpecialist', label: 'Cloud Specialist' },
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
    id: 'digitalMarketer',
    label: 'Digital Marketer',
  },
  {
    id: 'embeddedSystemsEngineer',
    label: 'Embedded Systems Engineer',
  },
  {
    id: 'frontendDeveloper',
    label: 'Frontend Developer',
  },
  {
    id: 'fullstackDeveloper',
    label: 'Fullstack Developer',
  },
  { id: 'hardwareDeveloper', label: 'Hardware Developer' },
  { id: 'iotDeveloper', label: 'IoT Developer' },
  { id: 'itAdministrator', label: 'IT Administrator' },
  { id: 'itSpecialist', label: 'IT Specialist' },
  { id: 'itSupportTechnician', label: 'IT Support Technician' },
  {
    id: 'javaDeveloper',
    label: 'Java Developer',
  },
  { id: 'linuxSystemAdministrator', label: 'Linux System Administrator' },
  { id: 'marketingAssistant', label: 'Marketing Assistant' },
  { id: 'mobileDeveloperAndroid', label: 'Mobile Developer (Android)' },
  { id: 'mobileDeveloperIos', label: 'Mobile Developer (iOS)' },
  {
    id: 'nodeJsDeveloper',
    label: 'Node.js Developer',
  },
  {
    id: 'operationsManager',
    label: 'Operations Manager',
  },
  {
    id: 'productDesigner',
    label: 'Product Designer',
  },
  {
    id: 'productManager',
    label: 'Product Manager',
  },
  {
    id: 'projectAssistant',
    label: 'Project Assistant',
  },
  {
    id: 'projectManager',
    label: 'Project Manager',
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
    id: 'salesManager',
    label: 'Sales Manager',
  },
  {
    id: 'securityAdministrator',
    label: 'Security Administrator',
  },
  {
    id: 'SEO Manager',
    label: 'SEO Manager',
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
    label: 'Usability Engineer',
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
    label: 'Agile Methodology',
  },
  {
    id: 'applicationOperation',
    label: 'Application Operation',
  },
  {
    id: 'artificialIntellegence',
    label: 'Artificial Intelligence',
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
    id: 'cPlusPlus',
    label: 'C++',
  },
  { id: 'cad', label: 'CAD' },
  {
    id: 'camunda',
    label: 'Camunda',
  },
  {
    id: 'cloudApplications',
    label: 'Cloud Applications',
  },
  {
    id: 'cloudComputing',
    label: 'Cloud Computing',
  },
  {
    id: 'conceptDevelopment',
    label: 'Concept Development',
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
    label: 'Customer Service',
  },
  {
    id: 'customerSupport',
    label: 'Customer Support',
  },
  {
    id: 'dataAnalysis',
    label: 'Data Analysis',
  },
  {
    id: 'databaseDesign',
    label: 'Database Design',
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
    label: 'Domain Driven Design',
  },
  {
    id: 'domainModelling',
    label: 'Domain Modelling',
  },
  { id: 'embeddedSystems', label: 'Embedded Systems' },
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
    label: 'Google Cloud Platform',
  },
  {
    id: 'graphicDesign',
    label: 'Graphic Design',
  },
  { id: 'hardware', label: 'Hardware' },
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
    label: 'Illustrator',
  },
  {
    id: 'informationArchitecture',
    label: 'Information Architecture',
  },
  {
    id: 'interactionDesign',
    label: 'Interaction Design',
  },
  {
    id: 'invision',
    label: 'Invision',
  },
  { id: 'iot', label: 'IoT' },
  {
    id: 'itServiceManagement',
    label: 'IT Service Management',
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
    label: 'Kanban',
  },
  {
    id: 'leanPrinciples',
    label: 'Lean Principles',
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
    label: 'Microsoft Office',
  },
  {
    id: 'networkAdministration',
    label: 'Network Administration',
  },
  {
    id: 'networkDesign',
    label: 'Network Design',
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
    label: 'Operations Management',
  },
  {
    id: 'oracleDatabase',
    label: 'Oracle Database',
  },
  {
    id: 'php',
    label: 'PHP',
  },
  {
    id: 'problemSolving',
    label: 'Problem Solving',
  },
  {
    id: 'processModelling',
    label: 'Process Modelling',
  },
  {
    id: 'processOptimization',
    label: 'Process Optimization',
  },
  {
    id: 'productDevelopment',
    label: 'Product Development',
  },
  {
    id: 'productManagement',
    label: 'Product Management',
  },
  {
    id: 'programManagement',
    label: 'Program Management',
  },
  {
    id: 'projectManagement',
    label: 'Project Management',
  },
  {
    id: 'prototyping',
    label: 'Prototyping',
  },
  {
    id: 'python',
    label: 'Python',
  },
  {
    id: 'qualitativeResearch',
    label: 'Qualitative Research',
  },
  {
    id: 'qualityAssurance',
    label: 'Quality Assurance',
  },
  {
    id: 'qualityManagement',
    label: 'Quality Management',
  },
  {
    id: 'quantitativeResearch',
    label: 'Quantitative Research',
  },
  {
    id: 'rProgrammingLanguage',
    label: 'R (Programming Language)',
  },
  {
    id: 'reactJs',
    label: 'React.js',
  },
  {
    id: 'requirementsAnalysis',
    label: 'Requirements Analysis',
  },
  {
    id: 'responsiveWebDesign',
    label: 'Responsive Web Design',
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
    label: 'Software Architecture',
  },
  {
    id: 'softwareDevelopmentLifecycle',
    label: 'Software Development Lifecycle',
  },
  {
    id: 'sql',
    label: 'SQL',
  },
  {
    id: 'teamLeadership',
    label: 'Team Leadership',
  },
  {
    id: 'technicalSupport',
    label: 'Technical Support',
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
    label: 'Typography',
  },
  {
    id: 'uml',
    label: 'UML',
  },
  {
    id: 'usabilityTesting',
    label: 'Usability Testing',
  },
  {
    id: 'userExperience',
    label: 'User Experience',
  },
  {
    id: 'userStoryMapping',
    label: 'User Story Mapping',
  },
  {
    id: 'userCenteredDesign',
    label: 'User-Centered Design',
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
    label: 'X-Ray',
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

export const employmentTypes = [
  { id: 'partTime', label: 'Part-time employment' },
  { id: 'fullTime', label: 'Full-time employment' },
  { id: 'werkstudium', label: 'Werkstudent*in (working student position)' },
  { id: 'Internship', label: 'Internship' },
  { id: 'apprenticeshipAusbildung', label: 'Apprenticeship (Ausbildung)' },
  { id: 'freelance', label: 'Freelance' },
  { id: 'contract', label: 'Contract' },
  { id: 'traineeship', label: 'Traineeship' },
  { id: 'dualStudyBachelor', label: 'Dual Study Bachelor' },
  { id: 'dualStudyMaster', label: 'Dual Study Master' },
  { id: 'projectBased', label: 'Project-based work' },
]

export const employmentTypesIdToLabelMap = mapValues(
  keyBy(employmentTypes, 'id'),
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

export const certificationTypes: DropdownOptions = [
  { id: 'confirmationOfAttendance', label: 'Confirmation of attendance' },
  { id: 'professionalCertification', label: 'Professional certification' },
  { id: 'rediSchoolCourse', label: 'ReDI School Course' },
  { id: 'universityDegreeDiploma', label: 'University degree / diploma' },
  { id: 'other', label: 'Other' },
]

export const certificationTypesIdToLabelMap = mapValues(
  keyBy(certificationTypes, 'id'),
  'label'
)

export const immigrationStatusOptions: DropdownOptions = [
  {
    label:
      'EU-Citizenship or unlimited residence permission (Niederlassungserlaubnis)',
    id: 'euCitizenshipOrUnlimitedResidencePermissionNiederlassungserlaubnis',
  },
  { label: 'EU Blue card (Blaue Karte)', id: 'euBlueCardBlaueKarte' },
  {
    label: 'Temporary residence permission (Aufenthaltstitel) ',
    id: 'temporaryResidencePermissionAufenthaltstitel',
  },
  {
    label: 'Visa (Nationalvisum or Jobseeker visum)',
    id: 'visaNationalvisumOrJobseekerVisum',
  },
  { label: 'Student visa ', id: 'studentVisa' },
  { label: 'Schengen visa', id: 'schengenVisa' },
]

export const immigrationStatusOptionsIdToLabelMap = mapValues(
  keyBy(immigrationStatusOptions, 'id'),
  'label'
)

export const formMonths = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

export const formMonthsOptions = Object.entries(formMonths).map(
  ([value, label]) => ({
    value,
    label,
  })
)

export const howDidHearAboutRediOptions = {
  REDI_TEAM_MEMBER: 'ReDI Team Member',
  REDI_STUDENT_ALUMNI: 'Redi Student/Alumni',
  REDI_WEBSITE: 'ReDI Website',
  COLLEGUE: 'A Colleague',
  ALREADY_VOLUNTEER_AT_REDI: 'I am a volunteer at ReDI School',
  INTERNET_SEARCH: 'Internet Search',
  SOCIAL_MEDIA: 'Social Media',
  OTHER: 'Other',
} as const

export const germanFederalStates = {
  BADEN_WUERTTEMBERG: 'Baden-Württemberg',
  BAYERN: 'Bayern',
  BERLIN: 'Berlin',
  BRANDENBURG: 'Brandenburg',
  BREMEN: 'Bremen',
  HAMBURG: 'Hamburg',
  HESSEN: 'Hessen',
  MECKLENBURG_VORPOMMERN: 'Mecklenburg-Vorpommern',
  NIEDERSACHSEN: 'Niedersachsen',
  NORDRHEIN_WESTFALEN: 'Nordrhein-Westfalen',
  RHEINLAND_PFALZ: 'Rheinland-Pfalz',
  SAARLAND: 'Saarland',
  SACHSEN: 'Sachsen',
  SACHSEN_ANHALT: 'Sachsen-Anhalt',
  SCHLESWIG_HOLSTEIN: 'Schleswig-Holstein',
  THUERINGEN: 'Thüringen',
  OUTSIDE_GERMANY: 'Outside Germany',
} as const
