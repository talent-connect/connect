'use strict'

const app = require('../server/server.js')
const _ = require('lodash')
const fp = require('lodash/fp')
const Rx = require('rxjs')
const {
  concatMap,
  switchMap,
  switchMapTo,
  tap,
  toArray,
  delay,
  mergeMap,
} = require('rxjs/operators')
const moment = require('moment')

const {
  RedUser,
  RedProfile,
  RedMatch,
  RedMentoringSession,
  AccessToken,
  Role,
  RoleMapping,
} = app.models

function pickRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}
function pickRandomArrayElements(array, maxCount) {
  const count = maxCount
    ? maxCount
    : randomNumberInRange(1, Math.min(array.length))
  return _.sampleSize(array, count)
}
function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const personsRaw = require('./random-names.json')
const persons = []
personsRaw.forEach((person) => {
  for (let i = 1; i <= 5; i++) {
    persons.push({
      name: `${person.name}${i}`,
      surname: `${person.surname}${i}`,
      gender: person.gender,
      region: person.region,
    })
  }
})

const MENTORING_GOALS = {
  buildingAProfessionalNetwork: 'Building a professional network',
  jobSearchAndApplicationProcess: 'Job search and application process',
  entrepreneurshipAndFreelancing: 'Entrepreneurship and freelancing',
  tutoringInAParticularSkillTool: 'Tutoring in a particular skill / tool',
  careerOrientatioPlanning: 'Career orientation & planning',
  preparationForACertificationInterview:
    'Preparation for a certification / interview',
}
const mentoringGoalsKeys = Object.keys(MENTORING_GOALS)

const DESIRED_ROLES = {
  marketingSocialMediaAndSales: 'Marketing, social media and sales',
  productAndProjectManagement: 'Product and project management',
  requirementsAnalysisAndResearch: 'Requirements analysis and research',
  softwareDevelopment: 'Software development',
  uxAndUiDesign: 'UX and UI design',
  testingAndQualityAssurance: 'Testing and Quality Assurance',
  // other: 'Other', // specifically commented out as there are no
  // mentoring topics in the group 'other'. It causes issues when seeding
}
const desiredRolesKeys = Object.keys(DESIRED_ROLES)

const FIELDS_OF_EXPERTISE = {
  humanResourcesAndRecruiting: 'Human resources and recruiting',
  ...DESIRED_ROLES,
}
const fieldsOfExpertiseKeys = Object.keys(FIELDS_OF_EXPERTISE)

const MENTORING_TOPICS = [
  {
    id: 'Application process and portfolio',
    label: 'Application process and portfolio',
    group: 'overarchingTopics',
  },
  { id: 'Communication', label: 'Communication', group: 'overarchingTopics' },
  {
    id: 'Cross-cultural teams',
    label: 'Cross-cultural teams',
    group: 'overarchingTopics',
  },
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
const mentoringTopicsKeys = MENTORING_TOPICS.map((topic) => topic.id)
const mentoringTopicsByDesiredRole = _.groupBy(MENTORING_TOPICS, 'group')

const categories = [
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
  { id: 'basicGerman', label: 'Basic German �~_~G��~_~G�', group: 'language' },
  {
    id: 'businessGerman',
    label: 'Business German �~_~G��~_~G�',
    group: 'language',
  },
  { id: 'english', label: 'English �~_~G��~_~G�', group: 'language' },
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
].map((p) => p.id)

const Languages = ['German', 'Arabic', 'Farsi', 'Tigrinya']

const genders = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
]

const menteeCountCapacityOptions = [1, 2, 3, 4]

const educationLevels = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' },
]

const courses = [
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
]

const menteeOccupationCategories = [
  { id: 'job', label: 'Job (full-time/part-time)' },
  { id: 'student', label: 'Student (enrolled at university)' },
  { id: 'lookingForJob', label: 'Looking for a job' },
  { id: 'other', label: 'Other' },
]
const menteeOccupationCategoriesIds = menteeOccupationCategories.map(
  (v) => v.id
)

const randomString = (charset = 'abcdefghijklmnopqrstuvwxyz', length = 10) => {
  let str = ''
  for (let i = 0; i < length; i++) {
    str += charset[Math.floor(Math.random() * (charset.length - 1))]
  }
  return str
}

const pickRandomUserType = () => {
  const possibleUserTypes = [
    'mentor',
    'mentee',
    'public-sign-up-mentor-pending-review',
    'public-sign-up-mentee-pending-review',
  ]
  const randomIndex = Math.floor(Math.random() * possibleUserTypes.length)
  return possibleUserTypes[randomIndex]
}

