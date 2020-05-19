'use strict'

const app = require('../server/server.js')
const _ = require('lodash')
const fp = require('lodash/fp')
const Rx = require('rxjs')
const {
  concatMap,
  switchMap,
  mapTo,
  from,
  map,
  switchMapTo,
  tap,
  toArray
} = require('rxjs/operators')

const { RedUser, RedProfile, RedMatch, RedMentoringSession } = app.models

const persons = require('./random-names.json')

const categories = [
  { id: 'blockchain', label: 'Blockchain' },
  { id: 'basicComputer', label: 'Basic Computer' },
  { id: 'react', label: 'React' },
  { id: 'itAndNetworking', label: 'IT & Networking' },
  { id: 'swift', label: 'Swift' },
  { id: 'interviewsAndCommunication', label: 'Interviews & Communications' },
  { id: 'graphicsAndUxUi', label: 'Graphics & UX/UI' },
  { id: 'cvPersonalPresentation', label: 'CV & Personal presentation' },
  { id: 'mobileDevelopment', label: 'Mobile Development' },
  { id: 'jobOrientation', label: 'Job Orientation' },
  { id: 'pythonDataScience', label: 'Python Data Science' },
  { id: 'entrepreneurship', label: 'Entrepreneurship' },
  { id: 'javaDevelopment', label: 'Java Development' },
  { id: 'iot', label: 'IoT' },
  { id: 'webDevelopment', label: 'Web Development' },
  { id: 'freelancing', label: 'Freelancing' }
]

const Languages = ['German', 'Arabic', 'Farsi', 'Tigrinya']

const genders = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' }
]

const menteeCountCapacityOptions = [1, 2, 3, 4]

const educationLevels = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' }
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
  { id: 'introJava', label: 'Intro to Java' }
]

const menteeOccupationCategories = [
  { id: 'job', label: 'Job (full-time/part-time)' },
  { id: 'student', label: 'Student (enrolled at university)' },
  { id: 'lookingForJob', label: 'Looking for a job' },
  { id: 'other', label: 'Other' }
]
const menteeOccupationCategoriesIds = menteeOccupationCategories.map(v => v.id)

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
    'public-sign-up-mentee-pending-review'
  ]
  const randomIndex = Math.floor(Math.random() * possibleUserTypes.length)
  return possibleUserTypes[randomIndex]
}

const users = fp.compose(
  fp.take(50),
  fp.map(({ name, surname, gender }) => {
    const email = randomString() + '@' + randomString() + '.com'
    const password = randomString()
    return {
      redUser: {
        email,
        password
      },
      redProfile: {
        userActivated: true,
        userType: pickRandomUserType(),
        gender,
        firstName: name,
        lastName: surname,
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
        categories: categories.map(c => c.id).filter(() => Math.random() < 0.2),
        menteeCountCapacity: Math.floor(Math.random() * 4),
        mentee_highestEducationLevel:
          educationLevels[Math.floor(Math.random() * educationLevels.length)]
            .id,
        mentee_currentlyEnrolledInCourse:
          courses[Math.floor(Math.random() * courses.length)].id
      }
    }
  })
)(persons)

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

const redMatchCreate = redMatch =>
  Rx.bindNodeCallback(RedMatch.create.bind(RedMatch))(redMatch)
const redUserCreate = redUser =>
  Rx.bindNodeCallback(RedUser.create.bind(RedUser))(redUser)
const redProfileCreateOnRedUser = redUserInst => redProfile =>
  Rx.bindNodeCallback(redUserInst.redProfile.create.bind(redUserInst))(
    redProfile
  )

const ericMenteeRedUser = {
  password: 'eric@binarylights.com',
  email: 'eric@binarylights.com'
}
const ericMenteeRedProfile = {
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
  mentee_highestEducationLevel: randomString(),
  mentee_currentlyEnrolledInCourse: randomString(),
  profileAvatarImageS3Key:
    'c1774822-9495-4bd6-866a-bf4d28aaddc8_ScreenShot2019-03-12at22.22.20.png',
  firstName: 'Eric',
  lastName: 'Bolikowski',
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'eric@binarylights.com',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: [
    'blockchain',
    'swift',
    'pythonDataScience',
    'cvPersonalPresentation',
    'itAndNetworking'
  ],
  menteeCountCapacity: 1,
  mentee_highestEducationLevel: 'highSchool',
  mentee_currentlyEnrolledInCourse: 'salesforceFundamentals',
  username: 'eric@binarylights.com'
}

