'use strict'

const aws = require('aws-sdk')
const Rx = require('rxjs')
const mjml2html = require('mjml')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const config = {
  accessKeyId: process.env.EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.EMAILER_AWS_SECRET_KEY,
  region: process.env.EMAILER_AWS_REGION,
}
const { buildFrontendUrl } = require('../build-frontend-url')
const { buildBackendUrl } = require('../build-backend-url')

const ses = new aws.SES(config)

const transporter = nodemailer.createTransport({
  SES: ses,
})

const isProductionOrDemonstration = () =>
  ['production', 'demonstration', 'staging'].includes(process.env.NODE_ENV)

const sendEmail = Rx.bindNodeCallback(ses.sendEmail.bind(ses))
const sendMjmlEmail = Rx.bindNodeCallback(
  transporter.sendMail.bind(transporter)
)
const sendEmailFactory = (to, subject, body, rediLocation) => {
  let toSanitized = isProductionOrDemonstration() ? to : 'eric@binarylights.com'
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT
  }
  let sender = 'career@redi-school.org'
  return sendEmail({
    Source: sender,
    Destination: {
      ToAddresses: [toSanitized],
      BccAddresses: ['eric@binarylights.com', 'career@redi-school.org'],
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
  })
}
const sendMjmlEmailFactory = ({ to, subject, html }) => {
  let toSanitized = isProductionOrDemonstration() ? to : 'eric@binarylights.com'
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT
  }
  let sender = 'career@redi-school.org'
  return sendMjmlEmail({
    from: sender,
    to: toSanitized,
    bcc: ['eric@binarylights.com', 'career@redi-school.org'],
    subject: subject,
    html: html,
  })
}

const sendReportProblemEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'templates', 'send-problem-report.mjml'),
  'utf-8'
)
const sendReportProblemEmailParsed = mjml2html(sendReportProblemEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates'),
})

const sendReportProblemEmail = ({ sendingUserEmail, message }) => {
  const html = sendReportProblemEmailParsed.html
    .replace(/\${sendingUserEmail}/g, sendingUserEmail)
    .replace(/\${message}/g, message)
  return sendMjmlEmailFactory({
    to: 'career@redi-school.org',
    subject: 'New problem report',
    html: html,
  })
}

const sendResetPasswordEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'templates', 'reset-password.mjml'),
  'utf-8'
)
const sendResetPasswordEmailParsed = mjml2html(sendResetPasswordEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates'),
})

const sendResetPasswordEmail = ({
  recipient,
  firstName,
  accessToken,
  rediLocation,
}) => {
  const resetPasswordUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/reset-password/set-new-password/${accessToken}`
  const rediEmailAdress = 'career@redi-school.org'
  const html = sendResetPasswordEmailParsed.html
    .replace(/\${firstName}/g, firstName)
    .replace(/\${resetPasswordUrl}/g, resetPasswordUrl)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress)
    .replace(/\${emailAdress}/g, recipient)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Password Reset for ReDI Connect',
    html: html,
  })
}

const sendPendingReviewDeclinedEmail = ({
  recipient,
  firstName,
  rediLocation,
  userType,
}) => {
  const rediEmailAdress = 'career@redi-school.org'

  const sendPendingReviewDeclinedEmailParsed = convertTemplateToHtml(
    null,
    `pending-review-declined-email--${userType}`
  )

  const html = sendPendingReviewDeclinedEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${rediLocation}/g, rediLocation)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'ReDI Connect: Your user registration was declined',
    html: html,
  })
}

const convertTemplateToHtml = (rediLocation, templateString) => {
  const convertTemplate = fs.readFileSync(
    path.resolve(
      __dirname,
      'templates',
      `${templateString}${
        rediLocation ? `.${rediLocation.toLowerCase()}` : ''
      }.mjml`
    ),
    'utf-8'
  )
  const parsedTemplate = mjml2html(convertTemplate, {
    filePath: path.resolve(__dirname, 'templates'),
  })
  return parsedTemplate.html
}

const sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted =
  ({ recipient, mentorName, menteeName, rediLocation }) => {
    const rediEmailAdress = 'career@redi-school.org'
    const sendMenteePendingReviewAcceptedEmailParsed = convertTemplateToHtml(
      null,
      'expired-notification-application'
    )
    const html = sendMenteePendingReviewAcceptedEmailParsed
      .replace(/\${mentorName}/g, mentorName)
      .replace(/\${menteeName}/g, menteeName)
      .replace(/\${rediEmailAdress}/g, rediEmailAdress)
    return sendMjmlEmailFactory({
      to: recipient,
      subject: `ReDI Connect: mentorship application from ${menteeName} expired`,
      html: html,
    })
  }

const sendMenteePendingReviewAcceptedEmail = ({
  recipient,
  firstName,
  rediLocation,
}) => {
  const homePageUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/login/`
  const sendMenteePendingReviewAcceptedEmailParsed = convertTemplateToHtml(
    null,
    'welcome-to-redi-mentee'
  )
  const html = sendMenteePendingReviewAcceptedEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${mentorOrMentee}/g, 'mentee')
    .replace(/\${mentorOrMenteeOpposite}/g, 'mentor')
    .replace(/\${homePageUrl}/g, homePageUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your ReDI Connect account is confirmed now!',
    html: html,
  })
}

