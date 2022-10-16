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
  map,
  switchMap,
  tap,
  filter,
  count,
  take,
} = require('rxjs/operators')

const { TpCompanyProfile } = app.models

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
    'newsletter.berlin.footerless.mjml'
  ),
  'utf-8'
)
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

  <mj-text mj-class="text text-padding">Dear companies,</mj-text>
  <mj-text mj-class="headline">We have big news!</mj-text>
  <mj-divider mj-class="divider-top" css-class="divider" />
  <mj-text mj-class="text bottom-padding">
    After over a year, the talent pool has now got over 80 company users
    and over 250 jobseekers. But: we do not want to stop here. This is
    why as of February 2023 we want to make the talent pool more user
    friendly, create more great job matches and make it a super
    successful platform. What is more is that we want to use the
    platform to make ReDI School more financially sustainable in the
    future.
  </mj-text>
  <mj-text mj-class="text bottom-padding"
    >This is why we need your help. We want to know how you are using
    the platform currently, what we should do to improve it and whether
    you want to be part of our growth!</mj-text
  >
  <mj-text mj-class="text bottom-padding">
    In order to keep your profile active after November 15th 2022, we
    would like to ask you to fill out this
    <a href="https://redischool.typeform.com/to/xPBbw1po">survey</a> (It
    takes exactly 1 min and 31 seconds) before November 15th!</mj-text
  >
  <mj-text mj-class="text text-padding">
    Also within the survey you will find an invitation to join a design
    thinking workshop on November 17th and 18th. We would love for you
    to join this so we can meet you in person to see what your needs for
    the talent pool are in the future!
  </mj-text>
  <mj-text mj-class="text" padding="20px 0 30px 0"
    >Thank you for helping us grow!</mj-text
  >
  <mj-text mj-class="text">Your Talent Pool Team!</mj-text>


`
)

const emailBodyParsed = mjml2html(emailBodyMjml, {
  filePath: path.resolve(__dirname, '..', 'lib', 'email', 'templates'),
})

const sendMjmlEmail = Rx.bindNodeCallback(
  transporter.sendMail.bind(transporter)
)

/* eslint-disable-next-line */
const sendEmail = ({ recipient }) => {
  const mailOptions = {
    from: 'career@redi-school.org',
    replyTo: 'career@redi-school.org',
    to: recipient,
    subject: 'We have big news!',
    html: emailBodyParsed.html,
  }

  return sendMjmlEmail(mailOptions)
}

// const emails = `eric@binarylights.com`.split(`\n`)

const tpCompanyProfileFind = (q) =>
  bindNodeCallback(TpCompanyProfile.find.bind(TpCompanyProfile))(q)

tpCompanyProfileFind()
  .pipe(
    delay(1000),
    switchMap((companies) => from(companies)),
    filter(({ state }) => state === 'profile-approved'),

    // take(1),
    // map((data, index) => {
    //   data.redProfile.contactEmail = 'anilakarsu93@gmail.com'
    //   return data
    // }),
    concatMap(
      (companyData) =>
        sendEmail({
          recipient: companyData.contactEmail,
        }).pipe(delay(500)),

      (companyData, sendResult) => ({ ...companyData, sendResult })
    ),

    tap((companyData) => console.log(companyData.contactEmail)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  )