const addMentorSpecificProperties = (profile) => {
  profile.mentor_mentoringTopics = pickRandomArrayElements(
    mentoringTopicsKeys,
    6
  )
  profile.mentor_mentoringGoals = pickRandomArrayElements(mentoringGoalsKeys, 2)
  profile.mentor_professionalExperienceFields = pickRandomArrayElements(
    fieldsOfExpertiseKeys,
    2
  )
  return profile
}

const addMenteeSpecificProperties = (profile) => {
  profile.mentee_mentoringGoal = pickRandomArrayElement(mentoringGoalsKeys)
  profile.mentee_overarchingMentoringTopics = pickRandomArrayElements(
    mentoringTopicsByDesiredRole['overarchingTopics'].map((p) => p.id),
    3
  )
  profile.mentee_primaryRole_fieldOfExpertise =
    pickRandomArrayElement(desiredRolesKeys)
  if (
    !mentoringTopicsByDesiredRole[profile.mentee_primaryRole_fieldOfExpertise]
  ) {
    console.log(profile.mentee_primaryRole_fieldOfExpertise)
    console.log(
      mentoringTopicsByDesiredRole[profile.mentee_primaryRole_fieldOfExpertise]
    )
  }
  profile.mentee_primaryRole_mentoringTopics = pickRandomArrayElements(
    mentoringTopicsByDesiredRole[
      profile.mentee_primaryRole_fieldOfExpertise
    ].map((p) => p.id),
    3
  )
  profile.mentee_secondaryRole_fieldOfExpertise =
    pickRandomArrayElement(desiredRolesKeys)
  if (
    !mentoringTopicsByDesiredRole[profile.mentee_secondaryRole_fieldOfExpertise]
  ) {
    console.log(profile.mentee_secondaryRole_fieldOfExpertise)
    console.log(
      mentoringTopicsByDesiredRole[
        profile.mentee_secondaryRole_fieldOfExpertise
      ]
    )
  }
  profile.mentee_secondaryRole_mentoringTopics = pickRandomArrayElements(
    mentoringTopicsByDesiredRole[
      profile.mentee_secondaryRole_fieldOfExpertise
    ].map((p) => p.id),
    3
  )
  profile.mentee_toolsAndFrameworks_mentoringTopics = pickRandomArrayElements(
    mentoringTopicsByDesiredRole['toolsAndFrameworks'].map((p) => p.id),
    6
  )

  return profile
}

const users = fp.compose(
  fp.take(1000),
  fp.map(({ name, surname, gender }) => {
    const rediLocation =
      Math.random() > 0.5 ? 'berlin' : Math.random() > 0.5 ? 'munich' : 'nrw'
    const email = randomString() + '@' + randomString() + '.com'
    const password = email
    const profile = {
      redUser: {
        email,
        password,
      },
      redProfile: {
        rediLocation: rediLocation,
        userActivated: true,
        userType: pickRandomUserType(),
        gender,
        firstName: name,
        lastName: surname,
        birthDate: moment(
          '01.01.' + (new Date().getFullYear() - _.random(18, 100, false)),
          'DD.MM.YYYY'
        ),
        mentor_occupation: randomString(),
        mentor_workPlace: randomString(),
        mentee_occupationCategoryId:
          menteeOccupationCategoriesIds[
            Math.floor(Math.random() * menteeOccupationCategoriesIds.length)
          ],
        mentee_occupationJob_placeOfEmployment: randomString(),
        mentee_occupationJob_position: randomString(),
        mentee_occupationStudent_studyPlace: randomString(),
        mentee_occupationStudent_studyName: randomString(),
        mentee_occupationLookingForJob_what: randomString(),
        mentee_occupationOther_description: randomString(),
        profileAvatarImageS3Key:
          'c1774822-9495-4bd6-866a-bf4d28aaddc8_ScreenShot2019-03-12at22.22.20.png',
        languages: ['English'].concat(
          Languages.filter(() => Math.random() > 0.5)
        ),
        otherLanguages: randomString(),
        personalDescription: randomString(undefined, 300),
        contactEmail: email,
        slackUsername: randomString(),
        githubProfileUrl: randomString(),
        telephoneNumber: randomString(),
        categories: categories
          .map((c) => c.id)
          .filter(() => Math.random() < 0.5),
        menteeCountCapacity: Math.floor(Math.random() * 4),
        mentee_highestEducationLevel:
          educationLevels[Math.floor(Math.random() * educationLevels.length)]
            .id,
        mentee_currentlyEnrolledInCourse:
          courses[Math.floor(Math.random() * courses.length)].id,
      },
    }
    if (profile.redProfile.userType.indexOf('mentee') !== -1) {
      addMenteeSpecificProperties(profile.redProfile)
    } else {
      addMentorSpecificProperties(profile.redProfile)
    }
    return profile
  })
)(persons)

