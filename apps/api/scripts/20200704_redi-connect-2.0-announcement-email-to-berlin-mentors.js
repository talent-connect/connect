'use strict'
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
  skip,
  map,
  switchMap,
  tap,
  filter,
  startWith,
  count,
} = require('rxjs/operators')

const { RedUser } = app.models

const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com', // Gmail Host
  port: 465, // Port
  secure: true, // this is true as port is 465
  auth: {
    user: 'career@redi-school.org', // Gmail username
    pass: process.env.GMAIL_PASSWORD_CAREER_AT_REDI_SCHOOL_DOT_ORG, // Gmail password
  },
})

const newsletterTemplateMjml = fs.readFileSync(
  path.resolve(
    __dirname,
    '..',
    'lib',
    'email',
    'templates',
    'newsletter.berlin.mjml'
  ),
  'utf-8'
)
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">SPOT THE DIFFERENCE</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />

<mj-text mj-class="text" padding="0 0 20px 0">Dear Mentors,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">we have fantastic news. We are LIVE with our new ReDI Connect Platform. Check it out: <a href="https://connect.redi-school.org/">https://connect.redi-school.org/</a></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Let us know if you find anything that is not working and also what you like the most! Logging sessions has never been easier!!!</mj-text>

<mj-text mj-class="text">
Another <strong>HUGE</strong> favor. In order for us to get further funding, could you fill out this feedback questionnaire: <a href="https://redischool.typeform.com/to/ipl7hv">https://redischool.typeform.com/to/ipl7hv</a>
</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">This is also <strong>SUPER important</strong> for us to know what to improve.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Also: in July and August, I will be only working part-time in the mentorship program, so forgive me if I do not answer on slack or emails immediately.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">ENJOY your summer!</mj-text>

<mj-text mj-class="text">Best,</mj-text>
<mj-text mj-class="text">Isabelle</mj-text>
`
)

const emailBodyParsed = mjml2html(emailBodyMjml, {
  filePath: path.resolve(__dirname, '..', 'lib', 'email', 'templates'),
})

const sendMjmlEmail = Rx.bindNodeCallback(
  transporter.sendMail.bind(transporter)
)

/* eslint-disable-next-line */
const sendMentorEmail = ({ recipient, firstName }) => {
  const mailOptions = {
    from: 'career@redi-school.org',
    to: recipient,
    subject: 'SPOT THE DIFFERENCE',
    html: emailBodyParsed.html,
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
    filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    filter(({ redProfile }) => redProfile.userActivated),

    /*
    take(2),
    map((data, index) => {
      data.redProfile.contactEmail = index === 0 ? 'eric@binarylights.com' : 'isabelle@redi-school.org';
      return data;
    })
    */

    /*
    concatMap(
      userData =>
        sendMentorEmail({
          recipient: userData.redProfile.contactEmail
        }).pipe(delay(5000)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),
    */

    tap((userData) => console.log(userData.redProfile.contactEmail)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  )
