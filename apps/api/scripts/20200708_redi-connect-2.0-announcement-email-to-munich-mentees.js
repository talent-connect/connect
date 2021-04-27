'use strict'
const aws = require('aws-sdk')
const fs = require('fs')
const app = require('../server/server.js')
const nodemailer = require('nodemailer')
const Rx = require('rxjs')
const path = require('path')
const mjml2html = require('mjml')
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

const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION
}

const ses = new aws.SES(config)

const transporter = nodemailer.createTransport({
  SES: ses
})

const newsletterTemplateMjml = fs.readFileSync(path.resolve(__dirname, '..', 'lib', 'email', 'templates', 'newsletter.munich.mjml'), 'utf-8')
const emailBodyMjml = newsletterTemplateMjml.replace('${NEWSLETTER_BODY}', `

<mj-text mj-class="headline">SPOT THE DIFFERENCE</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />

<mj-text mj-class="text" padding="0 0 20px 0">Dear Mentees,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">we have fantastic news. We are LIVE with our new ReDI Connect Platform. Check it out: <a href="https://connect.munich.redi-school.org/">https://connect.munich.redi-school.org/</a></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Let us know if you find anything that is not working and also what you like the most! You can still apply for a mentor <strong>NOW</strong>!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We are opening a new school in <a href="https://de.redi-school.org/nrw-volunteers">Düsseldorf</a> and are currently looking for volunteers. If you know anyone in Düsseldorf that wants to help us as a volunteer teacher in <strong>HTML & CSS, Web Design, Python 1, and Networking Fundamentals, please direct them here: <a href="https://de.redi-school.org/nrw-volunteers">https://de.redi-school.org/nrw-volunteers</a> or get in touch with me.</strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">ENJOY your summer!</mj-text>

<mj-text mj-class="text">Best,</mj-text>
<mj-text mj-class="text">Christa</mj-text>
`)

const emailBodyParsed = mjml2html(emailBodyMjml, {
  filePath: path.resolve(__dirname, '..', 'lib', 'email', 'templates')
})

const sendMjmlEmail = Rx.bindNodeCallback(transporter.sendMail.bind(transporter))

/* eslint-disable-next-line */
const sendMentorEmail = ({recipient, firstName}) => {
  const mailOptions = {
    from: 'munich-career@redi-school.org',
    to: recipient,
    subject: 'SPOT THE DIFFERENCE',
    html: emailBodyParsed.html
  }

  return sendMjmlEmail(mailOptions)
}

const redUserFind = q => bindNodeCallback(RedUser.find.bind(RedUser))(q)

redUserFind({ include: 'redProfile' })
  .pipe(
    delay(100),
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
    filter(({ redProfile }) => redProfile.userType === 'mentee'),
    filter(({ redProfile }) => redProfile.rediLocation === 'munich'),
    filter(({ redProfile }) => redProfile.userActivated),

    /*
    take(1),
    map((data, index) => {
      data.redProfile.contactEmail = index === 0 ? 'eric@binarylights.com' : 'isabelle@redi-school.org';
      return data;
    }),
    */

    
    concatMap(
      userData =>
        sendMentorEmail({
          recipient: userData.redProfile.contactEmail
        }).pipe(delay(500)),

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