const sendMentorPendingReviewAcceptedEmail = ({
  recipient,
  firstName,
  rediLocation,
}) => {
  const homePageUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/login/`
  const sendMentorPendingReviewAcceptedEmailParsed = convertTemplateToHtml(
    rediLocation,
    'welcome-to-redi-mentor'
  )
  const html = sendMentorPendingReviewAcceptedEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${mentorOrMentee}/g, 'mentor')
    .replace(/\${mentorOrMenteeOpposite}/g, 'mentee')
    .replace(/\${homePageUrl}/g, homePageUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your ReDI Connect account is confirmed now!',
    html: html,
  })
}

const sendMenteeRequestAppointmentEmail = ({
  recipient,
  firstName,
  rediLocation,
}) => {
  const sendMenteeRequestAppointmentEmailParsed = convertTemplateToHtml(
    null,
    'validate-email-address-successful-mentee'
  )
  const html = sendMenteeRequestAppointmentEmailParsed.replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your email has been verified for ReDI Connect',
    html: html,
  })
}

const sendMentorRequestAppointmentEmail = ({
  recipient,
  firstName,
  rediLocation,
}) => {
  const sendMenteeRequestAppointmentEmailParsed = convertTemplateToHtml(
    null,
    'validate-email-address-successful-mentor'
  )
  const html = sendMenteeRequestAppointmentEmailParsed.replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your email has been verified for ReDI Connect',
    html: html,
  })
}

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
  }[signupType]
  const verificationSuccessPageUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/signup-complete/${signupType}`
  const verificationUrl = `${buildBackendUrl(
    process.env.NODE_ENV
  )}/api/redUsers/confirm?uid=${redUserId}&token=${verificationToken}&redirect=${encodeURI(
    verificationSuccessPageUrl
  )}`
  const sendMenteeRequestAppointmentEmailParsed = convertTemplateToHtml(
    null,
    `validate-email-address-${userType}`
  )
  const html = sendMenteeRequestAppointmentEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${mentorOrMentee}/g, userType)
    .replace(/\${verificationUrl}/g, verificationUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verify your email address!',
    html: html,
  })
}

