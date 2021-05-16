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
} = require('rxjs/operators')

const {
  RedUser,
  RedProfile,
  RedMatch,
  RedMentoringSession,
  AccessToken,
  Role,
  RoleMapping,
} = app.models

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
]

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

const users = fp.compose(
  fp.take(1000),
  fp.map(({ name, surname, gender }) => {
    const rediLocation =
      Math.random() > 0.5 ? 'berlin' : Math.random() > 0.5 ? 'munich' : 'nrw'
    const email = randomString() + '@' + randomString() + '.com'
    const password = email
    return {
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
        age: _.random(18, 100, false),
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
        languages: Languages.filter(() => Math.random() > 0.5).concat(
          'English'
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
  password: 'eric@binarylights.com',
  email: 'eric@binarylights.com',
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
  firstName: 'Eric',
  lastName: 'Bolikowski',
  age: _.random(18, 100, false),
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'eric@binarylights.com',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: categories.map((c) => c.id).filter(() => Math.random() < 0.4),
  menteeCountCapacity: 1,
  mentee_highestEducationLevel: 'highSchool',
  mentee_currentlyEnrolledInCourse: 'salesforceFundamentals',
  username: 'eric@binarylights.com',
}

const ericMentorRedUser = {
  password: 'info@binarylights.com',
  email: 'info@binarylights.com',
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
  firstName: 'Info',
  lastName: 'Binary Lights',
  age: _.random(18, 100, false),
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'info@binarylights.com',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: categories.map((c) => c.id).filter(() => Math.random() < 0.4),
  menteeCountCapacity: 2,
  username: 'info@binarylights.com',
}

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
  age: _.random(18, 100, false),
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
  menteeCountCapacity: 2,
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
    delay(10000),
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
    concatMap(
      (userData) => redUserCreate(userData.redUser),
      (userData, redUserInst) => ({ ...userData, redUserInst })
    ),
    concatMap(
      (userData) =>
        redProfileCreateOnRedUser(userData.redUserInst)(userData.redProfile),
      (userData, redProfileInst) => ({ ...userData, redProfileInst })
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
