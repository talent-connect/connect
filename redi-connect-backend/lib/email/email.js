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
  region: process.env.EMAILER_AWS_REGION
}
const {
  buildFrontendUrl
} = require('../build-frontend-url')
const {
  buildBackendUrl
} = require('../build-backend-url')

const ses = new aws.SES(config)

const transporter = nodemailer.createTransport({
  SES: ses
})

const isProductionOrDemonstration = () => ['production', 'demonstration', 'staging'].includes(process.env.NODE_ENV)

const sendEmail = Rx.bindNodeCallback(ses.sendEmail.bind(ses))
const sendMjmlEmail = Rx.bindNodeCallback(transporter.sendMail.bind(transporter))
const sendEmailFactory = (to, subject, body, rediLocation) => {
  let toSanitized = isProductionOrDemonstration() ?
    to :
    'eric@binarylights.com'
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT
  }
  let sender
  if (rediLocation === 'berlin') {
    sender = 'career@redi-school.org'
  } else if (rediLocation === 'munich') {
    sender = 'munich-career@redi-school.org'
  } else {
    sender = 'career@redi-school.org'
  }
  return sendEmail({
    Source: sender,
    Destination: {
      ToAddresses: [toSanitized],
      BccAddresses: ['eric@binarylights.com']
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    }
  })
}
const sendMjmlEmailFactory = ({
  to,
  subject,
  html,
  rediLocation
}) => {
  let toSanitized = isProductionOrDemonstration() ?
    to :
    'eric@binarylights.com'
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.DEV_MODE_EMAIL_RECIPIENT
  }
  let sender
  if (rediLocation === 'berlin') {
    sender = 'career@redi-school.org'
  } else if (rediLocation === 'munich') {
    sender = 'munich-career@redi-school.org'
  } else {
    sender = 'career@redi-school.org'
  }
  return sendMjmlEmail({
    from: sender,
    to: toSanitized,
    bcc: 'eric@binarylights.com',
    subject: subject,
    html: html
  })
}

const RECIPIENT = 'career@redi-school.org'

const sendReportProblemEmail = (sendingUserEmail, problemDescription) =>
  sendEmailFactory(
    RECIPIENT,
    'Problem report',
    templateReportProblemEmail(sendingUserEmail, problemDescription)
  )
const sendMentorCancelledMentorshipNotificationEmail = (recipient, firstName, rediLocation) =>
  sendEmailFactory(
    recipient,
    'Your mentor has quit your connection',
    `Dear ${firstName},

Your mentor has decided to quit your connection. We are sorry to hear that.
You are now ready to see other available mentors and apply to another one. The sessions you have done already will be counted towards the 6 sessions total.

Your Career Support Team
    `,
    rediLocation
  )
const sendToMentorConfirmationOfMentorshipCancelled = (
    recipient,
    mentorFirstName,
    menteeFullName,
    rediLocation
  ) =>
  sendEmailFactory(
    recipient,
    `Your mentorship of ${menteeFullName} has ben cancelled`,
    `Dear ${mentorFirstName},

We have processed your request to cancel your mentorship of mentee ${menteeFullName}. We have informed the mentee. Now other mentees are able to apply to the spot that freed up.

If you like, let us know why you have decided to cancel the mentorship.

Your Career Support Team
    `,
    rediLocation
  )

const sendMentorshipRequestReceivedEmail = (
    recipient,
    mentorName,
    menteeFullName,
    rediLocation
  ) =>
  sendEmailFactory(
    recipient,
    `You have received an application from ${menteeFullName}`,
    `Dear ${mentorName},

You have received an application from mentee ${menteeFullName}. Please review it as soon as you have time.

Review application: ${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}

Your Career Support Team
`, rediLocation
  )
