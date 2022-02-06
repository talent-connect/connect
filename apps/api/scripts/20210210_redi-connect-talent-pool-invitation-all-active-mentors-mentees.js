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
  path.resolve(__dirname, '..', 'lib', 'email', 'templates', 'newsletter.berlin.eric.mjml'),
  'utf-8'
);
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">ReDI to hack?</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />


<mj-text mj-class="text" padding="0 0 20px 0">Hi there,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">I'm Eric 👋 My job is to run and improve ReDI Connect - alongside my partner in crime, Miriam.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">It's been great fun seeing ReDI Connect grow. The code repo started a couple of years ago with a humble create-react-app command in my Terminal window. Fast forward to today, my baby has grown into a mentor-mentee matchmaking that has paired 300 mentees to 300 mentors.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">And now, another adventure is about to start. ReDI Connect is getting a sibling! Are you ReDI for it?</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">ReDI Connect's playmate will be... ReDI Talent Pool!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">A new meeting place, this time for jobSeekers and companies. Positions will be posted and ReDI jobSeekers (many of them ReDI Connect mentees) will apply to them. JobSeekers will also get help to prepare their stunning CVs.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We need some help to get started, and here is where the next surprise comes in:</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">The first <strong>ReDI Connect & Talent Pool hackathon</strong>! Happening <strong>this weekend, this Saturday, February 13th, 12:00 - 17:30, on Zoom.</strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We've got three exciting challenges, and want to see how YOU think they can best be solved:</mj-text>

<mj-text mj-class="text" padding="0 0 5px 0">1) Mentees finding mentors: How might we improve the way that mentees can find their ideal mentor?</mj-text>
<mj-text mj-class="text" padding="0 0 5px 0">2) CV Builder: How might we create the best way for jobseeking students/alumni to build their perfect CV to apply to jobs?</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">3) Azure migration: How might we best migrate from the current cloud setup on AWS to our new home in the Azure clouds</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">If you're a front/back-end developer or UI/UX designer and want to make a real difference for ReDI students and alumni looking to break into tech, this is for you.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0"><strong>Find more information and register here:</strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0"><strong><a href="http://bit.ly/redi-hackathon">http://bit.ly/redi-hackathon</a></strong></mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Are you ReDI?</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Yalla habibis,</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Eric</mj-text>


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
    replyTo: 'eric@redi-school.org',
    to: recipient,
    subject: 'ReDI to hack? Come join the ReDI Hackathon this Saturday!',
    html: emailBodyParsed.html.replace(':firstName:', firstName),
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
    filter(
      ({ redProfile }) =>
        redProfile.userType === 'public-sign-up-mentor-pending-review' ||
        redProfile.userType === 'mentor' ||
        redProfile.userType === 'public-sign-up-mentee-pending-review' ||
        redProfile.userType === 'mentee'
    ),
    // filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    filter(({ redProfile }) => redProfile.userActivated),

    skip(446),
    // map((data, index) => {
    //   switch (index) {
    //     case 0:
    //       data.redProfile.contactEmail = 'eric@redi-school.org';
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

    // concatMap(
    //   (userData) =>
    //     sendMentorEmail({
    //       recipient: userData.redProfile.contactEmail,
    //       firstName: userData.redProfile.firstName,
    //     }).pipe(delay(5000)),

    //   (userData, sendResult) => ({ ...userData, sendResult })
    // ),

    tap((userData) => console.log(`${userData.redProfile.contactEmail}`)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  );
