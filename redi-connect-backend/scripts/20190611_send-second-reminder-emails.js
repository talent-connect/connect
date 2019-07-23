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

const {
  RedUser,
  RedProfile,
  RedMatch,
  RedMentoringSession,
  RedProblemReport,
  AccessToken,
} = app.models;

const sendMentorUpdateEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Summer update from ReDI Connect (update to mentors)',
    `Dear ${firstName}, 

We hope this email finds you well. We would like to give you a little update on what is happening at ReDI in general and with the mentorship program in particular. 

First of all, and some of you have registered to come already, here’s a reminder to be ReDI for this Friday’s Demo Day at Factory Mitte, where your mentees will show the projects from their courses. 
https://www.eventbrite.co.uk/e/redi-demo-day-spring-2019-tickets-60465991408

I would like you also to save the date for the 11th of July at 7 pm, where we will host a thank you get-together for all mentors.

Please register here: https://bit.ly/2K7SR05

Please stay ReDI to log your mentoring sessions in ReDI Connect. This is really important for us to see what impact the mentorship program has, and improve it accordingly. We also rely on continued support from our donors, and for this we need to report back to them on the impact. We hope you're ReDI to help ReDI!

At last, some good news: So far we have 96 active profiles in ReDI Connect! Thank you so much for this - we hope you're ReDI to continue the adventure!

Best regards,
Isabelle
Career Support
    `
  );
const sendMenteeUpdateEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Summer update from ReDI Connect (update to mentees)',
    `Dear ${firstName}, 

We hope this email finds you well. We would like to give you a little update on what is happening at ReDI in general and with the mentorship program in particular. 

First of all, and some of you have registered to come already, here’s a reminder to be ReDI for this Friday’s Demo Day at Factory Mitte, where your mentees will show the projects from their courses. 
https://www.eventbrite.co.uk/e/redi-demo-day-spring-2019-tickets-60465991408

At last, some good news: So far we have 96 active profiles in ReDI Connect! Thank you so much for this - we hope you're ReDI to continue the adventure!

Best regards,
Isabelle
Career Support`
  );

const sendMentorSignupReminderEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Summer update from ReDI Connect (sign up reminder to mentor)',
    `Dear ${firstName}, 

We hope this email finds you well. We would like to give you a little update on what is happening at ReDI in general and with the mentorship program in particular. 

First of all, and some of you have registered to come already, here’s a reminder to be ReDI for this Friday’s Demo Day at Factory Mitte, where your mentees will show the projects from their courses. 
https://www.eventbrite.co.uk/e/redi-demo-day-spring-2019-tickets-60465991408

I would like you also to save the date for the 11th of July at 7 pm, where we will host a thank you get-together for all mentors.

Please register here: https://bit.ly/2K7SR05

Unfortunately you have not set up your ReDI Connect account yet. We hope you are ReDI now!

Sign up on this link: https://connect.redi-school.org/front/signup/existing/${accessToken}

Please stay ReDI to log your mentoring sessions. This is really important for us to see what impact the mentorship program has, and improve it accordingly. We also rely on continued support from our donors, and for this we need to report back to them on the impact. We hope you're ReDI to help ReDI!

At last, some good news: So far we have 96 active profiles! Thank you so much for this - we hope you're ReDI to continue the adventure!

Best regards,
Isabelle
Career Support
    `
  );
const sendMenteeSignupReminderEmail = (recipient, firstName, accessToken) =>
  sendEmailFactory(
    recipient,
    'Summer update from ReDI Connect (sign up reminder to mentees)',
    `Dear ${firstName}, 

We hope this email finds you well. We would like to give you a little update on what is happening at ReDI in general and with the mentorship program in particular. 

First of all, and some of you have registered to come already, here’s a reminder to be ReDI for this Friday’s Demo Day at Factory Mitte, where your mentees will show the projects from their courses. 
https://www.eventbrite.co.uk/e/redi-demo-day-spring-2019-tickets-60465991408

Unfortunately you have not set up your ReDI Connect account yet. We hope you are ReDI now!

Sign up on this link: https://connect.redi-school.org/front/signup/existing/${accessToken}

At last, some good news: So far we have 96 active profiles! Thank you so much for this - we hope you're ReDI to continue the adventure!

Best regards,
Isabelle
Career Support`
  );

const redUserFind = q => bindNodeCallback(RedUser.find.bind(RedUser))(q);
const ONE_MONTH = 60 * 60 * 24 * 30;
const accessTokenCreateOnRedUser = redUserInst =>
  Rx.bindNodeCallback(redUserInst.createAccessToken.bind(redUserInst))(
    ONE_MONTH
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
    mergeMap(
      data => accessTokenCreateOnRedUser(data.redUserInst),
      (data, accessToken) => ({ ...data, accessToken })
    ),
    concatMap(
      userData => {
        const userType = userData.redProfile.userActivated;
        const userActivated = userData.redProfile.userActivated;
        if (!userActivated) {
          return userData.redProfile.userType === 'mentor'
            ? sendMentorSignupReminderEmail(
                userData.redProfile.contactEmail,
                userData.redProfile.firstName,
                encodeURIComponent(
                  JSON.stringify(userData.accessToken.toJSON())
                )
              )
            : sendMenteeSignupReminderEmail(
                userData.redProfile.contactEmail,
                userData.redProfile.firstName,
                encodeURIComponent(
                  JSON.stringify(userData.accessToken.toJSON())
                )
              );
        } else {
          return userData.redProfile.userType === 'mentor'
            ? sendMentorUpdateEmail(
                userData.redProfile.contactEmail,
                userData.redProfile.firstName,
                encodeURIComponent(
                  JSON.stringify(userData.accessToken.toJSON())
                )
              )
            : sendMenteeUpdateEmail(
                userData.redProfile.contactEmail,
                userData.redProfile.firstName,
                encodeURIComponent(
                  JSON.stringify(userData.accessToken.toJSON())
                )
              );
        }
      },

      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    tap(() => console.log('email sent')),
    count()
  )
  .subscribe(
    count => console.log('did this ' + count + ' times'),
    e => console.log('Error: ', e),
    () => console.log('done')
  );
