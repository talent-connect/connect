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

const mentors = [
  {
    firstName: 'Niek',
    lastName: 'Storm',
    contactEmail: 'niek@digitalfreestyler.nl',
  },
  {
    firstName: 'Marie-Louise',
    lastName: 'Sadakane',
    contactEmail: 'marielouise@fake.agency',
  },
  {
    firstName: 'Diana',
    lastName: 'Stoica',
    contactEmail: 'diana@door2door.io',
  },
];
const mentees = [
  {
    firstName: 'Ronny',
    lastName: 'Vater',
    contactEmail: 'rv48@hotmail.de',
  },
  {
    firstName: 'Ian',
    lastName: 'Witjaksono',
    contactEmail: 'ianwitjaksono@gmail.com',
  },
  {
    firstName: 'Ramy',
    lastName: 'Rihawi',
    contactEmail: 'rami.rihawi@gmail.com',
  },
  {
    firstName: 'Umut',
    lastName: 'Kavaktan',
    contactEmail: 'umut.kavaktan@gmail.com',
  },
  {
    firstName: 'Moira',
    lastName: 'McAulay',
    contactEmail: 'mmc@honeypot.io',
  },
  {
    firstName: 'Zaid',
    lastName: 'Zaim',
    contactEmail: 'zaidzaim2000@gmail.com',
  },
];

const { sendEmailFactory } = require('../lib/email');

const randomString = (charset = 'abcdefghijklmnopqrstuvwxyz', length = 10) => {
  let str = '';
  for (let i = 0; i < length; i++) {
    str += charset[Math.floor(Math.random() * (charset.length - 1))];
  }
  return str;
};

const sendDataImportMentorSignupEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Summer update from ReDI Connect (mentor imported email)',
    `Dear ${firstName}, 

We hope this email finds you well. We would like to give you a little update on what is happening at ReDI in general and with the mentorship program in particular. 

First of all, and some of you have registered to come already, here’s a reminder to be ReDI for this Friday’s Demo Day at Factory Mitte, where your mentees will show the projects from their courses. 
https://www.eventbrite.co.uk/e/redi-demo-day-spring-2019-tickets-60465991408

I would like you also to save the date for the 11th of July at 7 pm, where we will host a thank you get-together for all mentors.

Please register here: https://bit.ly/2K7SR05

Are you ReDI for ReDI Connect? Use it to find your awesome mentees! When you are ReDI, click this link. Once you've signed up, please update your profile (click on the person icon to the top right). Your future mentees are ReDI for you! ReDI, set, go:

https://connect.redi-school.org/front/signup/existing/${accessToken}

Please stay ReDI to log your mentoring sessions. This is really important for us to see what impact the mentorship program has, and improve it accordingly. We also rely on continued support from our donors, and for this we need to report back to them on the impact. We hope you're ReDI to help ReDI!

At last, some good news: So far we have 96 active profiles! Thank you so much for this - we hope you're ReDI to continue the adventure!

Best regards,
Isabelle
Career Support`
  );
const sendDataImportMenteeSignupEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Are you ReDI for ReDI Connect?! (mentee imported)',
    `Dear ${firstName}, 

Are you ReDI for ReDI Connect? Use it to find your mentor! When you are ReDI, click this link. Once you've signed up, please update your profile (click on the person icon to the top right). ReDI, set, go:

https://connect.redi-school.org/front/signup/existing/${accessToken}

Best regards,
Isabelle
Career Support`
  );

const { RedUser, RedProfile, AccessToken, Role, RoleMapping } = app.models;

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

const roleFindOne = Rx.bindNodeCallback(Role.findOne.bind(Role));
const userFind = Rx.bindNodeCallback(RedUser.find.bind(RedUser));
const rolePrincipalCreate = role =>
  Rx.bindNodeCallback(role.principals.create.bind(role));

let menteeRole, mentorRole;

roleFindOne({ where: { name: 'mentee' } })
  .pipe(
    map(menteeRole => ({ menteeRole })),
    switchMap(
      () => roleFindOne({ where: { name: 'mentor' } }),
      (data, mentorRole) => ({ ...data, mentorRole })
    ),
    tap(({ mentorRole: _mentorRole, menteeRole: _menteeRole }) => {
      menteeRole = _menteeRole;
      mentorRole = _mentorRole;
      console.log(menteeRole);
      console.log(mentorRole);
    }),
    switchMapTo(
      []
        .concat(mentors.map(m => Object.assign(m, { userType: 'mentor' })))
        .concat(mentees.map(m => Object.assign(m, { userType: 'mentee' })))
    ),
    map((m, i) =>
      Object.assign(m, {
        languages: [],
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
      m.mentee_currentlyEnrolledInCourse = '';
      return m;
    }),
    map(m => {
      m.personalDescription = '';
      m.categories = [];
      return m;
    }),
    map(m => {
      m.mentee_occupationCategoryId = '';
      m.personalDescription += ``;
      return m;
    }),
    map(mentor => ({
      redUser: { email: mentor.contactEmail, password: randomString() },
      redProfile: mentor,
    })),
    concatMap(
      userData => redUserCreate(userData.redUser),
      (userData, redUserInst) => ({ ...userData, redUserInst })
    ),
    concatMap(
      userData =>
        redProfileCreateOnRedUser(userData.redUserInst)(userData.redProfile),
      (userData, redProfileInst) => ({ ...userData, redProfileInst })
    ),
    concatMap(
      userData => accessTokenCreateOnRedUser(userData.redUserInst),
      (userData, accessToken) => ({ ...userData, accessToken })
    ),
    concatMap(
      userData =>
        rolePrincipalCreate(
          userData.redProfileInst.toJSON().userType === 'mentor'
            ? mentorRole
            : menteeRole
        )({
          principalType: RoleMapping.USER,
          principalId: userData.redUserInst.toJSON().id,
        }),
      userData => userData
    ),
    concatMap(
      userData => {
        console.log('hello');
        return userData.redProfile.userType === 'mentor'
          ? sendDataImportMentorSignupEmail(
              userData.redUser.email,
              userData.redProfile.firstName,
              encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
            )
          : sendDataImportMenteeSignupEmail(
              userData.redUser.email,
              userData.redProfile.firstName,
              encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
            );
      },
      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    tap(() => console.log('email sent')),
    toArray()
    // Pick X mentor-mentee pairs, create match
  )
  .subscribe(null, console.log, () => console.log('done'));
