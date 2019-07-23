'use strict';

const app = require('../server/server.js');
const _ = require('lodash');
const fp = require('lodash/fp');
const Rx = require('rxjs');
const { of } = Rx;
const {
  concatMap,
  mergeMap,
  switchMap,
  mapTo,
  from,
  map,
  switchMapTo,
  tap,
  toArray,
} = require('rxjs/operators');

const mentors = require('./assets/mentors');
const mentees = require('./assets/mentees');
const matches = require('./assets/matches');

const {
  sendDataImportMentorSignupEmail,
  sendDataImportMenteeSignupEmail,
} = require('../lib/email');

const {
  RedUser,
  RedProfile,
  RedMatch,
  RedMentoringSession,
  RedProblemReport,
  AccessToken,
} = app.models;

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
  { id: 'freelancing', label: 'Freelancing' },
];

const Languages = ['German', 'Arabic', 'Farsi', 'Tigrinya'];

const genders = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
  { id: 'other', label: 'Other' },
];

const educationLevels = [
  { id: 'middleSchool', label: 'Middle School' },
  { id: 'highSchool', label: 'High School' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
  { id: 'universityBachelor', label: 'University Degree (Bachelor)' },
  { id: 'universityMaster', label: 'University Degree (Master)' },
  { id: 'universityPhd', label: 'University Degree (PhD)' },
];

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
];

const menteeOccupationCategories = [
  { id: 'job', label: 'Job (full-time/part-time)' },
  { id: 'student', label: 'Student (enrolled at university)' },
  { id: 'lookingForJob', label: 'Looking for a job' },
  { id: 'other', label: 'Other' },
];
const menteeOccupationCategoriesIds = menteeOccupationCategories.map(v => v.id);

const randomString = (charset = 'abcdefghijklmnopqrstuvwxyz', length = 10) => {
  let str = '';
  for (let i = 0; i < length; i++) {
    str += charset[Math.floor(Math.random() * (charset.length - 1))];
  }
  return str;
};

const ericMenteeRedUser = {
  password: 'eric@binarylights.com',
  email: 'eric@binarylights.com',
};
const ericMenteeRedProfile = {
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
  telephoneNumber: '',
  categories: [
    'blockchain',
    'swift',
    'pythonDataScience',
    'cvPersonalPresentation',
    'itAndNetworking',
  ],
  menteeCountCapacity: 1,
  mentee_highestEducationLevel: 'highSchool',
  mentee_currentlyEnrolledInCourse: 'salesforceFundamentals',
  username: 'eric@binarylights.com',
};

const ericMentorRedUser = {
  password: 'info@binarylights.com',
  email: 'info@binarylights.com',
};
const ericMentorRedProfile = {
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
  lastName: 'Binary Lights',
  gender: 'male',
  languages: ['German', 'Farsi'],
  otherLanguages: '',
  personalDescription:
    'eric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.comeric@binarylights.com',
  contactEmail: 'info@binarylights.com',
  slackUsername: '',
  telephoneNumber: '',
  categories: [
    'blockchain',
    'swift',
    'pythonDataScience',
    'cvPersonalPresentation',
    'itAndNetworking',
  ],
  menteeCountCapacity: 2,
  username: 'info@binarylights.com',
};

const ericAdminUser = {
  email: 'cloud-accounts@redi-school.org',
  password: 'cloud-accounts@redi-school.org',
};
const ericAdminRedProfile = {
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
  telephoneNumber: '',
  categories: [
    'blockchain',
    'swift',
    'pythonDataScience',
    'cvPersonalPresentation',
    'itAndNetworking',
  ],
  menteeCountCapacity: 0,
  username: 'cloud-accounts@redi-school.org',
};

const redUserDestroyAll = () =>
  Rx.bindNodeCallback(RedUser.destroyAll.bind(RedUser))();
const redProfileDestroyAll = () =>
  Rx.bindNodeCallback(RedProfile.destroyAll.bind(RedProfile))();
const redMatchDestroyAll = () =>
  Rx.bindNodeCallback(RedMatch.destroyAll.bind(RedMatch))();
const redMentoringSessionDestroyAll = () =>
  Rx.bindNodeCallback(
    RedMentoringSession.destroyAll.bind(RedMentoringSession)
  )();
const redProblemReportDestroyAll = () =>
  Rx.bindNodeCallback(RedProblemReport.destroyAll.bind(RedProblemReport))();
const accessTokenDestroyAll = () =>
  Rx.bindNodeCallback(AccessToken.destroyAll.bind(AccessToken))();

const redMatchCreate = redMatch =>
  Rx.bindNodeCallback(RedMatch.create.bind(RedMatch))(redMatch);
const redUserCreate = redUser =>
  Rx.bindNodeCallback(RedUser.create.bind(RedUser))(redUser);
const redProfileCreateOnRedUser = redUserInst => redProfile =>
  Rx.bindNodeCallback(redUserInst.redProfile.create.bind(redUserInst))(
    redProfile
  );
