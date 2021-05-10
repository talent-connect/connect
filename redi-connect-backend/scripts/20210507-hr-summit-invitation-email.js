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
  path.resolve(__dirname, '..', 'lib', 'email', 'templates', 'newsletter.berlin.footerless.mjml'),
  'utf-8'
);
const emailBodyMjml = newsletterTemplateMjml.replace(
  '${NEWSLETTER_BODY}',
  `

<mj-text mj-class="headline">ReDI HR Summit & Job Fair on 8 July 2021</mj-text>
<mj-text mj-class="tagline">Call for registrations and job openings</mj-text>

<mj-divider mj-class="divider-top" css-class="divider" />

<mj-text mj-class="text" padding="0 0 20px 0">Dear wonderful mentors,</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">We would like you to let you know about our next <strong>ReDI HR SUMMIT & JOB FAIR</strong> coming up on the <strong>8th July 2021</strong>.</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">Following the success of previous editions, we are super excited to organize this virtual event again this year. More than 100 talented ReDI students and alumni are currently seeking internship and employment opportunities.  </mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">💡In light of that, ReDI HR SUMMIT & JOB FAIR is established as an annual career and networking event, offering an effective platform for employers, experienced professionals (like you 😉), and students to engage, network and forge potential relationships.</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">Our HR Summit & Job Fair has two main goals:</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">1️⃣ Establish and maintain collaboration between companies, mentors, and students through ReDI School to allow even more fruitful exchange 🤝</mj-text>
<mj-text mj-class="text" padding="0 0 20px 0">2️⃣ Create new opportunities for students and alumni </mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">There will be a panel discussion in the morning that everyone from the ReDI community can participate in. In the afternoon selected companies will be meeting selected students to talk about their job openings. You can <a href="https://www.redi-school.org/hrsummit">find more details about the event here</a>. </mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">So if you would like to join the panel talk in the morning from 10:30 am - 12:00 pm, please register <a href="https://redischool.typeform.com/to/FAeGAuCT">here</a>. To make preparations easier for us, please register as soon as possible. The deadline for registration is May 31st.  </mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">If your company has any job openings, be it in the form of an internship or junior positions, please contact Birgit (<a href="mailto:birgit@redi-school.org">birgit@redi-school.org</a>), so we can invite your company to be present at the job fair in the afternoon. Feel free to forward this email to your HR Department or tell them to get in touch with Birgit.</mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">If you would like to see who found a job through one of the last job fairs, <a href="https://medium.com/redi-school-of-digital-integration/3-its-a-match-vincent-cgi-96a07bc2b089">read Vincent’s story on our blog</a href-"https://medium.com/redi-school-of-digital-integration/3-its-a-match-vincent-cgi-96a07bc2b089">.</mj-text>
 
<mj-text mj-class="text" padding="0 0 20px 0">We truly appreciate your support in helping us invite suitable companies to the job fair that are interested in hiring our students and alumni. </mj-text>

<mj-text mj-class="text" padding="0 0 20px 0">If you have any questions, please feel free to reach out. We love to hear from you!</mj-text>

<mj-text mj-class="text" padding="0 0 40px 0">Your Career Support Team at ReDI School</mj-text>


<mj-text mj-class="text-small" padding="0 0 20px 0"><em>If you want to see and read more about what is happening at ReDI School, please follow us on our social media channels:</em></mj-text>


<mj-social>
  <mj-social-element name="instagram-noshare" href="https://www.instagram.com/redischoolberlin">ReDI School Berlin on Instagram</mj-social-element>
</mj-social>
<mj-social>
  <mj-social-element name="instagram-noshare" href="https://www.instagram.com/redimunich">ReDI School Munich on Instagram</mj-social-element>
</mj-social>
<mj-social>
  <mj-social-element name="twitter-noshare" href="https://twitter.com/ReDISchool">ReDI School on Twitter</mj-social-element>  
</mj-social>

<mj-text mj-class="text-small" padding="0 0 20px 0"><em>Or join our LinkedIn community group: </em></mj-text>

<mj-social>
  <mj-social-element name="linkedin-noshare" href="https://www.linkedin.com/groups/8776751/">LinkedIn</mj-social-element>
</mj-social>

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
    replyTo: 'career@redi-school.org',
    to: recipient,
    subject: 'ReDI HR Summit & Job Fair on 8 July 2021',
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
        redProfile.userType === 'mentor'
    ),
    // filter(({ redProfile }) => redProfile.rediLocation === 'berlin'),
    filter(({ redProfile }) => redProfile.userActivated),

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
    

    concatMap(
      (userData) =>
        sendMentorEmail({
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
  );
