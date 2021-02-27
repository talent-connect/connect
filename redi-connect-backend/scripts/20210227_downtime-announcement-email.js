'use strict';
const fs = require('fs');
const app = require('../server/server.js');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
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

const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION,
};

const ses = new aws.SES(config);

const transporter = nodemailer.createTransport({
  SES: ses,
});

const newsletterTemplateMjml = fs.readFileSync(
  path.resolve(__dirname, '..', 'lib', 'email', 'templates', 'newsletter.berlin.eric.mjml'),
  'utf-8'
);
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">ReDI Connect maintenance downtime on 27 February</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />


<mj-text mj-class="text" padding="0 0 20px 0">Hi there :firstName:,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Just a quick notice that ReDI Connect will be unavailable for a few hours today on Saturday 27 February due to maintenance.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Apologies for any inconvenience. You will be able to access ReDI Connect again soon!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Enjoy your weekend,</mj-text>
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
    subject: 'ReDI Connect maintenance downtime on 27 February',
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

    // take(1),
    // map((data, index) => {
    //   data.redProfile.contactEmail = 'eric@redi-school.org';
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

    concatMap(
      (userData) =>
        sendMentorEmail({
          recipient: userData.redProfile.contactEmail,
          firstName: userData.redProfile.firstName,
        }).pipe(delay(200)),

      (userData, sendResult) => ({ ...userData, sendResult })
    ),

    tap((userData) => console.log(`${userData.redProfile.contactEmail}`)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  );
