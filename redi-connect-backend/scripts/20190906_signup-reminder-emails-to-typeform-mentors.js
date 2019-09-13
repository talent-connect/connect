'use strict';

const app = require('../server/server.js');
const Rx = require('rxjs');
const { bindNodeCallback, from } = Rx;
const {
  concatMap,
  mergeMap,
  switchMap,
  mapTo,
  filter,
  map,
  switchMapTo,
  tap,
  toArray,
  count,
} = require('rxjs/operators');

const { sendEmailFactory } = require('../lib/email');

const sendMentorSignupReminderEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Ready to mentor this semester? ReDI Connect is ReDI for you :)',
    `Dear ${firstName},
  
Thank you for being part of the ReDI Mentorship program.

We saw that you have not activated your profile at ReDI Connect.

It would be lovely if you could let us know if you still want to be part of the Mentorship program or not.

If you want to continue, please activate your profile here:

Access ReDI Connect here: https://connect.redi-school.org/front/signup/existing/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipient}

Let us know if you need any help or assistance at career@redi-school.org or on slack #redi_mentors2019.

Your Career Support Team`
  );

const { RedUser } = app.models;

const redUserFind = q => bindNodeCallback(RedUser.find.bind(RedUser))(q);
const THREE_MONTHS = 60 * 60 * 24 * 30 * 3;
const accessTokenCreateOnRedUser = redUserInst =>
  Rx.bindNodeCallback(redUserInst.createAccessToken.bind(redUserInst))(
    THREE_MONTHS
  );

redUserFind({ include: 'redProfile' })
  .pipe(
    switchMap(users => from(users)),
    map(data => {
      return {
        redUser: data.toJSON(),
        redProfile: data.toJSON().redProfile,
        redUserInst: data,
        redProfileInst: data.redProfile,
      };
    }),
    filter(
      data =>
        data.redProfile &&
        !data.redProfile.userActivated &&
        data.redProfile.mentor_ifTypeForm_submittedAt &&
        data.redProfile.userType === 'mentor'
    ),
    tap(({ redProfile }) =>
      console.log({
        firstName: redProfile.firstName,
        lastName: redProfile.lastName,
        typeform: redProfile.mentor_ifTypeForm_submittedAt,
        email: redProfile.contactEmail,
        userType: redProfile.userType,
      })
    ),
    mergeMap(
      data => accessTokenCreateOnRedUser(data.redUserInst),
      (data, accessToken) => ({ ...data, accessToken })
    ),
    mergeMap(
      userData =>
        sendMentorSignupReminderEmail(
          userData.redProfile.contactEmail,
          userData.redProfile.firstName,
          encodeURIComponent(JSON.stringify(userData.accessToken.toJSON()))
        ),
      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    count()
  )
  .subscribe(
    count => console.log('did this ' + count + ' times'),
    e => console.log('Error: ', e),
    () => console.log('done')
  );