const accessTokenDestroyAll = Rx.bindNodeCallback(
  AccessToken.destroyAll.bind(AccessToken)
)
const roleDestroyAll = Rx.bindNodeCallback(Role.destroyAll.bind(Role))
const roleMappingDestroyAll = Rx.bindNodeCallback(
  RoleMapping.destroyAll.bind(RoleMapping)
)

const redUserDestroyAll = Rx.bindNodeCallback(RedUser.destroyAll.bind(RedUser))
const redProfileDestroyAll = Rx.bindNodeCallback(
  RedProfile.destroyAll.bind(RedProfile)
)
const redMatchDestroyAll = Rx.bindNodeCallback(
  RedMatch.destroyAll.bind(RedMatch)
)
const redMentoringSessionDestroyAll = Rx.bindNodeCallback(
  RedMentoringSession.destroyAll.bind(RedMentoringSession)
)

const redMatchCreate = (redMatch) =>
  Rx.bindNodeCallback(RedMatch.create.bind(RedMatch))(redMatch)
const redUserCreate = (redUser) =>
  Rx.bindNodeCallback(RedUser.create.bind(RedUser))(redUser)
const redProfileCreateOnRedUser = (redUserInst) => (redProfile) =>
  Rx.bindNodeCallback(redUserInst.redProfile.create.bind(redUserInst))(
    redProfile
  )

const ericMenteeRedUser = {
  password: 'career+testmentee@redi-school.org',
  email: 'career+testmentee@redi-school.org',
}
const ericMenteeRedProfile = {
  rediLocation: 'berlin',
  userActivated: true,
  userType: 'mentee',
  mentor_occupation: 'Test',
  mentor_workPlace: 'Test',
  mentee_occupationCategoryId: 'job',
  mentee_occupationJob_placeOfEmployment: randomString(),
  mentee_occupationJob_position: randomString(),
  mentee_occupationStudent_studyPlace: randomString(),
  mentee_occupationStudent_studyName: randomString(),
  mentee_occupationLookingForJob_what: randomString(),
  mentee_occupationOther_description: randomString(),
  profileAvatarImageS3Key:
    'c1774822-9495-4bd6-866a-bf4d28aaddc8_ScreenShot2019-03-12at22.22.20.png',
  firstName: 'Mentee',
  lastName: 'ReDI Person',
  birthDate: moment(
    '01.01.' + (new Date().getFullYear() - _.random(18, 100, false)),
    'DD.MM.YYYY'
  ),
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'career+testmentee@redi-school.orgcareer+testmentee@redi-school.orgcareer+testmentee@redi-school.orgcareer+testmentee@redi-school.orgcareer+testmentee@redi-school.orgcareer+testmentee@redi-school.orgcareer+testmentee@redi-school.orgcareer+testmentee@redi-school.org',
  contactEmail: 'career+testmentee@redi-school.org',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: categories.map((c) => c.id).filter(() => Math.random() < 0.4),
  menteeCountCapacity: 1,
  mentee_highestEducationLevel: 'highSchool',
  mentee_currentlyEnrolledInCourse: 'salesforceFundamentals',
  username: 'career+testmentee@redi-school.org',
}
addMenteeSpecificProperties(ericMenteeRedProfile)

const ericMentorRedUser = {
  password: 'career+testmentor@redi-school.org',
  email: 'career+testmentor@redi-school.org',
}
const ericMentorRedProfile = {
  rediLocation: 'berlin',
  userActivated: true,
  userType: 'mentor',
  mentor_occupation: 'Test',
  mentor_workPlace: 'Test',
  mentee_occupationCategoryId: 'job',
  mentee_occupationJob_placeOfEmployment: randomString(),
  mentee_occupationJob_position: randomString(),
  mentee_occupationStudent_studyPlace: randomString(),
  mentee_occupationStudent_studyName: randomString(),
  mentee_occupationLookingForJob_what: randomString(),
  mentee_occupationOther_description: randomString(),
  mentee_highestEducationLevel: randomString(),
  mentee_currentlyEnrolledInCourse: randomString(),
  profileAvatarImageS3Key:
    'c1774822-9495-4bd6-866a-bf4d28aaddc8_ScreenShot2019-03-12at22.22.20.png',
  firstName: 'Mentor',
  lastName: 'at ReDI',
  birthDate: moment(
    '01.01.' + (new Date().getFullYear() - _.random(18, 100, false)),
    'DD.MM.YYYY'
  ),
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'info@binarylights.cominfo@binarylights.cominfo@binarylights.cominfo@binarylights.cominfo@binarylights.cominfo@binarylights.cominfo@binarylights.cominfo@binarylights.com',
  contactEmail: 'career+testmentor@redi-school.org',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: categories.map((c) => c.id).filter(() => Math.random() < 0.4),
  menteeCountCapacity: 2,
  username: 'career+testmentor@redi-school.org',
}
addMentorSpecificProperties(ericMentorRedProfile)

