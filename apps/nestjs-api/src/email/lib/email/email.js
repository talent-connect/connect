'use strict'

import { buildFrontendUrl } from '../build-frontend-url'

const aws = require('aws-sdk')
const Rx = require('rxjs')
const mjml2html = require('mjml')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const config = {
  accessKeyId: process.env.NX_EMAILER_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NX_EMAILER_AWS_SECRET_KEY,
  region: process.env.NX_EMAILER_AWS_REGION,
}

const ses = new aws.SES(config)

const transporter = nodemailer.createTransport({
  SES: ses,
})

const isProductionOrDemonstration = () =>
  ['production', 'demonstration', 'staging'].includes(process.env.NODE_ENV)

export const sendEmail = Rx.bindNodeCallback(ses.sendEmail.bind(ses))
export const sendMjmlEmail = Rx.bindNodeCallback(
  transporter.sendMail.bind(transporter)
)
export const sendEmailFactory = (to, subject, body, rediLocation) => {
  let toSanitized = isProductionOrDemonstration() ? to : ''
  if (process.env.NX_DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.NX_DEV_MODE_EMAIL_RECIPIENT
  }
  let sender = 'career@redi-school.org'
  return sendEmail({
    Source: sender,
    Destination: {
      ToAddresses: [toSanitized],
      BccAddresses: ['career@redi-school.org'],
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
        Data: buildSubjectLine(subject, process.env.NODE_ENV),
      },
    },
  })
}
export const sendMjmlEmailFactory = ({ to, subject, html }) => {
  let toSanitized = isProductionOrDemonstration() ? to : ''
  if (process.env.NX_DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.NX_DEV_MODE_EMAIL_RECIPIENT
  }
  let sender = 'career@redi-school.org'
  return sendMjmlEmail({
    from: sender,
    to: toSanitized,
    bcc: ['career@redi-school.org'],
    subject: buildSubjectLine(subject, process.env.NODE_ENV),
    html: html,
  })
}

function buildSubjectLine(subject, env) {
  switch (env) {
    case 'production':
      return subject

    case 'demonstration':
      return `[DEMO ENVIRONMENT] ${subject}`

    default:
      return `[DEV ENVIRONMENT] ${subject}`
  }
}

const sendReportProblemEmailTemplate = fs.readFileSync(
  path.resolve(
    __dirname,
    'assets',
    'email',
    'templates',
    'send-problem-report.mjml'
  ),
  'utf-8'
)
const sendReportProblemEmailParsed = mjml2html(sendReportProblemEmailTemplate, {
  filePath: path.resolve(__dirname, 'assets', 'email', 'templates'),
})

export const sendReportProblemEmail = ({ sendingUserEmail, message }) => {
  const html = sendReportProblemEmailParsed.html
    .replace(/\${sendingUserEmail}/g, sendingUserEmail)
    .replace(/\${message}/g, message)
  return sendMjmlEmailFactory({
    to: 'career@redi-school.org',
    subject: 'New problem report',
    html: html,
  })
}

export const sendPendingReviewDeclinedEmail = ({
  recipient,
  firstName,
  userType,
}) => {
  const sendPendingReviewDeclinedEmailParsed = convertTemplateToHtml(
    null,
    `pending-review-declined-email--${userType}`
  )

  const html = sendPendingReviewDeclinedEmailParsed.replace(
    /\${firstName}/g,
    firstName
  )
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
      'assets',
      'email',
      'templates',
      `${templateString}${
        rediLocation ? `.${rediLocation.toLowerCase()}` : ''
      }.mjml`
    ),
    'utf-8'
  )
  const parsedTemplate = mjml2html(convertTemplate, {
    filePath: path.resolve(__dirname, 'assets', 'email', 'templates'),
  })
  return parsedTemplate.html
}

export const sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted =
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
      subject: `${menteeName}’s mentee application to you has expired!`,
      html: html,
    })
  }

export const sendMenteePendingReviewAcceptedEmail = ({
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
    subject: 'Your ReDI Connect profile is now activated!',
    html: html,
  })
}

export const sendMentorPendingReviewAcceptedEmail = ({
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
    subject: 'Your ReDI Connect profile is now activated!',
    html: html,
  })
}

export const sendMenteeSignupCompleteEmail = ({
  recipient,
  firstName,
  rediLocation,
}) => {
  const templateFile =
    rediLocation === 'CYBERSPACE'
      ? 'signup-complete-mentee-cyberspace'
      : 'signup-complete-mentee'

  const html = convertTemplateToHtml(null, templateFile).replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Sign-up complete!',
    html,
  })
}

export const sendMentorSignupCompleteEmail = ({
  recipient,
  firstName,
  isPartnershipMentor,
}) => {
  const templateFile =
    isPartnershipMentor === true
      ? 'signup-complete-mentor-partnership'
      : 'signup-complete-mentor'

  const html = convertTemplateToHtml(null, templateFile).replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Sign-up complete!',
    html,
  })
}

export const sendMentoringSessionLoggedEmail = ({
  recipient,
  mentorName,
  menteeFirstName,
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
    .replace(/\${menteeFirstName}/g, menteeFirstName)
    .replace(/\${loginUrl}/g, loginUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject:
      'Thank you for logging your session(s) with ${menteeFirstName}!'.replace(
        /\${menteeFirstName}/g,
        menteeFirstName
      ),
    html: html,
    rediLocation,
  })
}

/* The code for sending this reminder wasn't re-implemented when we migrated to Salesforce. 
It should be re-implemented in Salesforce and then removed. */

// export const sendMenteeReminderToApplyToMentorEmail = ({
//   recipient,
//   menteeFirstName,
//   rediLocation,
// }) => {
//   const templateFile =
//     rediLocation === 'CYBERSPACE'
//       ? 'apply-to-mentor-reminder-for-mentee-cyberspace'
//       : 'apply-to-mentor-reminder-for-mentee'

//   const html = convertTemplateToHtml(null, templateFile).replace(
//     /\${menteeFirstName}/g,
//     menteeFirstName
//   )
//   return sendMjmlEmailFactory({
//     to: recipient,
//     subject: 'Have you checked out or amazing mentors yet?',
//     html: html,
//   })
// }

export const sendMentorCancelledMentorshipNotificationEmail = ({
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

export const sendToMentorConfirmationOfMentorshipCancelled = ({
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

export const sendMentorshipCompletionEmailToMentor = ({
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
    subject: `Your mentorship with ${menteeFirstName} is completed!`,
    html: html,
  })
}

export const sendMentorshipCompletionEmailToMentee = ({
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
    subject: `Your mentorship with ${mentorFirstName} is completed!`,
    html: html,
  })
}

export const sendMentorshipRequestReceivedEmail = ({
  recipient,
  mentorName,
  menteeFullName,
  menteeRediLocation,
  mentorRediLocation,
}) => {
  const loginUrl = `${buildFrontendUrl(
    process.env.NODE_ENV,
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
    subject: `You have received an application from ${menteeFullName}!`,
    html: html,
  })
}

export const sendMentorshipAcceptedEmail = ({
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
    subject: `Congratulations! Mentor ${mentorName} has accepted your application, ${menteeName}!`,
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

export const sendMentorshipDeclinedEmail = ({
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
    BERLIN: 'Berlin',
    HAMBURG: 'Hamburg',
    MALMO: 'Malmö',
    MUNICH: 'Munich',
    NRW: 'NRW',
    CYBERSPACE: 'Cyberspace',
  }[locationIdentifier]
}