const ericMentorRedUser = {
  password: 'info@binarylights.com',
  email: 'info@binarylights.com'
}
const ericMentorRedProfile = {
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
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'info@binarylights.com',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: [
    'blockchain',
    'swift',
    'pythonDataScience',
    'cvPersonalPresentation',
    'itAndNetworking'
  ],
  menteeCountCapacity: 2,
  username: 'info@binarylights.com'
}

const isabelleMentorRedUser = {
  password: 'isabelle@redi-school.org',
  email: 'isabelle@redi-school.org'
}
const isabelleMentorRedProfile = {
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
  firstName: 'Isabelle',
  lastName: 'ReDI School',
  gender: 'female',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'isabelle@redi-school.org',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: [
    'blockchain',
    'swift',
    'pythonDataScience',
    'cvPersonalPresentation',
    'itAndNetworking'
  ],
  menteeCountCapacity: 2,
  username: 'isabelle@redi-school.org'
}

const ericAdminUser = {
  email: 'cloud-accounts@redi-school.org',
  password: 'cloud-accounts@redi-school.org'
}
const ericAdminRedProfile = {
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
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'cloud-accounts@redi-school.org',
  slackUsername: '',
  githubProfileUrl: '',
  telephoneNumber: '',
  categories: [
    'blockchain',
    'swift',
    'pythonDataScience',
    'cvPersonalPresentation',
    'itAndNetworking'
  ],
  menteeCountCapacity: 2,
  username: 'cloud-accounts@redi-school.org'
}

Rx.of({})
  .pipe(
    switchMap(redMatchDestroyAll),
    switchMap(redUserDestroyAll),
    switchMap(redProfileDestroyAll),
    // switchMap(redMentoringSessionDestroyAll),
    switchMap(() => redUserCreate(ericAdminUser)),
    switchMap(redUser =>
      redProfileCreateOnRedUser(redUser)(ericAdminRedProfile)
    ),
    switchMap(() => redUserCreate(ericMenteeRedUser)),
    switchMap(redUser =>
      redProfileCreateOnRedUser(redUser)(ericMenteeRedProfile)
    ),
    switchMap(() => redUserCreate(ericMentorRedUser)),
    tap(console.log),
    switchMap(redUser =>
      redProfileCreateOnRedUser(redUser)(ericMentorRedProfile)
    ),
    switchMap(() => redUserCreate(isabelleMentorRedUser)),
    tap(console.log),
    switchMap(redUser =>
      redProfileCreateOnRedUser(redUser)(isabelleMentorRedProfile)
    ),
    tap(console.log),
    switchMapTo(users),
    concatMap(
      userData => redUserCreate(userData.redUser),
      (userData, redUserInst) => ({ ...userData, redUserInst })
    ),
    concatMap(
      userData =>
        redProfileCreateOnRedUser(userData.redUserInst)(userData.redProfile),
      (userData, redProfileInst) => ({ ...userData, redProfileInst })
    ),
    toArray(),
    // Pick X mentor-mentee pairs, create match
    switchMap(data => {
      const mentors = data.filter(
        userData => userData.redProfile.userType === 'mentor'
      )
      const mentees = data.filter(
        userData => userData.redProfile.userType === 'mentee'
      )
      const matches = mentors.map(mentor => {
        return _.sampleSize(mentees, Math.floor(Math.random() * 3)).map(
          mentee => {
            return {
              applicationText: randomString(),
              status: ['applied', 'accepted', 'completed'][
                Math.floor(Math.random() * 3)
              ],
              mentorId: mentor.redProfileInst.id,
              menteeId: mentee.redProfileInst.id
            }
          }
        )
      })
      const matchesFlat = _.flatten(matches)
      return Rx.from(matchesFlat)
    }),
    concatMap(redMatchCreate)
  )
  .subscribe(() => console.log('next'), console.log, () => {
    console.log('done')
    process.exit()
  })

app.models.RedUser.destroyAll()
app.models.RedProfile.destroyAll()