const sendMentoringSessionLoggedEmail = ({
  recipient,
  mentorName,
  rediLocation,
}) => {
  const loginUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/login`
  const sendMentoringSessionLoggedEmailParsed = convertTemplateToHtml(
    null,
    'mentoring-session-logged-email'
  )
  const html = sendMentoringSessionLoggedEmailParsed
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${loginUrl}/g, loginUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'You successfully logged your session with your mentee',
    html: html,
    rediLocation,
  })
}

const sendMenteeReminderToApplyToMentorEmail = ({
  recipient,
  menteeFirstName,
}) => {
  const sendMenteeReminderToApplyToMentorEmailParsed = convertTemplateToHtml(
    null,
    'apply-to-mentor-reminder-for-mentee'
  )
  const html = sendMenteeReminderToApplyToMentorEmailParsed.replace(
    /\${menteeFirstName}/g,
    menteeFirstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Have you checked out or amazing mentors yet?',
    html: html,
  })
}

const sendMentorCancelledMentorshipNotificationEmail = ({
  recipient,
  firstName,
  rediLocation,
}) => {
  const sendMentorCancelledMentorshipNotificationEmailParsed =
    convertTemplateToHtml(null, 'mentorship-cancelation-email-mentee')
  const html = sendMentorCancelledMentorshipNotificationEmailParsed.replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your mentor has quit your connection',
    html: html,
  })
}

const sendToMentorConfirmationOfMentorshipCancelled = ({
  recipient,
  mentorFirstName,
  menteeFullName,
  rediLocation,
}) => {
  const sendMentorCancelledMentorshipNotificationEmailParsed =
    convertTemplateToHtml(null, 'mentorship-cancelation-email-mentor')
  const html = sendMentorCancelledMentorshipNotificationEmailParsed
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(/\${menteeFullName}/g, menteeFullName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `Your mentorship of ${menteeFullName} has ben cancelled`,
    html: html,
  })
}

const sendMentorshipCompletionEmailToMentor = ({
  recipient,
  mentorFirstName,
  menteeFirstName,
}) => {
  const sendMentorshipCompletionEmailToMentorParsed = convertTemplateToHtml(
    null,
    'complete-mentorship-for-mentor'
  )
  const html = sendMentorshipCompletionEmailToMentorParsed
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(/\${menteeFirstName}/g, menteeFirstName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `Mentorship with ${menteeFirstName} completed`,
    html: html,
  })
}

const sendMentorshipCompletionEmailToMentee = ({
  recipient,
  mentorFirstName,
  menteeFirstName,
}) => {
  const sendMentorshipCompletionEmailToMenteeParsed = convertTemplateToHtml(
    null,
    'complete-mentorship-for-mentee'
  )
  const html = sendMentorshipCompletionEmailToMenteeParsed
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(/\${menteeFirstName}/g, menteeFirstName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `Mentorship with ${mentorFirstName} completed`,
    html: html,
  })
}

const sendMentorshipRequestReceivedEmail = ({
  recipient,
  mentorName,
  menteeFullName,
  menteeRediLocation,
  mentorRediLocation,
}) => {
  const loginUrl = `${buildFrontendUrl(
    'production',
    mentorRediLocation
  )}/front/login`
  const sendMentorshipRequestReceivedEmailParsed = convertTemplateToHtml(
    null,
    'mentorship-request-email'
  )
  const html = sendMentorshipRequestReceivedEmailParsed
    .replace(
      /\${locationNameFormatted}/g,
      formatLocationName(menteeRediLocation)
    )
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${menteeFullName}/g, menteeFullName)
    .replace(/\${loginUrl}/g, loginUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `You have received an application from ${menteeFullName}`,
    html: html,
  })
}

const sendMentorshipAcceptedEmail = ({
  recipient,
  mentorName,
  menteeName,
  mentorReplyMessageOnAccept,
  rediLocation,
}) => {
  const rediEmailAdress = 'career@redi-school.org'
  const sendMentorshipAcceptedEmailParsed = convertTemplateToHtml(
    null,
    'mentorship-acceptance-email'
  )
  const html = sendMentorshipAcceptedEmailParsed
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${menteeName}/g, menteeName)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress)
    .replace(/\${mentorReplyMessageOnAccept}/g, mentorReplyMessageOnAccept)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `Congratulations. Mentor ${mentorName} has accepted your application, ${menteeName}!`,
    html: html,
  })
}

// TODO: I'm a duplicate of libs/shared-config/src/lib/config.ts, keep me in sync
const mentorDeclinesMentorshipReasonForDecliningOptions = [
  {
    id: 'notEnoughTimeNowToBeMentor',
    label: "I don't have enough time right now to be a mentor",
  },
  { id: 'notRightExpertise', label: "I don't have the right expertise" },
  {
    id: 'anotherMentorMoreSuitable',
    label: 'I think another mentor would be more suitable',
  },
  { id: 'other', label: 'Other' },
]

const sendMentorshipDeclinedEmail = ({
  recipient,
  mentorName,
  menteeName,
  ifDeclinedByMentor_chosenReasonForDecline,
  ifDeclinedByMentor_ifReasonIsOther_freeText,
  ifDeclinedByMentor_optionalMessageToMentee,
}) => {
  let reasonForDecline = mentorDeclinesMentorshipReasonForDecliningOptions.find(
    (option) => option.id === ifDeclinedByMentor_chosenReasonForDecline
  ).label
  if (ifDeclinedByMentor_chosenReasonForDecline === 'other') {
    ifDeclinedByMentor_chosenReasonForDecline =
      ifDeclinedByMentor_ifReasonIsOther_freeText
  }

  const parsed = convertTemplateToHtml(null, 'mentorship-decline-email')
  const html = parsed
    .replace(/\${mentorName}/g, mentorName)
    .replace(/\${menteeName}/g, menteeName)
    .replace(/\${reasonForDecline}/g, reasonForDecline)
    .replace(
      /\${optionalMessageToMentee}/g,
      ifDeclinedByMentor_optionalMessageToMentee
    )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `This time it wasn't a match`.replace(
      /\${mentorName}/g,
      mentorName
    ),
    html: html,
  })
}

const formatLocationName = (locationIdentifier) => {
  return {
    berlin: 'Berlin',
    munich: 'Munich',
    nrw: 'NRW',
  }[locationIdentifier]
}

module.exports = {
  sendReportProblemEmail,
  sendMentorshipCompletionEmailToMentee,
  sendMentorshipCompletionEmailToMentor,
  sendMentorCancelledMentorshipNotificationEmail,
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
  sendMentorshipDeclinedEmail,
  sendMenteeReminderToApplyToMentorEmail,
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
  sendMjmlEmailFactory,
}
