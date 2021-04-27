'use strict'

const app = require('../server/server.js')
const nodemailer = require('nodemailer')
const Rx = require('rxjs')
const { bindNodeCallback, from } = Rx
const {
  delay,
  concatMap,
  take,
  map,
  tap,
  count
} = require('rxjs/operators')

const {
  RedUser
} = app.models

const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com', // Gmail Host
  port: 465, // Port
  secure: true, // this is true as port is 465
  auth: {
    user: 'career@redi-school.org', // Gmail username
    pass: process.env.GMAIL_PASSWORD_CAREER_AT_REDI_SCHOOL_DOT_ORG // Gmail password
  }
})

/* eslint-disable-next-line */
const sendMentorEmail = (recipient, firstName) => {
  const mailOptions = {
    from: '<career@redi-school.org>',
    to: recipient, // Recepient email address. Multiple emails can send separated by commas
    subject: 'Are you ReDI?',
    text: `Hi ${firstName},

we hope this email finds you well and healthy! We have noticed that you have not logged into ReDI Connect for a while.

You have been receiving some applications from our students recently.

Are you ReDI?

Although we do not want to lose you as our mentor, we understand if you want to pause or end your mentoring with us.

Simply let us know at career@redi-school.org.

We would love to hear from you in any case!

Best regards,
Your ReDI Career Support Team`
  }

  return bindNodeCallback(transporter.sendMail.bind(transporter))(mailOptions)
}

from([
  { email: 'szugyiedit@gmail.com', firstName: 'Edit' },
  { email: 'bedorita@gmail.com', firstName: 'Rita' },
  { email: 'maxim@door2door.io', firstName: 'Maxim' }
])
  .pipe(
    concatMap(
      data =>
        sendMentorEmail(
          data.email,
          data.firstName
        ).pipe(delay(5000)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),

    tap(userData => console.log(userData.email)),
    count()
  )
  .subscribe(
    count => console.log('did this ' + count + ' times'),
    e => console.log('Error: ', e),
    () => console.log('done')
  )
