'use strict'

const app = require('../server/server.js')
const nodemailer = require('nodemailer')
const Rx = require('rxjs')
const { bindNodeCallback, from } = Rx
const {
  delay,
  switchMap,
  filter,
  map,
  tap,
  count
} = require('rxjs/operators')

const {
  RedUser
} = app.models

let transporter
nodemailer.createTestAccount((err, account) => {
  if (err) throw err
  transporter = nodemailer.createTransport({
    host: 'smtp.googlemail.com', // Gmail Host
    port: 465, // Port
    secure: true, // this is true as port is 465
    auth: {
      user: 'career@redi-school.org', // Gmail username
      pass: process.env.GMAIL_PASSWORD_CAREER_AT_REDI_SCHOOL_DOT_ORG // Gmail password
    }
  })
  console.log('created')
})

/* eslint-disable-next-line */
const sendMentorEmail = (recipient, firstName) => {
  const mailOptions = {
    from: '<career@redi-school.org>',
    to: recipient, // Recepient email address. Multiple emails can send separated by commas
    subject: 'You\'re ReDI, but forgot your ReDI Connect password? We have you covered!',
    text: `Hi everyone!

Are you ReDI? We finally did it: The Reset Password Function is ReDI to use.

In case you've forgotten your password, just go to https://connect.redi-school.org and click: Forgot your password?

ReDI for some more fun? Come to the Monthly Mentorship Meet-Up next week! https://www.meetup.com/ReDI-school/events/265016812/

Oh, and mentors, as always: please make sure to log your mentoring sessions. Thank you! <3

Your Career Support Team`
  }

  return bindNodeCallback(transporter.sendMail.bind(transporter))(mailOptions)
}

const redUserFind = q => bindNodeCallback(RedUser.find.bind(RedUser))(q)

redUserFind({ include: 'redProfile' })
  .pipe(
    delay(1000),
    switchMap(users => from(users)),
    map(data => {
      const pojo = JSON.parse(JSON.stringify(data))
      return {
        redUser: pojo,
        redProfile: pojo.redProfile,
        redUserInst: data,
        redProfileInst: data.redProfile
      }
    }),
    filter(({ redProfile }) => !!redProfile),
    filter(({ redProfile }) => redProfile.userActivated),

    /*
    map(data => {
      data.redProfile.contactEmail = 'eric@binarylights.com';
      return data;
    }),
    */

    /*
    concatMap(
      userData =>
        sendMentorEmail(
          userData.redProfile.contactEmail,
          userData.redProfile.firstName
        ).pipe(delay(500)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    */

    tap(userData => console.log(userData.redProfile.contactEmail)),
    count()
  )
  .subscribe(
    count => console.log('did this ' + count + ' times'),
    e => console.log('Error: ', e),
    () => console.log('done')
  )
