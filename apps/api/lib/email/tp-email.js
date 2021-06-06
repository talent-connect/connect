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
const { buildTpFrontendUrl } = require('../build-tp-frontend-url')
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
    bcc: 'eric@binarylights.com',
    subject: subject,
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
  const resetPasswordUrl = `${buildTpFrontendUrl(
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

const sendTpJobseekerVerificationEmail = ({
  recipient,
  redUserId,
  firstName,
  userType: signupType,
  verificationToken,
  rediLocation,
}) => {
  const verificationSuccessPageUrl = `${buildTpFrontendUrl(
    process.env.NODE_ENV,
    rediLocation
  )}/front/signup-complete/${signupType}`
  const verificationUrl = `${buildBackendUrl(
    process.env.NODE_ENV
  )}/api/redUsers/confirm?uid=${redUserId}&token=${verificationToken}&redirect=${encodeURI(
    verificationSuccessPageUrl
  )}`
  const sendTpJobseekerVerificationEmailParsed = convertTemplateToHtml(
    null,
    `validate-email-address`
  )
  const html = sendTpJobseekerVerificationEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${verificationUrl}/g, verificationUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verify your email address!',
    html: html,
  })
}

const sendTpJobseekerEmailVerificationSuccessfulEmail = ({
  recipient,
  firstName,
  rediLocation,
}) => {
  const sendTpJobseekerEmailVerificationSuccessfulEmailParsed = convertTemplateToHtml(
    null,
    'validate-email-address-successful'
  )
  const html = sendTpJobseekerEmailVerificationSuccessfulEmailParsed.replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your email has been verified for Talent Pool',
    html: html,
  })
}

module.exports = {
  sendResetPasswordEmail,
  sendTpJobseekerVerificationEmail,
  sendTpJobseekerEmailVerificationSuccessfulEmail,
}
