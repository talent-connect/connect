'use strict'

const app = require('../server/server.js')
const path = require('path')
const nodemailer = require('nodemailer')
const Rx = require('rxjs')
const { bindNodeCallback, from } = Rx
const {
  delay,
  switchMap,
  concatMap,
  filter,
  map,
  tap,
  take,
  count
} = require('rxjs/operators')
const _ = require('lodash')

const {
  RedUser
} = app.models

let transporter = nodemailer.createTestAccount((err, account) => {
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
    subject: 'News in May',
    text: `Dear ${_.trim(_.startCase(_.toLower(firstName)))},

We hope you are doing well and would like to say THANK YOU for supporting our students in these challenging times. Thank you also if you joined one of our meetups or if you are a new mentor that signed up in the last week! We need you!

We have some great news: Since the start of our semester in February over 100 hours of mentoring have been logged: Keep going! This is fantastic!

We have nominated one ambassador so that you have someone to reach out to or if you want to share your mentoring experience: His name is Dragos and he has mentored five students already and is happy to help or talk. Find him on slack: dragosgn

We have put together some tips and tricks for (online) mentoring for you in the attached file.

Let us know if we should add something! In the meantime: T-H-A-N-K Y-O-U AGAIN!

See you online!

Best,
Isabelle, Dragos & everyone at ReDI School`,
    attachments: [
      {
        filename: 'Mentors new guidelines for remote mentoring.pdf',
        path: path.resolve(__dirname, 'email_attachments/Mentors new guidelines for remote mentoring.pdf')
      }
    ]
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
    filter(({ redProfile }) => redProfile.userType === 'mentor'),
    filter(({ redProfile }) => redProfile.userActivated),

    
    //take(2),
    /*
    map((data, index) => {
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
        ).pipe(delay(5000)),

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
