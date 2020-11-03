'use strict';

const aws = require('aws-sdk');
const Rx = require('rxjs');
const mjml2html = require('mjml');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION,
};
const { buildFrontendUrl } = require('../build-frontend-url');
const { buildBackendUrl } = require('../build-backend-url');

const ses = new aws.SES(config);

const transporter = nodemailer.createTransport({
  SES: ses,
});

const isProductionOrDemonstration = () =>
  ['production', 'demonstration', 'staging'].includes(process.env.NODE_ENV);

const sendEmail = Rx.bindNodeCallback(ses.sendEmail.bind(ses));
const sendMjmlEmail = Rx.bindNodeCallback(transporter.sendMail.bind(transporter));
const sendEmailFactory = (to, subject, body, rediLocation) => {
  let toSanitized = isProductionOrDemonstration() ? to : 'eric@binarylights.com';
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT;
  }
  let sender;
  if (rediLocation === 'berlin' || rediLocation === 'nrw') {
    sender = 'career@redi-school.org';
  } else if (rediLocation === 'munich') {
    sender = 'munich-career@redi-school.org';
  } else {
    sender = 'career@redi-school.org';
  }
  return sendEmail({
    Source: sender,
    Destination: {
      ToAddresses: [toSanitized],
      BccAddresses: ['eric@binarylights.com'],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  });
};
const sendMjmlEmailFactory = ({ to, subject, html, rediLocation }) => {
  let toSanitized = isProductionOrDemonstration() ? to : 'eric@binarylights.com';
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT;
  }
  let sender;
  if (rediLocation === 'berlin' || rediLocation === 'nrw') {
    sender = 'career@redi-school.org';
  } else if (rediLocation === 'munich') {
    sender = 'munich-career@redi-school.org';
  } else {
    sender = 'career@redi-school.org';
  }
  return sendMjmlEmail({
    from: sender,
    to: toSanitized,
    bcc: 'eric@binarylights.com',
    subject: subject,
    html: html,
  });
};

const sendReportProblemEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'templates', 'send-problem-report.mjml'),
  'utf-8'
);
const sendReportProblemEmailParsed = mjml2html(sendReportProblemEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates'),
});

const sendReportProblemEmail = ({ sendingUserEmail, message }) => {
  const html = sendReportProblemEmailParsed.html
    .replace(/\${sendingUserEmail}/g, sendingUserEmail)
    .replace(/\${message}/g, message);
  return sendMjmlEmailFactory({
    to: 'career@redi-school.org',
    subject: 'New problem report',
    html: html,
  });
};

const sendResetPasswordEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'templates', 'reset-password.mjml'),
  'utf-8'
);
const sendResetPasswordEmailParsed = mjml2html(sendResetPasswordEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates'),
});

