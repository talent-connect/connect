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
  path.resolve(__dirname, '..', 'lib', 'email', 'templates', 'newsletter.berlin.miriam.mjml'),
  'utf-8'
);
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">ReDI, Set, Go! Changes to mentoring topics in ReDI Connect and what you should do</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />




<mj-text mj-class="text" padding="0 0 20px 0">Dear :firstName:,</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">This is your guide to the new mentoring topics being released on the ReDI Connect platform. Whoop whoop! 🙌</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Are you ReDI? During our onboarding conversations with you, we felt that we need to adapt the mentoring topics you can choose from. We want to be able to better reflect your different talents and expertise. You’re welcome!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Also, we decided to align the mentoring topics across locations. Now every mentor and mentee regardless of their location (be they in Berlin, Munich or NRW) can choose from the same categories. This is just the first step to realize one of the next features that we're going to release soon: the option to match mentors and mentees across locations! Watch this space for updates 👀</mj-text>
 
<mj-text mj-class="text" padding="0 0 10px 0">So, what changed?</mj-text>
<mj-text mj-class="text" padding="0 0 10px 0">👉 We added a few more categories to better group the different mentoring topics, i.e. you will now see the categories: Software Engineering, Career Support, 🆕 Design, 🆕 Other Professions, 🆕 Language and 🆕 Other.</mj-text>
<mj-text mj-class="text" padding="0 0 10px 0">👉 We created more topics so that you can be more specific, esp. under the category Career Support, but also if you work in a non-tech position.</mj-text>
<mj-text mj-class="text" padding="0 0 10px 0">👉 A few old topics were dropped since not many people selected them. Other topics we split up into separate ones, e.g. Mobile Development, Web Development and Graphics & UX/UI (Berlin users only). Whenever that was the case, we selected all new options for you. So please have a look and make sure which topics you would like to keep checked.</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">👉 Since overall, we added more topics, mentees will now be able to select up to four (previously three) mentoring topics they're looking for support in.</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">We hope that these changes will allow for better matches to be formed on ReDI Connect. And please let us know if you feel we missed any major mentoring subject.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0"><a href="https://connect.redi-school.org">ReDI? Log into your profile and check out the new topics.<a></mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">Happy mentoring!</mj-text>
 
<mj-text mj-class="text" padding="0 0 5px 0">Best,</mj-text>
<mj-text mj-class="text" padding="0 0 0 0">Miriam</mj-text>
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
    replyTo: 'miriam@redi-school.org',
    to: recipient,
    subject: 'ReDI, Set, Go! Changes to mentoring topics in ReDI Connect and what you should do',
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
        redProfile.userType === 'mentor'
    ),
    // filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    filter(({ redProfile }) => redProfile.userActivated),

    take(1),
    map((data, index) => {
      switch (index) {
        case 0:
          data.redProfile.contactEmail = 'miriam@redi-school.org';
          break;

        case 1:
          data.redProfile.contactEmail = 'miriam@redi-school.org';
          break;

        case 2:
          data.redProfile.contactEmail = 'paulina@redi-school.org';
          break;
      }
      return data;
    }),

    concatMap(
      (userData) =>
        sendMentorEmail({
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
  );