const ericAdminUser = {
  email: 'cloud-accounts@redi-school.org',
  password: 'cloud-accounts@redi-school.org',
}
const ericAdminRedProfile = {
  rediLocation: 'berlin',
  userActivated: true,
  userType: 'mentor',
  mentor_occupation: 'Test',
  mentor_workPlace: 'Test',
  mentee_occupationCategoryId: 'job',
  mentee_occupationJob_placeOfEmployment: randomString(),
  mentee_occupationJob_position: randomString(),
  mentee_occupationStudent_studyPlace: randomString(),
  mentee_occupationStudent_studyName: randomString(),
  mentee_occupationLookingForJob_what: randomString(),
  mentee_occupationOther_description: randomString(),
  mentee_highestEducationLevel: randomString(),
  mentee_currentlyEnrolledInCourse: randomString(),
  profileAvatarImageS3Key:
    'c1774822-9495-4bd6-866a-bf4d28aaddc8_ScreenShot2019-03-12at22.22.20.png',
  firstName: 'Admin',
  lastName: 'Admin',
  birthDate: moment(
    '01.01.' + (new Date().getFullYear() - _.random(18, 100, false)),
    'DD.MM.YYYY'
  ),
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'cloud-accounts@redi-school.org',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: categories.map((c) => c.id).filter(() => Math.random() < 0.4),
  menteeCountCapacity: 0,
  username: 'cloud-accounts@redi-school.org',
}

Rx.of({})
  .pipe(
    switchMap(accessTokenDestroyAll),
    switchMap(roleDestroyAll),
    switchMap(roleMappingDestroyAll),
    switchMap(redMatchDestroyAll),
    switchMap(redUserDestroyAll),
    switchMap(redProfileDestroyAll),
    tap(() => console.log('destroyed')),
    delay(2000),
    // switchMap(redMentoringSessionDestroyAll),
    switchMap(() => redUserCreate(ericAdminUser)),
    switchMap((redUser) =>
      redProfileCreateOnRedUser(redUser)(ericAdminRedProfile)
    ),
    switchMap(() => redUserCreate(ericMenteeRedUser)),
    switchMap((redUser) =>
      redProfileCreateOnRedUser(redUser)(ericMenteeRedProfile)
    ),
    switchMap(() => redUserCreate(ericMentorRedUser)),
    tap(console.log),
    switchMap((redUser) =>
      redProfileCreateOnRedUser(redUser)(ericMentorRedProfile)
    ),
    switchMapTo(users),
    mergeMap(
      (userData) => redUserCreate(userData.redUser),
      (userData, redUserInst) => ({ ...userData, redUserInst }),
      10
    ),
    mergeMap(
      (userData) =>
        redProfileCreateOnRedUser(userData.redUserInst)(userData.redProfile),
      (userData, redProfileInst) => ({ ...userData, redProfileInst }),
      10
    ),
    toArray(),
    // Pick X mentor-mentee pairs, create match
    switchMap((data) => {
      const mentors = data.filter(
        (userData) => userData.redProfile.userType === 'mentor'
      )
      const mentees = data.filter(
        (userData) => userData.redProfile.userType === 'mentee'
      )

      let matchesFlat = []
      const locations = ['berlin', 'munich']
      for (let i = 0; i < locations.length; i++) {
        const location = locations[i]
        const mentorsInLocation = mentors.filter(
          (data) => data.redProfile.rediLocation === location
        )
        const menteesInLocation = mentees.filter(
          (data) => data.redProfile.rediLocation === location
        )
        console.log('******************************')
        console.log('location', location)
        console.log(mentorsInLocation.length)
        console.log(menteesInLocation.length)
        console.log('******************************')
        const matches = mentorsInLocation.map((mentor) => {
          return _.sampleSize(
            menteesInLocation,
            Math.floor(Math.random() * 10)
          ).map((mentee) => {
            console.log(location)
            return {
              rediLocation: '' + location + '',
              applicationText: randomString(),
              expectationText: randomString(),
              status: ['applied', 'accepted', 'completed'][
                Math.floor(Math.random() * 3)
              ],
              mentorId: mentor.redProfileInst.id,
              menteeId: mentee.redProfileInst.id,
            }
          })
        })
        matchesFlat = [...matchesFlat, ..._.flatten(matches)]
      }
      return Rx.from(matchesFlat)
    }),
    concatMap(redMatchCreate)
  )
  .subscribe(
    () => console.log('next'),
    console.log,
    () => {
      console.log('done')
      process.exit()
    }
  )

app.models.RedUser.destroyAll()
app.models.RedProfile.destroyAll()
