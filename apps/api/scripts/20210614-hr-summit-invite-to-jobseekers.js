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
    'newsletter.berlin.paulina.mjml'
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
</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">2. You will be added to the Slack channel <strong>#job_fair_spring2021</strong></mj-text>

<mj-text mj-class="text" padding="0 0 0 0">3. On this Slack channel, we will share with you the list of companies & their positions.</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">This is a list of 30 companies who will attend the job fair so please take some time to review.</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">4. As part of your profile, there is a section named <strong>“Important Details”</strong></mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Here you are required to list your <strong>top 3 company + job preferences which are aligned to your skillset</strong>.</mj-text>

 <mj-text mj-class="text" padding="0 0 0 0">5. Once your profile is approved, the matching process between job seekers  and companies will take place.</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Successful matching is based on the company needs and the aligned skillset of job seeker.</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">6. We have invited you to two information sessions taking place on <strong>June 16th & 17th (via MS Teams links in the invitation)</strong>.</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0"><strong>You only need to attend one of these dates.</strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">If you have any questions, please ping @Paulina or @Zoë on Slack.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We look forward to seeing you at the Information Sessions!</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">Best regards,</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Paulina, Zoe & the Job fair team!</mj-text>


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
    filter(({ redProfile }) => redProfile.userType === 'mentor'),
    // filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    filter(({ redProfile }) => redProfile.userActivated),

    take(1),

    map((data, index) => {
      switch (index) {
        case 0:
          data.redProfile.contactEmail = 'eric@redi-school.org'
          break

        case 1:
          data.redProfile.contactEmail = 'paulina@redi-school.org'
          break

        case 2:
          data.redProfile.contactEmail = 'paulina@redi-school.org'
          break
      }
      return data
    }),

    concatMap(
      (userData) =>
        sendEmail({
          recipient: userData.redProfile.contactEmail,
          firstName: userData.redProfile.firstName,
        }).pipe(delay(5000)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),

    tap((userData) => console.log(`${userData.redProfile.contactEmail}`)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  )
