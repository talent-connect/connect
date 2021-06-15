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

<mj-text mj-class="headline">Get ReDI for the 8 July 2021 Job Fair!</mj-text>
<mj-text mj-class="tagline">Post your jobs on th ReDI Talent Pool and get interviewees</mj-text>

<mj-divider mj-class="divider-top" css-class="divider" />


<mj-text mj-class="text" padding="0 0 20px 0">Dear :firstName:,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Thank you for registering your company for the ReDI HR SUMMIT's Job Fair. </mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We are currently preparing the next steps and would like to invite you to sign up to the <strong>new ReDI Talent Pool</strong> platform so that we can:</mj-text>

- schedule the interviews (while the job fair) between relevant jobseekers and your recruiters attending the HR Summit's Job Fair
- on and after the job fair, to stay in contact with our talents and promote your internship/job posts to our entire community of jobseekers, to getting you more relevant applicants

<mj-text mj-class="text" padding="0 0 0 0"><strong>To proceed, please:</strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">
<ul>
<li>Go to <a href="https://talent-pool.redi-school.org" target="_blank">talent-pool.redi-school.org</a></li>
<li>Sign up</li>
<li>Create your profile</li>
<li>Add your internship/job postings</li>
</ul>
</mj-text>

<mj-text mj-class="text" padding="0 0 0 0"><strong><u>Further information about the Event:</u></strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">
<ul>
<li><strong>The platform:</strong> We will be hosting the job fair in the afternoon as well as the morning conference panel in <strong>Microsoft Teams</strong>.</li>
<li><strong>Participants form your company:</strong> If you are joining with more or other colleagues then named in the registration, please send their name and <strong>e-mail to <a href="mailto:yara@redi-school.org">yara@redi-school.org</a> by June 30th</strong> at the latext. Only with this information we can give them access to the job fair.</li>
<li><strong>The 1:1 interviews:</strong> For the 1:1 Short Interviews between your recruiters and the ReDI talents we will schedule virtual appointments (10 minutes) and create individual invite links (you will receive a separate email about this)</li>
<li><strong>Virtual "Booths" & Networking:</strong> In addition to MS Teams we will be using a platform called <a href="https://help.wonder.me/en/articles/4947041-faqs" target="_blank">wonder.me</a>, so that you can network in between the interview sessions and meet fellow recruiters, colleagues or members of the ReDI community, almost like in "real" life.</li>
<li><strong>Onboarding-Session for Companies:</strong> Please <strong>save the date</strong> for the onboarding session with MS Teams on <strong>July 5th at 11 am</strong>. Here we will explain everything in detail.</li>
<li><strong>Welcome-Package:</strong> We would also like to send you a <strong>little welcome-package</strong> before the job fair and will be using the addresses we found in your email signatures. <strong>In case you would like to use a different address,</strong> please drop us an <strong>email to <a href="mailto:yara@redi-school.org">yara@redi-school.org</a></strong></li>
</ul>
</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0"><strong>Further Questions?</strong> More information about the HR SUMMIT (Conference & Job Fair) can be found on the <a href="https://www.redi-school.org/hrsummit" target="_blank">Website</a> and the <a href="https://a11e0a06-2fa2-417a-9a9f-6ccbf93cb336.filesusr.com/ugd/206b5b_1a3eb65fa236499fa87295507aafefc9.pdf" target="_blank">FAQs</a> or reach out to <a href="mailto:isabelle@redi-school.org">isabelle@redi-school.org</a> or <a href="mailto:birgit@redi-school.org">birgit@redi-school.org</a>.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We're happy to offer support as needed.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Your ReDI Career Team</mj-text>

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
    from: 'birgit@redi-school.org',
    replyTo: 'birgit@redi-school.org',
    to: recipient,
    subject:
      'Get ReDI for the 8 July 2021 Job Fair! Post your jobs and get interviewees',
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
          data.redProfile.contactEmail = 'birgit@redi-school.org'
          break

        case 1:
          data.redProfile.contactEmail = 'miriam@redi-school.org'
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
