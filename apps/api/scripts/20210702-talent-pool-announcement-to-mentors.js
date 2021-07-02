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

<mj-text mj-class="headline">🥳 Join us for the launch of the ReDI Talent Pool! 🎉</mj-text>

<mj-divider mj-class="divider-top" css-class="divider" />

<mj-text mj-class="text" padding="0 0 20px 0">Dear :firstName:,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">As we are celebrating the end of the semester with our Demo Days 🎉 in Berlin, Munich and NRW, we would like to express our gratitude and thanks for your amazing commitment and support to our ReDI students and alumni in the past semester!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">A number of learners have found jobs and more often than not they tell us that their mentorship experience contributed to their success. 🙌</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">To help even more learners find a job or an internship position, we are organizing a job fair and HR conference twice a year. And the spring semester’s HR Summit is just around the corner: It is happening next week! 🤩</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">On Thursday, 8 July, we will start the day at 10am with a relevant discussion on “Diversity in the workplace”. Check out our panelists:</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">
<ul>
<li><a href="https://www.linkedin.com/in/idlir-islamaj/">Idlir Islamaj</a>, Alumnus ReDI School Munich, Microsoft365 & Power Platform Consultant, Skaylink</li>
<li><a href="https://www.linkedin.com/in/tconroy/">Tiffany Conroy</a>, Head of Engineering, Growth & Commerce Group, SoundCloud</li>
<li><a href="https://www.linkedin.com/in/rosmarie-steininger/?originalSubdomain=de">Rosemarie Steininger</a>, Founder & CEO, Chemistree</li>
<li><a href="https://www.linkedin.com/in/andrea-timmesfeld-084a49191/">Dr Andrea Timmesfeld</a>, Head of Diversity & Inclusion, Generali</li>
<li>Moderated by <a href="https://www.linkedin.com/in/anne-kj%C3%A6r-bathel-she-7b7a9037/">Anne Kjaer Bathel</a>, Co-Founder & CEO ReDI School of Digital Integration</li>
</ul>
</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">And then at 11:30 am we will launch our newest coolest addition to the ReDI product family: ReDI Talent Pool! 🥳 🏊 This platform will match ReDI talent with hiring companies. We are so excited to go on this journey and help bring more ReDI learners into a job while diversifying the German job market at the same time! 😎🙌</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">You are very welcome to join the conference and the Talent Pool launch event in the morning. Please register <a href="https://redischool.typeform.com/to/FAeGAuCT">via this link</a>.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">In the afternoon selected students and alumni will join our ReDI job fair. 🧑‍💼👩‍💼</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Perhaps your mentee has told you about it. If you can, it would be fantastic if you can support them in their preparations for talking to the recruiters in the booths. 💪</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">On another note, we are also in the process of recruiting new volunteers for the next semester. So, please share the attached flyer with anyone you think could be interested to teach, mentor or hold a career workshop with ReDI in the next semester! Also, if you feel like adding another layer to your ReDI experience, you are very welcome to inquire how you can support us further. We will have an info session on the different volunteering opportunities on Tuesday, 13 July. Even though the flyer and info session are mainly targeted for volunteers in Berlin, we are recruiting for all locations. Just drop us a line and we will direct you to the right contact person. 💁‍♀️</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">And then we would like to introduce ReDI’s newest volunteer opportunity to you: the RED team! 🔻🔺</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">It is a (remote) team of about 10 - 15 volunteer developers and designers who have been supporting us with the ReDI Connect and Talent Pool websites. Together we research, we design, we test, and we code, all to iteratively improve Connect and Talent Pool. In many ways, we are a Talent Pool! If you are interested in joining us, you can complete <a href="https://redischool.typeform.com/to/oSGmDVgX">this questionnaire</a>, so we can get to know you a bit and schedule an interview. We will take in new team members starting this September.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">This was a long email, so thanks for your time! 🙏</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We look forward to taking a first swim with you in the ReDI Talent Pool on 8 July! 😃</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Until then, stay wonderful and healthy ✨</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Miriam</mj-text>


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
    subject: '🥳 Join us for the launch of the ReDI Talent Pool! 🎉',
    html: emailBodyParsed.html.replace(':firstName:', firstName),
    attachments: [
      {
        filename: 'Volunteer Wanted BER.png',
        path: path.resolve(
          __dirname,
          'email_attachments/VOLUNTEERWANTED-BER.png'
        ),
      },
    ],
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
    filter(({ redProfile }) => redProfile.userType === 'mentor'),
    filter(({ redProfile }) => redProfile.userActivated),

    take(1),
    map((data, index) => {
      data.redProfile.contactEmail = 'eric@binarylights.com'
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

    tap((userData) => console.log(userData.redProfile.contactEmail)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  )
