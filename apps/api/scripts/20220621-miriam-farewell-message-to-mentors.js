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

<mj-text mj-class="headline">So long ReDI mentors 👋🦋</mj-text>

<mj-divider mj-class="divider-top" css-class="divider" />
<mj-text mj-class="text" padding="0 0 20px 0">Dear wonderful ReDI mentors 🧡💙</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">This is my last personal email to you as my time at ReDI School has officially come to an end 😢 </mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">It has been a wonderful ride to serve as a manager of this mentorship program and grow into the role of a product owner for ReDI Connect and Talent Pool over the past 20 months. It has been SO rewarding to get to know so many of you beautiful human beings who choose to dedicate their time, knowledge and skills to support and lift others who may need a helping hand, an open ear and an encouraging voice at this time. I cannot thank you enough for your commitment, your courage and your invaluable contribution to making the ReDI community a place of hope and care ❤️🙏</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">I leave the mentorship program in the best hands that anyone could wish for: Johanna’s ❤️Johanna (johanna@redi-school.org), who many of you may already know as our mentorship community manager, will be your main focal point going forward for any mentorship and ReDI Connect related issues. She will continue to organize mentor meet-ups and training sessions once the new semester starts again 🗣</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">I will not be leaving the ReDI community completely, as I will continue to serve as a proud ReDI mentor myself ☺️</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">So I am looking forward to seeing some of you in one of the ReDI events going forward! 🎢</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">🔗Please feel free to reach out to me via slack to stay in touch.</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Wishing you all the very very best for your future endeavors! 🍀</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">It has been a great honor and pleasure working with you! 🙇‍♀️</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">✨Stay as awesome as you are ✨</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">Miriam</mj-text>


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
    subject: 'So long ReDI mentors 👋🦋',
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
    filter(({ redProfile }) => redProfile.userType === 'mentor'),
    filter(({ redProfile }) => redProfile.userActivated),

    // take(1),
    // map((data, index) => {
    //   data.redProfile.contactEmail =
    //     index === 0 ? 'eric@redi-school.org' : 'johanna@redi-school.org'
    //   return data
    // }),
    concatMap(
      (userData) =>
        sendEmail({
          recipient: userData.redProfile.contactEmail,
          firstName: userData.redProfile.firstName,
        }).pipe(delay(500)),

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