const sendResetPasswordEmail = ({ recipient, firstName, accessToken, rediLocation }) => {
  const resetPasswordUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/reset-password/set-new-password/${accessToken}`;
  const rediEmailAdress = `${
    rediLocation.toLowerCase() === 'munich' ? 'munich-' : ''
  }career@redi-school.org`;
  const html = sendResetPasswordEmailParsed.html
    .replace(/\${firstName}/g, firstName)
    .replace(/\${resetPasswordUrl}/g, resetPasswordUrl)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress)
    .replace(/\${emailAdress}/g, recipient);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Password Reset for ReDI Connect',
    html: html,
    rediLocation,
  });
};

const sendPendingReviewDeclinedEmail = ({ recipient, firstName, rediLocation, userType }) => {
  const rediEmailAdress = `${
    rediLocation.toLowerCase() === 'munich' ? 'munich-' : ''
  }career@redi-school.org`;

  const sendPendingReviewDeclinedEmailParsed = convertTemplateToHtml(
    null,
    `pending-review-declined-email--${userType}`
  );

  const html = sendPendingReviewDeclinedEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${rediLocation}/g, rediLocation)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'ReDI Connect: Your user registration was declined',
    html: html,
    rediLocation,
  });
};

const convertTemplateToHtml = (rediLocation, templateString) => {
  const convertTemplate = fs.readFileSync(
    path.resolve(
      __dirname,
      'templates',
      `${templateString}${rediLocation ? `.${rediLocation.toLowerCase()}` : ''}.mjml`
    ),
    'utf-8'
  );
  const parsedTemplate = mjml2html(convertTemplate, {
    filePath: path.resolve(__dirname, 'templates'),
  });
  return parsedTemplate.html;
};

const sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted = ({
  recipient,
  mentorName,
  menteeName,
  rediLocation,
}) => {
  const rediEmailAdress = `${
    rediLocation.toLowerCase() === 'munich' ? 'munich-' : ''
  }career@redi-school.org`;
  const sendMenteePendingReviewAcceptedEmailParsed = convertTemplateToHtml(
    rediLocation,
    'expired-notification-application'
  );
  const html = sendMenteePendingReviewAcceptedEmailParsed
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${menteeName}/g, menteeName)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `ReDI Connect: mentorship application from ${menteeName} expired`,
    html: html,
    rediLocation,
  });
};

const sendMenteePendingReviewAcceptedEmail = ({ recipient, firstName, rediLocation }) => {
  const homePageUrl = `${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}/front/login/`;
  const sendMenteePendingReviewAcceptedEmailParsed = convertTemplateToHtml(
    rediLocation,
    'welcome-to-redi-mentee'
  );
  const html = sendMenteePendingReviewAcceptedEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${mentorOrMentee}/g, 'mentee')
    .replace(/\${mentorOrMenteeOpposite}/g, 'mentor')
    .replace(/\${homePageUrl}/g, homePageUrl);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your ReDI Connect account is confirmed now!',
    html: html,
    rediLocation,
  });
};

const sendMentorPendingReviewAcceptedEmail = ({ recipient, firstName, rediLocation }) => {
  const homePageUrl = `${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}/front/login/`;
  const sendMentorPendingReviewAcceptedEmailParsed = convertTemplateToHtml(
    rediLocation,
    'welcome-to-redi-mentor'
  );
  const html = sendMentorPendingReviewAcceptedEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${mentorOrMentee}/g, 'mentor')
    .replace(/\${mentorOrMenteeOpposite}/g, 'mentee')
    .replace(/\${homePageUrl}/g, homePageUrl);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your ReDI Connect account is confirmed now!',
    html: html,
    rediLocation,
  });
};

const sendMenteeRequestAppointmentEmail = ({ recipient, firstName, rediLocation }) => {
  const sendMenteeRequestAppointmentEmailParsed = convertTemplateToHtml(
    rediLocation,
    'validate-email-address-successful-mentee'
  );
  const html = sendMenteeRequestAppointmentEmailParsed.replace(/\${firstName}/g, firstName);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your email has been verified for ReDI Connect',
    html: html,
    rediLocation,
  });
};

const sendMentorRequestAppointmentEmail = ({ recipient, firstName, rediLocation }) => {
  const sendMenteeRequestAppointmentEmailParsed = convertTemplateToHtml(
    rediLocation,
    'validate-email-address-successful-mentor'
  );
  const html = sendMenteeRequestAppointmentEmailParsed.replace(/\${firstName}/g, firstName);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your email has been verified for ReDI Connect',
    html: html,
    rediLocation,
  });
};

const sendVerificationEmail = ({
  recipient,
  redUserId,
  firstName,
  userType: signupType,
  verificationToken,
  rediLocation,
}) => {
  const userType = {
    'public-sign-up-mentor-pending-review': 'mentor',
    'public-sign-up-mentee-pending-review': 'mentee',
  }[signupType];
  const verificationSuccessPageUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/signup-complete/${signupType}`;
  const verificationUrl = `${buildBackendUrl(
    process.env.NODE_ENV
  )}/api/redUsers/confirm?uid=${redUserId}&token=${verificationToken}&redirect=${encodeURI(
    verificationSuccessPageUrl
  )}`;
  const sendMenteeRequestAppointmentEmailParsed = convertTemplateToHtml(
    rediLocation,
    `validate-email-address-${userType}`
  );
  const html = sendMenteeRequestAppointmentEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${mentorOrMentee}/g, userType)
    .replace(/\${verificationUrl}/g, verificationUrl);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verify your email address!',
    html: html,
    rediLocation,
  });
};

