'use strict';
const fs = require('fs');
const app = require('../server/server.js');
const nodemailer = require('nodemailer');
const Rx = require('rxjs');
const path = require('path');
const mjml2html = require('mjml');
const { bindNodeCallback, from } = Rx;
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
} = require('rxjs/operators');

const { RedUser } = app.models;

const transporter = nodemailer.createTransport({
  host: 'smtp.googlemail.com', // Gmail Host
  port: 465, // Port
  secure: true, // this is true as port is 465
  auth: {
    user: 'career@redi-school.org', // Gmail username
    pass: process.env.GMAIL_PASSWORD_CAREER_AT_REDI_SCHOOL_DOT_ORG, // Gmail password
  },
});

const newsletterTemplateMjml = fs.readFileSync(
  path.resolve(__dirname, '..', 'lib', 'email', 'templates', 'newsletter.berlin.paulina.mjml'),
  'utf-8'
);
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">ReDI for mentorship? Take these next steps!</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />


<mj-text mj-class="text" padding="0 0 20px 0">Hello, dear ReDI student,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Thank you for signing up on ReDI Connect!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Are you ReDI for some good news?!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">The Mentorship Program officially starts this week.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We have many mentors available for you to apply to!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0"><strong>NEXT STEPS</strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">1.- Register to attend one <strong>kick-off session</strong> next week.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">There will be two virtual sessions, please make sure to join at least ONE of them:</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">----> <a href="https://redi-school-org.zoom.us/j/93231824490?pwd=eW53MmFtdGFiRlVFRnh5NFh1aVh5Zz09">November 4th: 7 - 8 pm</a></mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">----> <a href="https://redi-school-org.zoom.us/meeting/register/tJIrfuyrqT0vEtXRbqoyvB5dbXrXQjiuI2Lc">November 6th: 6 - 7 pm</a></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">2.- Schedule a 15 min <strong>virtual meeting</strong> with me.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We will talk about your expectations and what kind of support you need from a mentor.</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Please schedule a meeting here: <a href="https://calendly.com/paulina-redi/getting-to-know-you">Getting-to-know-you</a></mj-text>

<mj-text mj-class="text">Best,</mj-text>
<mj-text mj-class="text">Paulina</mj-text>
`
);

const emailBodyParsed = mjml2html(emailBodyMjml, {
  filePath: path.resolve(__dirname, '..', 'lib', 'email', 'templates'),
});

const sendMjmlEmail = Rx.bindNodeCallback(transporter.sendMail.bind(transporter));

/* eslint-disable-next-line */
const sendMentorEmail = ({ recipient, firstName }) => {
  const mailOptions = {
    from: 'career@redi-school.org',
    replyTo: 'paulina@redi-school.org',
    to: recipient,
    subject: 'ReDI for mentorship? Take these next steps!',
    html: emailBodyParsed.html,
  };

  return sendMjmlEmail(mailOptions);
};

const redUserFind = (q) => bindNodeCallback(RedUser.find.bind(RedUser))(q);

redUserFind({ include: 'redProfile' })
  .pipe(
    delay(1000),
    switchMap((users) => from(users)),
    map((data) => {
      const pojo = JSON.parse(JSON.stringify(data));
      return {
        redUser: pojo,
        redProfile: pojo.redProfile,
        redUserInst: data,
        redProfileInst: data.redProfile,
      };
    }),
    filter(({ redProfile }) => !!redProfile),
    filter(({ redProfile }) => redProfile.userType === 'public-sign-up-mentee-pending-review'),
    // filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    // filter(({ redProfile }) => redProfile.userActivated),

    take(1),
    // map((data, index) => {
    //   switch (index) {
    //     case 0:
    //       data.redProfile.contactEmail = 'eric@binarylights.com';
    //       break;

    //     case 1:
    //       data.redProfile.contactEmail = 'miriam@redi-school.org';
    //       break;

    //     case 2:
    //       data.redProfile.contactEmail = 'paulina@redi-school.org';
    //       break;
    //   }
    //   return data;
    // }),

    concatMap(
      (userData) =>
        sendMentorEmail({
          recipient: userData.redProfile.contactEmail,
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
  );
