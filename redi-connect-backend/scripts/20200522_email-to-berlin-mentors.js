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
  switchMap,
  tap,
  filter,
  startWith,
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
    subject: 'News in May: We need your help!',
    text: `Dear Mentors,

We hope this email finds you well and healthy! We have some news for you and also need your help with something!

1. We would love it if you can help us evaluate our program by filling out this short questionnaire (this is for everyone that has a mentee or had a mentee in the past semester): https://redischool.typeform.com/to/ipl7hv

2. We would like to invite you to our HR Summit on June 24th: https://www.redi-school.org/hrsummit We will discuss the future of work with a great panel in the morning and then there will be a job fair for our students - your mentees - in the afternoon. It would be fantastic if you could prepare your mentees by making their CVs shine and increase their self confidence !

3. Next week during out meetup hours we will offer a workshop for you on intentional listening, please register here, if you have not done so already: https://www.eventbrite.co.uk/e/redi-school-mentors-intentional-listening-workshop-tickets-104961741394

4. We wanted to say thank you again for all your support and hopefully we can see all of you offline again soon!

Stay healthy & happy!

Your Mentorship Team!

Isabelle, Dragos &  Eric`
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
    filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    filter(({ redProfile }) => redProfile.userActivated),
    startWith(
      { redProfile: { contactEmail: 'jan.schenk@microsoft.com' }},
      { redProfile: { contactEmail: 'manuelgeitnerdigital@gmail.com' }},
    ),

    /*
    take(2),
    map((data, index) => {
      data.redProfile.contactEmail = index === 0 ? 'eric@binarylights.com' : 'isabelle@redi-school.org';
      return data;
    }),
    */
    
    concatMap(
      userData =>
        sendMentorEmail(
          userData.redProfile.contactEmail,
        ).pipe(delay(5000)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),

    tap(userData => console.log(userData.redProfile.contactEmail)),
    count()
  )
  .subscribe(
    count => console.log('did this ' + count + ' times'),
    e => console.log('Error: ', e),
    () => console.log('done')
  )


