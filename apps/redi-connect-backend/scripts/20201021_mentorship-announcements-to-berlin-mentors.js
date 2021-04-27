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
  path.resolve(__dirname, '..', 'lib', 'email', 'templates', 'newsletter.berlin.mjml'),
  'utf-8'
);
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">ReDI for the latest news? ReDI Connect is growing!</mj-text>
<mj-divider mj-class="divider-top" css-class="divider" />


<mj-text mj-class="text" padding="0 0 20px 0">Dear Mentors,</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">ReDI for some good news?!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">After spending the last four months fundraising, we’ve secured funding for the mentorship program until 2022!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">And, ReDI Connect is growing!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Already helping mentors and mentees in Berlin and Munich to connect, we’re launching our mentorship program in North Rhine-Westphalia in November, and soon thereafter in Copenhagen!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">There will also be a change in the team. After over 200 mentor-mentee matches and over 700 hours of logged sessions (hint: keep logging your sessions!), it’s time to hand on the mentorship baton. I’ll be moving into my new position as Head of the Career Team. My new job will focus on running the Career Support Department, with a mission to enable even more of our students in Berlin, Munich and NRW to become job ready and find a job.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">My colleague Miriam Abu Hamdan is our new manager for the Mentorship Program and will be the contact point for mentors. Reach her on <a href="mailto:miriam@redi-school.org">miriam@redi-school.org</a>. In urgent matters you best reach her through Slack.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Miriam spent the past six months fundraising with the ReDI Munich team. She has a background in international development and humanitarian assistance working for the UN. She loves to connect people and is very excited to meet you all soon. We will <strong>kick off this semester's mentorship program with an online MeetUp on Thursday, November 5th at 7pm</strong>, so please save the date and <a href="https://www.meetup.com/ReDI-school/events/274033541/">RSVP right here</a>! It will be an opportunity for old and new mentors to meet and connect.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">Please also know that Paulina Muñoz will be taking over the onboarding and care of the mentees. So in case your mentees face any issues on the side of onboarding, they can reach her on <a href="paulina@redi-school.org">paulina@redi-school.org</a>.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">A few kind requests: Please let Miriam know if we should mark your previous mentoring relationship with a mentee as 'completed', as only then you will be able to receive new mentorship applications this semester. In case you want to take a break from mentoring, please edit your profile and set your “Mentee Count” to zero. Also if you haven't done so already, please fill out <a href="https://redischool.typeform.com/to/ipl7hv">our survey on your mentorship experience</a>. This data is super valauble for us to improve our program and deliver better results for you and your mentees.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">We are also still looking for new mentors for Berlin and NRW, so if you know of any friends or colleagues that could be interested in mentoring with ReDI, please direct them to Miriam.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">It’s been a true pleasure working with all you wonderful mentors!</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">As always, please keep logging your mentorship hours!</mj-text>

<mj-text mj-class="text">All the best,</mj-text>
<mj-text mj-class="text">Isabelle and Miriam</mj-text>
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
    to: recipient,
    subject: 'ReDI for the latest news? ReDI Connect is growing!',
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
    filter(({ redProfile }) => redProfile.userType === 'mentor'),
    filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    filter(({ redProfile }) => redProfile.userActivated),

    skip(146),
    // map((data, index) => {
    //   switch (index) {
    //     case 0:
    //       data.redProfile.contactEmail = 'eric@binarylights.com';
    //       break;

    //     case 1:
    //       data.redProfile.contactEmail = 'miriam@redi-school.org';
    //       break;

    //     case 2:
    //       data.redProfile.contactEmail = 'isabelle@redi-school.org';
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