const sendMentorshipAcceptedEmail = (recipients, mentorName, menteeName, mentorReplyMessageOnAccept, rediLocation) => {
  let recipientsSanitized = !isProductionOrDemonstration() ? ['eric@binarylights.com'] :
    recipients
  if (process.env.DEV_MODE_EMAIL_RECIPIENT) {
    recipientsSanitized = [process.env.DEV_MODE_EMAIL_RECIPIENT]
  }
  let sender
  if (rediLocation === 'berlin') {
    sender = 'career@redi-school.org'
  } else if (rediLocation === 'munich') {
    sender = 'munich-career@redi-school.org'
  } else {
    sender = 'career@redi-school.org'
  }
  return sendEmail({
    Source: sender,
    Destination: {
      ToAddresses: recipientsSanitized,
      BccAddresses: ['eric@binarylights.com']
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Dear ${mentorName} and ${menteeName},

Congratulations. Mentor ${mentorName} has accepted your application, ${menteeName}.

${menteeName}, here's a message to you from ${mentorName}:

********************************
${mentorReplyMessageOnAccept}
********************************

Are you ReDI?!

It would be great if you, ${mentorName}, as the mentor, could send ${menteeName} suggestions for the time, date and place of your first session.

Happy connectin’,

Please let us know at ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org if you have any questions!

Your Career Support Team
        `
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: "It's a Match!"
      }
    }
  })
}
const sendMentoringSessionLoggedEmail = (recipient, mentorName, rediLocation) =>
  sendEmailFactory(
    recipient,
    'You successfully logged your first session with your mentee',
    `Dear ${mentorName},

Thank you for logging the first session. This is very helpful for us in order to track the students progress. Please keep logging your sessions!

Log next session: ${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}

Your Career Support Team`, rediLocation
  )

const templateReportProblemEmail = (sendingUserEmail, message) =>
  `New problem report. Source: ${sendingUserEmail}. Message: \n\n${message}`

const sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted = (
    recipient,
    menteeName,
    mentorName,
    rediLocation
  ) =>
  sendEmailFactory(
    recipient,
    `ReDI Connect: mentorship application from ${menteeName} expired`,
    `Dear ${mentorName},

${menteeName} who applied to become your mentee also applied to another mentor. The other mentor just accepted the application a tiny bit faster ;).

The application to you from ${menteeName} has therefore expired, and you will not see it any longer in ReDI Connect.

Other mentees can of course still apply to you, and we're sure you'll receive another application soon to be a great mentor to one of our students!

If you have any questions or would like any help, always feel free to reach out to us on ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org or on the ReDI Slack channel ${rediLocation === 'munich' ? '#mentors_s2020' : '#redi_mentors2019'}.

Your Career Support Team`, rediLocation
  )

const sendResetPasswordEmail = (recipient, accessToken, rediLocation) =>
  sendEmailFactory(
    recipient,
    'Choose a new password for ReDI Connect',
    `Hey there,

Someone requested a new password for your ReDI Connect account.

If you didn't make this request then you can safely ignore this email :)

Reset Password: ${buildFrontendUrl(
      process.env.NODE_ENV, rediLocation
    )}/front/reset-password/set-new-password/${accessToken}

You’ll be asked to choose your own password. Your username is your email address: ${recipient}

Let us know if you need any help or assistance at ${rediLocation === 'munich' ? 'munich-' : ''}career@redi-school.org or on the ReDI Slack channel ${rediLocation === 'munich' ? '#mentors_s2020' : '#redi_mentors2019'}.

Your Career Support Team
    `, rediLocation
  )

const verificationEmailTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', 'validate-email-address.mjml'), 'utf-8')
const verificationEmailParsed = mjml2html(verificationEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates')
})

const sendVerificationEmail = ({
  recipient,
  redUserId,
  firstName,
  userType,
  verificationToken,
  rediLocation
}) => {
  const userTypeToUserTypeInEmail = {
    'public-sign-up-mentor-pending-review': 'mentor',
    'public-sign-up-mentee-pending-review': 'mentee'
  }
  const verificationSuccessPageUrl = `${buildFrontendUrl(process.env.NODE_ENV, rediLocation)}/front/signup-complete`
  const verificationUrl = `${buildBackendUrl(process.env.NODE_ENV)}/api/redUsers/confirm?uid=${redUserId}&token=${verificationToken}&redirect=${encodeURI(verificationSuccessPageUrl)}`
  const html = verificationEmailParsed.html
    .replace('${firstName}', firstName)
    .replace('${mentorOrMentee}', userTypeToUserTypeInEmail[userType])
    .replace('${verificationUrl}', verificationUrl)
  sendMjmlEmailFactory({
    to: recipient,
    subject: 'Welcome to ReDI School',
    html: html,
    rediLocation
  }).subscribe()
}

const sendMentorPendingReviewDeclinedEmailTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', 'validate-email-address-successful.mjml'), 'utf-8')
const sendMentorPendingReviewDeclinedEmailParsed = mjml2html(sendMentorPendingReviewDeclinedEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates')
})

const sendMentorPendingReviewDeclinedEmail = ({
  recipient,
  firstName,
  rediLocation
}) => {
  const html = sendMentorPendingReviewDeclinedEmailParsed.html
    .replace('${firstName}', firstName)
  sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verification has been successful!',
    html: html,
    rediLocation
  }).subscribe()
}

const sendMenteePendingReviewDeclinedEmailTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', 'validate-email-address-successful.mjml'), 'utf-8')
const sendMenteePendingReviewDeclinedEmailParsed = mjml2html(sendMenteePendingReviewDeclinedEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates')
})

const sendMenteePendingReviewDeclinedEmail = ({
  recipient,
  firstName,
  rediLocation
}) => {
  const html = sendMenteePendingReviewDeclinedEmailParsed.html
    .replace('${firstName}', firstName)
  sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verification has been successful!',
    html: html,
    rediLocation
  }).subscribe()
}

const sendMentorPendingReviewAcceptedEmailTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', 'welcome-to-redi.mjml'), 'utf-8')
const sendMentorPendingReviewAcceptedEmailParsed = mjml2html(sendMentorPendingReviewAcceptedEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates')
})

const sendMentorPendingReviewAcceptedEmail = ({
  recipient,
  firstName,
  rediLocation
}) => {
  const html = sendMentorPendingReviewAcceptedEmailParsed.html
    .replace('${firstName}', firstName)
    .replace('${mentorOrMentee}', 'mentor')
  sendMjmlEmailFactory({
    to: recipient,
    subject: 'Welcome to ReDI Connect!',
    html: html,
    rediLocation
  }).subscribe()
}

const sendMenteePendingReviewAcceptedEmailTemplate = fs.readFileSync(path.resolve(__dirname, 'templates', 'welcome-to-redi.mjml'), 'utf-8')
const sendMenteePendingReviewAcceptedEmailParsed = mjml2html(sendMenteePendingReviewAcceptedEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates')
})

const sendMenteePendingReviewAcceptedEmail = ({
  recipient,
  firstName,
  rediLocation
}) => {
  const html = sendMenteePendingReviewAcceptedEmailParsed.html
    .replace('${firstName}', firstName)
    .replace('${mentorOrMentee}', 'mentee')
  sendMjmlEmailFactory({
    to: recipient,
    subject: 'Welcome to ReDI Connect!',
    html: html,
    rediLocation
  }).subscribe()
}

module.exports = {
  sendReportProblemEmail,
  sendMentorCancelledMentorshipNotificationEmail,
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
  sendMentoringSessionLoggedEmail,
  sendToMentorConfirmationOfMentorshipCancelled,
  sendMentorPendingReviewAcceptedEmail,
  sendMenteePendingReviewAcceptedEmail,
  sendMentorPendingReviewDeclinedEmail,
  sendMenteePendingReviewDeclinedEmail,
  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailFactory
}