const ONE_MONTH = 60 * 60 * 24 * 30;
const accessTokenCreateOnRedUser = redUserInst =>
  Rx.bindNodeCallback(redUserInst.createAccessToken.bind(redUserInst))(
    ONE_MONTH
  );
(' What is your current occupation?');
Rx.of({})
  .pipe(
    switchMap(() => redMatchDestroyAll()),
    switchMap(() => redUserDestroyAll()),
    switchMap(() => redProfileDestroyAll()),
    switchMap(() => redMentoringSessionDestroyAll()),
    switchMap(() => redProblemReportDestroyAll()),
    switchMap(() => accessTokenDestroyAll()),
    switchMap(() => redUserCreate(ericAdminUser)),
    switchMap(redUser =>
      redProfileCreateOnRedUser(redUser)(ericAdminRedProfile)
    ),
    /*switchMap(() => redUserCreate(ericMenteeRedUser)),
    switchMap(redUser =>
      redProfileCreateOnRedUser(redUser)(ericMenteeRedProfile)
    ),
    switchMap(() => redUserCreate(ericMentorRedUser)),
    switchMap(redUser =>
      redProfileCreateOnRedUser(redUser)(ericMentorRedProfile)
    ),*/
    switchMapTo(
      []
        .concat(
          //mentors.slice(0, 5).map(m => Object.assign(m, { userType: 'mentor' }))
          mentors.map(m => Object.assign(m, { userType: 'mentor' }))
        )
        .concat(
          //mentees.slice(0, 5).map(m => Object.assign(m, { userType: 'mentee' }))
          mentees.map(m => Object.assign(m, { userType: 'mentee' }))
        )
    ),
    map(m => {
      delete m[
        "In order to match you with your mentee(s) we will send you additional information by e-mail. (guidelines, mentee's contact etc.). Is that okay for you? "
      ];
      return m;
    }),
    map((m, i) =>
      Object.assign(m, {
        languages: m.languages.replace(/\s/, '').split(','),
        contactEmail: `eric.bolikowski+${i}@gmail.com`,
        // TODO: get from data
        mentee_occupationCategoryId: '',
        mentee_occupationJob_placeOfEmployment: '',
        mentee_occupationJob_position: '',
        mentee_occupationStudent_studyPlace: '',
        mentee_occupationStudent_studyName: '',
        mentee_occupationLookingForJob_what: '',
        mentee_occupationOther_description: '',
        profileAvatarImageS3Key: '',
        slackUsername: '',
        mentee_highestEducationLevel: '',
        userActivated: false,
        // TODO: get from data
      })
    ),
    map(m => {
      switch (m.mentee_currentlyEnrolledInCourse) {
        case 'IoT in Action!':
          m.mentee_currentlyEnrolledInCourse = 'iotInAction';
          return m;
        case 'Salesforce Fundamentals':
          m.mentee_currentlyEnrolledInCourse = 'salesforceFundamentals';
          return m;
        case 'Intro to Python':
          m.mentee_currentlyEnrolledInCourse = 'introPython';
          return m;
        case 'React':
          m.mentee_currentlyEnrolledInCourse = 'react';
          return m;
        case 'Intermediate Java':
          m.mentee_currentlyEnrolledInCourse = 'intermediateJava';
          return m;
        case 'Java Script':
          m.mentee_currentlyEnrolledInCourse = 'javaScript';
          return m;
        case 'Data Science with Python':
          m.mentee_currentlyEnrolledInCourse = 'dataSciencePython';
          return m;
        case 'Intro to iOS Apps with Swift':
          m.mentee_currentlyEnrolledInCourse = 'introIosAppsSwift';
          return m;
        case 'HTML&CSS':
          m.mentee_currentlyEnrolledInCourse = 'htmlCss';
          return m;
        case 'Blockchain Basics':
          m.mentee_currentlyEnrolledInCourse = 'blockchainBasics';
          return m;
        case 'Intro to Java':
          m.mentee_currentlyEnrolledInCourse = 'introJava';
          return m;
        case 'Basic Computer Training':
          m.mentee_currentlyEnrolledInCourse = 'basicComputerTraining';
          return m;
        case 'UX/UI Women':
          m.mentee_currentlyEnrolledInCourse = 'uiUxWomen';
          return m;
        default:
          m.mentee_currentlyEnrolledInCourse = '';
          return m;
      }
    }),
    map(m => {
      m.personalDescription = '';
      m.categories = m.categories
        .replace(
          'Career guidance (e.g. job orientation, writing applications)',
          'jobOrientation'
        )
        .split(', ')
        .map(cat => {
          switch (cat) {
            case 'Blockchain':
              return 'blockchain';
            case 'Basic Computer':
            case 'Basic Computer Training':
              return 'basicComputer';
            case 'React':
              return 'react';
            case 'IT & Networking':
              return 'itAndNetworking';
            case 'Swift':
              return 'swift';
            case 'Interviews & Communications':
              return 'interviewsAndCommunication';
            case 'Graphics & UX/UI':
              return 'graphicsAndUxUi';
            case 'CV & Personal presentation':
              return 'cvPersonalPresentation';
            case 'Mobile Development':
              return 'mobileDevelopment';
            case 'Job Orientation':
            case 'Job orientation':
              return 'jobOrientation';
            case 'Python Data Science':
              return 'pythonDataScience';
            case 'Entrepreneurship':
              return 'entrepreneurship';
            case 'Java Development':
              return 'javaDevelopment';
            case 'IoT':
              return 'iot';
            case 'Web Development':
            case 'Webdevelopment':
              return 'webDevelopment';
            case 'Freelancing':
              return 'freelancing';
            case 'Career guidance (e.g. job orientation, writing applications)':
            case 'jobOrientation':
              return 'jobOrientation';
            case 'Interviews and general communication skills':
              return 'cvPersonalPresentation';
            case '':
              return '';
            default:
              m.personalDescription =
                m.userType === 'mentee'
                  ? `I'm also looking for support in ${cat}`
                  : `I can also offer support in ${cat}`;
              console.log(cat);
              return '';
          }
        })
        .filter(v => v);
      m.categories = _.uniq(m.categories);
      return m;
    }),
    map(m => {
      const c = m[' What is your current occupation?'];
      const d = m["What is your career goal (you don't need to have one yet)?"];
      switch (c) {
        case 'Student at University':
          m.mentee_occupationCategoryId = 'student';
          break;
        case 'Other':
          m.mentee_occupationCategoryId = 'other';
          break;
        case 'Looking for an internship':
          m.mentee_occupationCategoryId = 'lookingForJob';
          break;
        case 'In full time employment':
        case 'part time employment':
        case 'Part time job':
          m.mentee_occupationCategoryId = 'job';
          break;
        case 'Looking for a job':
          m.mentee_occupationCategoryId = 'lookingForJob';
          break;
        default:
          m.mentee_occupationCategoryId = 'other';
      }
      if (d) {
        m.personalDescription += `\nMy current career goal is: ${d}`;
        m.personalDescription = _.trim(m.personalDescription);
      }
      delete m[' What is your current occupation?'];
      delete m["What is your career goal (you don't need to have one yet)?"];
      return m;
    }),
    map(m => {
      if (m.userType === 'mentee') {
        m.mentee_currentCategory = m.index >= 84 ? 'rediAlumnus' : 'student';
      }
      if (m.userType === 'mentor' && !m.menteeCountCapacity) {
        m.menteeCountCapacity = 1;
      }
      delete m.Token;
      return m;
    }),
    map(mentor => ({
      redUser: { email: mentor.contactEmail, password: randomString() },
      redProfile: mentor,
    })),
    mergeMap(
      userData => redUserCreate(userData.redUser),
      (userData, redUserInst) => ({ ...userData, redUserInst })
    ),
    mergeMap(
      userData =>
        redProfileCreateOnRedUser(userData.redUserInst)(userData.redProfile),
      (userData, redProfileInst) => ({ ...userData, redProfileInst })
    ),
    mergeMap(
      userData => accessTokenCreateOnRedUser(userData.redUserInst),
      (userData, accessToken) => ({ ...userData, accessToken })
    ),
    mergeMap(
      userData =>
        userData.redProfile.userType === 'mentor'
          ? sendDataImportMentorSignupEmail(
              userData.redUser.email,
              userData.redProfile.firstName,
              encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
            )
          : sendDataImportMenteeSignupEmail(
              userData.redUser.email,
              userData.redProfile.firstName,
              encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
            ),
      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    toArray(),
    // Pick X mentor-mentee pairs, create match
    switchMap(data => {
      const insertMatches = matches.map(match => {
        const mentor = data.filter(
          userData =>
            userData.redProfile.userType === 'mentor' &&
            userData.redProfile.index === match.mentorIndex
        )[0];
        const mentee = data.filter(
          userData =>
            userData.redProfile.userType === 'mentee' &&
            userData.redProfile.index === match.menteeIndex
        )[0];
        const newMatch = {
          status: 'accepted',
          mentorId: mentor.redProfileInst.id,
          menteeId: mentee.redProfileInst.id,
          applicationText: ' ',
          matchMadeActiveOn: match.matchMadeActiveOn,
        };
        return newMatch;
      });
      /*
      const mentors = data.filter(
        userData => userData.redProfile.userType === 'mentor'
      );
      const mentees = data.filter(
        userData => userData.redProfile.userType === 'mentee'
      );
      const matches = mentors.map(mentor => {
        return _.sampleSize(mentees, Math.floor(Math.random() * 10)).map(
          mentee => {
            return {
              applicationText: randomString(),
              status: ['applied', 'accepted', 'completed'][
                Math.floor(Math.random() * 3)
              ],
              mentorId: mentor.redProfileInst.id,
              menteeId: mentee.redProfileInst.id,
            };
          }
        );
      });
      const matchesFlat = _.flatten(matches);*/
      return Rx.from(insertMatches);
    }),
    concatMap(redMatchCreate)
  )
  .subscribe(null, console.log, () => console.log('done'));
