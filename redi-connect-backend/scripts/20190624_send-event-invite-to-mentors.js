'use strict';

const app = require('../server/server.js');
const nodemailer = require('nodemailer');
const Rx = require('rxjs');
const { bindNodeCallback, from } = Rx;
const {
  concatMap,
  mergeMap,
  delay,
  switchMap,
  skip,
  mapTo,
  filter,
  take,
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

let transporter;
nodemailer.createTestAccount((err, account) => {
  transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user: 'career@redi-school.org', //Gmail username
      pass: process.env.GMAIL_PASSWORD_CAREER_AT_REDI_SCHOOL_DOT_ORG, // Gmail password
    },
  });
  console.log("created")
});

const sendMentorEmail = (recipient, firstName) => {
  let mailOptions = {
    from: '<career@redi-school.org>',
    to: recipient, // Recepient email address. Multiple emails can send separated by commas
    subject: 'REMINDER: Get ReDI for some fun!',
    text: `Dear Mentors!

We hope that you are all enjoying the summer so far!

We wanted to remind you to join us on the 11th of July so that we can say thank you and you can share experiences with fellow mentors: https://bit.ly/2K7SR05

Also, it would be fantastic if you could fill out the following survey so that we know how to improve the mentorship program for next semester: It is very short and should not take longer than 10 minutes: https://redischool.typeform.com/to/Q7gj6Y

Last but not least if you have started your sessions with your mentee, remember to log your sessions! Here's the place to do it: https://connect.redi-school.org.

And always let us know if you aren’t happy with something or even if you are! We love to hear from you!

All the best,
Your Career Support Team at ReDI School!`,
  };

  return bindNodeCallback(transporter.sendMail.bind(transporter))(mailOptions)
};

const redUserFind = q => bindNodeCallback(RedUser.find.bind(RedUser))(q);



redUserFind({ include: 'redProfile' })
  .pipe(
    delay(5000),
    switchMap(users => from(users)),
    map(data => {
      const pojo = JSON.parse(JSON.stringify(data));
      return {
        redUser: pojo,
        redProfile: pojo.redProfile,
        redUserInst: data,
        redProfileInst: data.redProfile,
      };
    }),
    filter(({ redProfile }) => !!redProfile),
    filter(({ redProfile }) => redProfile.userType === 'mentor'),
    skip(83),
    tap(v => console.log(v.redUser.email)),
    /*
    concatMap(
      userData =>
        sendMentorEmail(
          userData.redProfile.contactEmail,
          userData.redProfile.firstName
        ),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    */
    tap(() => console.log('email sent')),
    count()
  )
  .subscribe(
    count => console.log('did this ' + count + ' times'),
    e => console.log('Error: ', e),
    () => console.log('done')
  );
