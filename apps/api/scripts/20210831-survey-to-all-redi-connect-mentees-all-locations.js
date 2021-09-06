'use strict'
const fs = require('fs')
const app = require('../server/server.js')
const nodemailer = require('nodemailer')
const Rx = require('rxjs')
const path = require('path')
const mjml2html = require('mjml')
const { bindNodeCallback, from } = Rx
const aws = require('aws-sdk')

const {
  delay,
  concatMap,
  take,
  skip,
  map,
  switchMap,
  tap,
  filter,
  startWith,
  count,
} = require('rxjs/operators')

const { RedUser } = app.models

const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION,
}

const ses = new aws.SES(config)

const transporter = nodemailer.createTransport({
  SES: ses,
})

const newsletterTemplateMjml = fs.readFileSync(
  path.resolve(
    __dirname,
    '..',
    'lib',
    'email',
    'templates',
    'newsletter.berlin.miriam.mjml'
  ),
  'utf-8'
)
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">ReDI Connect - We need your input!</mj-text>

<mj-divider mj-class="divider-top" css-class="divider" />


<mj-text mj-class="text" padding="0 0 20px 0">Dear ReDI mentees,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Our team around ReDI Connect always tries to improve the mentorship platform and the program to provide all features that are relevant for a successful mentoring experience.</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">That’s why we started to conduct a user research to learn more about your needs and experiences with the platform and the program in general. Based on the outcome of a few targeted user interviews, we created this survey to help us identify areas for improvement on a broader scale. So we need your help by filling out this survey with your honest feedback. </mj-text>

<mj-text mj-class="text" padding="0 0 20px 0"><a href="https://redischool.typeform.com/to/IDuJPxzo">Click here to fill in this survey</a>.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Please complete the survey by Wednesday 15th of September.</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">If you have any questions or would like to continue the conversation on ReDI Connect with us beyond this survey, please reach out at career@redi-school.org</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">Thanks so much for taking the time to give us your feedback!</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">Have a great day,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Your ReDI Connect Team</mj-text>

`
)

const emailBodyParsed = mjml2html(emailBodyMjml, {
  filePath: path.resolve(__dirname, '..', 'lib', 'email', 'templates'),
})

const sendMjmlEmail = Rx.bindNodeCallback(
  transporter.sendMail.bind(transporter)
)

/* eslint-disable-next-line */
const sendEmail = ({ recipient, firstName }) => {
  const mailOptions = {
    from: 'career@redi-school.org',
    replyTo: 'career@redi-school.org',
    to: recipient,
    subject: 'ReDI Connect - We need your input!',
    html: emailBodyParsed.html.replace(':firstName:', firstName),
  }

  return sendMjmlEmail(mailOptions)
}

// const emails = `eric@binarylights.com`.split(`\n`)

const redUserFind = (q) => bindNodeCallback(RedUser.find.bind(RedUser))(q)

redUserFind({ include: 'redProfile' })
  .pipe(
    delay(1000),
    switchMap((users) => from(users)),
    map((data) => {
      const pojo = JSON.parse(JSON.stringify(data))
      return {
        redUser: pojo,
        redProfile: pojo.redProfile,
        redUserInst: data,
        redProfileInst: data.redProfile,
      }
    }),
    filter(({ redProfile }) => !!redProfile),
    filter(({ redProfile }) => redProfile.userType === 'mentee'),
    filter(({ redProfile }) => redProfile.userActivated),

    // take(2),
    // map((data, index) => {
    //   data.redProfile.contactEmail =
    //     index === 0 ? 'miriam@redi-school.org' : 'johanna@redi-school.org'
    //   return data
    // }),
    concatMap(
      (userData) =>
        sendEmail({
          recipient: userData.redProfile.contactEmail,
          firstName: userData.redProfile.firstName,
        }).pipe(delay(250)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),

    tap((userData) => console.log(userData.redProfile.contactEmail)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  )
