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
    'newsletter.berlin.zoe.mjml'
  ),
  'utf-8'
)
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `


<mj-text mj-class="headline">Getting ReDI for the Job Fair Spring 2021!</mj-text>

<mj-divider mj-class="divider-top" css-class="divider" />

<mj-text mj-class="text" padding="0 0 20px 0">Dear Students and alumni,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Thank you for completing the interest form for our ReDI Job Fair! It is wonderful to hear that you are interested in participating.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">This email is to inform you about the next steps in the selection process:</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">1. We invite you to create a profile on our new tool Talent Pool:</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0"><strong><a href="https://talent-pool.redi-school.org" target="_blank">talent-pool.redi-school.org</a></strong></mj-text>
<mj-text mj-class="text" padding="0 0 0 0"><strong>Deadline: June 18th at 12pm</strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">
<ul>
<li>watch out for those spelling mistakes</li>
<li>communicate who you are effectively (complete each section with as much information as possible to showcase your skills)</li>
<li>tell us what kind of job/area you are looking for</li>
</ul>
</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">2. You will be added to the Slack channel <strong>#job_fair_spring2021</strong>. We will share updates and information here so please keep an eye on this channel.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">3. As part of your profile, please add your postal address (this is for organizational purposes related to the job fair-this can be deleted after if needed)</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">4. Once your profile is approved, we will be in touch with next steps.</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">5. We have invited you to two information sessions taking place on <strong>June 16th & 17th</strong>. The sessions happen in Microsoft Teams. You’ll find the links to join the sessions in your calendar invitation, as well as here:</mj-text>
<mj-text mj-class="text" padding="0 0 0 0">
<ul>
<li><a href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_NGIyNzY4YTktODA0Yy00ODRjLTg1MTE[…]2c%22Oid%22%3a%2292ed15ee-3242-4ade-adc2-60676c34a7ed%22%7d" target="_blank">Information Session on June 16th, 17:30 - 18:30</a></li>
<li><a href="https://teams.microsoft.com/l/meetup-join/19%3ameeting_Mzc5OWFmZjgtYzhmZC00OGY1LWI0NWE[…]2c%22Oid%22%3a%2292ed15ee-3242-4ade-adc2-60676c34a7ed%22%7d" target="_blank">Information Session on June 17th, 17:30 - 18:30</a></li>
</ul>
</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0"><strong>You only need to attend one of these dates.</strong></mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">If you have any questions, please ping @Paulina or @Zoë on Slack.</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">We look forward to seeing you at the Information Sessions!</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Best regards,</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Paulina, Zoe & the Job fair team!</mj-text>


Dear [mentor’s name],

As we are celebrating the end of the semester with our Demo Days 🎉 in Berlin, Munich and NRW, we would like to express our gratitude and thanks for your amazing commitment and support to our ReDI students and alumni in the past semester!

A number of learners have found jobs and more often than not they tell us that their mentorship experience contributed to their success. 🙌


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
    subject: 'Getting ReDI for the Job Fair Spring 2021!',
    html: emailBodyParsed.html.replace(':firstName:', firstName),
  }

  return sendMjmlEmail(mailOptions)
}

const redUserFind = (q) => bindNodeCallback(RedUser.find.bind(RedUser))(q)

const emails = `<blanked for privacy>`.split(`\n`)

from(emails)
  .pipe(
    // take(1),

    // map((data, index) => {
    //   switch (index) {
    //     case 0:
    //       return 'eric@binarylights.com'
    //       break

    //     case 1:
    //       return 'isabelle@redi-school.org'
    //       break

    //     case 2:
    //       return 'paulina@redi-school.org'
    //       break
    //   }
    //   return data
    // }),

    concatMap(
      (userData) =>
        sendEmail({
          recipient: userData,
        }).pipe(delay(500)),

      (userData, sendResult) => userData
    ),

    tap((userData) => console.log(`${userData}`)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  )