const sendMentoringSessionLoggedEmail = ({ recipient, mentorName, rediLocation }) => {
  const loginUrl = `${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}/front/login`;
  const sendMentoringSessionLoggedEmailParsed = convertTemplateToHtml(
    rediLocation,
    'mentoring-session-logged-email'
  );
  const html = sendMentoringSessionLoggedEmailParsed
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${loginUrl}/g, loginUrl);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'You successfully logged your session with your mentee',
    html: html,
    rediLocation,
  });
};

const sendMentorCancelledMentorshipNotificationEmail = ({ recipient, firstName, rediLocation }) => {
  const sendMentorCancelledMentorshipNotificationEmailParsed = convertTemplateToHtml(
    rediLocation,
    'mentorship-cancelation-email-mentee'
  );
  const html = sendMentorCancelledMentorshipNotificationEmailParsed.replace(
    /\${firstName}/g,
    firstName
  );
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your mentor has quit your connection',
    html: html,
    rediLocation,
  });
};

const sendToMentorConfirmationOfMentorshipCancelled = ({
  recipient,
  mentorFirstName,
  menteeFullName,
  rediLocation,
}) => {
  const sendMentorCancelledMentorshipNotificationEmailParsed = convertTemplateToHtml(
    rediLocation,
    'mentorship-cancelation-email-mentor'
  );
  const html = sendMentorCancelledMentorshipNotificationEmailParsed
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(/\${menteeFullName}/g, menteeFullName);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `Your mentorship of ${menteeFullName} has ben cancelled`,
    html: html,
    rediLocation,
  });
};

const sendMentorshipRequestReceivedEmail = ({
  recipient,
  mentorName,
  menteeFullName,
  rediLocation,
}) => {
  const loginUrl = `${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}/front/login`;
  const sendMentorshipRequestReceivedEmailParsed = convertTemplateToHtml(
    rediLocation,
    'mentorship-request-email'
  );
  const html = sendMentorshipRequestReceivedEmailParsed
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${menteeFullName}/g, menteeFullName)
    .replace(/\${loginUrl}/g, loginUrl);
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `You have received an application from ${menteeFullName}`,
    html: html,
    rediLocation,
  });
};

const sendMentorshipAcceptedEmail = ({
  recipients,
  mentorName,
  menteeName,
  mentorReplyMessageOnAccept,
  rediLocation,
}) => {
  const rediEmailAdress = `${
    rediLocation.toLowerCase() === 'munich' ? 'munich-' : ''
  }career@redi-school.org`;
  const sendMentorshipAcceptedEmailParsed = convertTemplateToHtml(
    rediLocation,
    'mentorship-acceptance-email'
  );
  const html = sendMentorshipAcceptedEmailParsed
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${menteeName}/g, menteeName)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress)
    .replace(/\${mentorReplyMessageOnAccept}/g, mentorReplyMessageOnAccept);
  return sendMjmlEmailFactory({
    to: recipients,
    subject: `Congratulations. Mentor ${mentorName} has accepted your application, ${menteeName}!`,
    html: html,
    rediLocation,
  });
};

module.exports = {
  sendReportProblemEmail,
  sendMentorCancelledMentorshipNotificationEmail,
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
  sendMentoringSessionLoggedEmail,
  sendToMentorConfirmationOfMentorshipCancelled,
  sendMentorPendingReviewAcceptedEmail,
  sendMenteePendingReviewAcceptedEmail,
  sendPendingReviewDeclinedEmail,
  sendMentorRequestAppointmentEmail,
  sendMenteeRequestAppointmentEmail,
  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailFactory,
};
