'use strict'

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
const { buildFrontendUrl } = require('../build-frontend-url')
const { buildBackendUrl } = require('../build-backend-url')
const { ConsoleLogger } = require('@nestjs/common')

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

const getSenderDetails = (rediLocation) => {
  const isMalmoLocation = rediLocation === 'MALMO'
  const senderName = isMalmoLocation
    ? 'ReDI Malmö Team'
    : 'ReDI Talent Success Team'
  const senderEmail = isMalmoLocation
    ? 'career.sweden@redi-school.org'
    : 'career@redi-school.org'
  return { senderName, senderEmail }
}

const sendEmailFactory = (to, subject, body, rediLocation) => {
  let toSanitized = isProductionOrDemonstration() ? to : ''
  if (process.env.NX_DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.NX_DEV_MODE_EMAIL_RECIPIENT
  }

  const { senderName, senderEmail } = getSenderDetails(rediLocation)

  return sendEmail({
    Source: `${senderName} <${senderEmail}>`,
    Destination: {
      ToAddresses: [toSanitized],
      BccAddresses: [`${senderName} <${senderEmail}>`],
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

const sendMjmlEmailFactory = ({ to, subject, html, rediLocation }) => {
  let toSanitized = isProductionOrDemonstration() ? to : ''
  if (process.env.NX_DEV_MODE_EMAIL_RECIPIENT) {
    toSanitized = process.env.NX_DEV_MODE_EMAIL_RECIPIENT
  }

  const { senderName, senderEmail } = getSenderDetails(rediLocation)

  return sendMjmlEmail({
    from: `${senderName} <${senderEmail}>`,
    to: toSanitized,
    bcc: [`${senderName} <${senderEmail}>`],
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

const sendResetPasswordEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'templates', 'reset-password.mjml'),
  'utf-8'
)
const sendResetPasswordEmailParsed = mjml2html(sendResetPasswordEmailTemplate, {
  filePath: path.resolve(__dirname, 'templates'),
})

const sendResetPasswordEmail = ({ recipient, accessToken, rediLocation }) => {
  const resetPasswordUrl = `${buildFrontendUrl(
    process.env.NODE_ENV
  )}/front/reset-password/set-new-password/${accessToken}`

  const { senderEmail, senderName } = getSenderDetails(rediLocation)

  const html = sendResetPasswordEmailParsed.html
    .replace(/\${resetPasswordUrl}/g, resetPasswordUrl)
    .replace(/\${rediEmailAddress}/g, senderEmail)
    .replace(/\${emailAddress}/g, recipient)
    .replace(/\${rediSignature}/g, senderName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Password Reset for ReDI Connect',
    html: html,
    rediLocation: rediLocation,
  })
}

const sendVerificationEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'templates', 'validate-email-address.mjml'),
  'utf-8'
)
const sendVerificationEmailTemplateParsed = mjml2html(
  sendVerificationEmailTemplate,
  {
    filePath: path.resolve(__dirname, 'templates'),
  }
)
const sendConVerificationEmail = ({
  recipient,
  redUserId,
  firstName,
  verificationToken,
  rediLocation,
}) => {
  const verificationSuccessPageUrl = `${buildFrontendUrl(
    process.env.NODE_ENV
  )}/front/signup-email-verification-success/`

  const verificationUrl = `${buildBackendUrl(
    process.env.NODE_ENV
  )}/api/redUsers/confirm?uid=${redUserId}&token=${verificationToken}&redirect=${encodeURI(
    verificationSuccessPageUrl
  )}`

  const { senderName } = getSenderDetails(rediLocation)

  const html = sendVerificationEmailTemplateParsed.html
    .replace(/\${firstName}/g, firstName)
    .replace(/\${verificationUrl}/g, verificationUrl)
    .replace(/\${rediSignature}/g, senderName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verify your email address!',
    html: html,
    rediLocation: rediLocation,
  })
}

module.exports = {
  sendResetPasswordEmail,
  sendEmailFactory,
  sendMjmlEmailFactory,
  sendConVerificationEmail,
}
