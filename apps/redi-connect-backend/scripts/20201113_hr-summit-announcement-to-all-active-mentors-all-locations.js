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

<mj-text mj-class="headline">ReDI to get your mentee a job?</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />





<mj-text mj-class="text" padding="0 0 20px 0">Dear mentors and mentees,</mj-text>

I'm Eric, the architect behind ReDI Connect.

I'd like t

<mj-text mj-class="text" padding="0 0 20px 0">“Help me find a job”, your mentee might say.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Many of our mentors get that ask for help.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">It’s a tough ask and often not easy to respond to.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">So, how can you help? How can we as a community support people to get a foothold in the German job market?</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Today, we have three ideas for activities that you can do to make a positive difference.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">It’s all happening at the upcoming ReDI HR Summit on Friday November 27, online on Microsoft teams.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">1️⃣ First idea; <strong>join the conversation about these questions in our panel discussion: <em>ReDI for work? Let's discuss how we can accelerate job market integration for newcomers</em></strong>. Panel speakers are State Secretary Björn Böhning of the Federal Ministry of Labour and Social Affairs, Astrid Aupperle from Microsoft, Anne Kjaer Bathel, founder of ReDI, Dr. Hellen Fitsch from Accenture, and Amro Ali, a ReDI alumni working at Accenture.</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">💡 <a href="https://redischool.typeform.com/to/YeAe3YWq">Sign up here</a>, and get ReDI to hear great ideas and share yours!</mj-text>
<mj-text mj-class="text" padding="0 0 0 0">🎁 Panel discussion</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">🗓️ Friday November 27, 10:30 - 12:00</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">2️⃣ Second idea; <strong>know of any job or internship openings at your company or elsewhere? Ask them to come and present them at our job fair</strong>. Our students will be very happy to get the chance to speak to recruiters from a wide range of organizations.</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">💡 Ask someone from the company to <a href="https://www.eventbrite.co.uk/e/redi-hr-summit-fall-2020-registration-for-companies-tickets-125622591553">sign up here</a></mj-text>
<mj-text mj-class="text" padding="0 0 0 0">🎁 Share job/internship openings at job fair</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">🗓️ Friday November 27, 13:00 - 16:00</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">3️⃣ Third idea; <strong>get your mentee to join the job fair</strong>! If your mentee is looking for a job or internship, have them join. If you're curious yourself, or looking for a job, also join!</mj-text>

<mj-text mj-class="text" padding="0 0 0 0">💡 <a href="https://redischool.typeform.com/to/YeAe3YWq">Register yourself here</a>!</mj-text>
<mj-text mj-class="text" padding="0 0 0 0">🎁 Talk to recruiters at job fair</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">🗓️ Friday November 27, 13:00 - 16:00</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">If you have any questions regarding the event, feel free to reach out.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We look forward to seeing many of you on 27 November!</mj-text>

<mj-text mj-class="text" padding="0 0 0">Let's get ReDI for work!</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">Miriam</mj-text>


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
    subject: 'ReDI to get your mentee a job?',
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

    // take(1),
    // map((data, index) => {
    //   switch (index) {
    //     case 0:
    //       data.redProfile.contactEmail = 'isabelle@redi-school.org';
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

    tap((userData) => console.log(userData.redProfile.contactEmail)),
    count()
  )
  .subscribe(
    (count) => console.log('did this ' + count + ' times'),
    (e) => console.log('Error: ', e),
    () => console.log('done')
  );
