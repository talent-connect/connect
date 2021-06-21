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

const sendTpResetPasswordEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'tp-templates', 'reset-password.mjml'),
  'utf-8'
)
const sendTpResetPasswordEmailParsed = mjml2html(
  sendTpResetPasswordEmailTemplate,
  {
    filePath: path.resolve(__dirname, 'tp-templates'),
  }
)

const sendTpResetPasswordEmail = ({
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
  const html = sendTpResetPasswordEmailParsed.html
    .replace(/\${firstName}/g, firstName)
    .replace(/\${resetPasswordUrl}/g, resetPasswordUrl)
    .replace(/\${rediEmailAdress}/g, rediEmailAdress)
    .replace(/\${emailAdress}/g, recipient)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Password Reset for ReDI Talent Pool',
    html: html,
  })
}

const convertTemplateToHtml = (rediLocation, templateString) => {
  const convertTemplate = fs.readFileSync(
    path.resolve(
      __dirname,
      'tp-templates',
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
  )}/front/signup-complete/jobseeker`
  const verificationUrl = `${buildBackendUrl(
    process.env.NODE_ENV
  )}/api/redUsers/confirm?uid=${redUserId}&token=${verificationToken}&redirect=${encodeURI(
    verificationSuccessPageUrl
  )}`
  const sendTpJobseekerVerificationEmailParsed = convertTemplateToHtml(
    null,
    `jobseeker-validate-email-address`
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
}) => {
  const sendTpJobseekerEmailVerificationSuccessfulEmailParsed = convertTemplateToHtml(
    null,
    'jobseeker-validate-email-address-successful'
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

const sendTpJobseekerjobseekerProfileApprovedInstructToSubmitJobPreferencesEmail = ({
  recipient,
  firstName,
}) => {
  const emailParsed = convertTemplateToHtml(
    null,
    'jobseeker-profile-approved-instruct-to-submit-job-preferences'
  )
  const html = emailParsed.replace(/\${firstName}/g, firstName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Talent Pool: your profile is approved! ReDI for the next step?',
    html: html,
  })
}

const sendTpJobseekerjobseekerProfileNotApprovedYet = ({
  recipient,
  firstName,
}) => {
  const emailParsed = convertTemplateToHtml(
    null,
    'jobseeker-profile-not-approved-yet'
  )
  const html = emailParsed.replace(/\${firstName}/g, firstName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'The approval of your profile is pending',
    html: html,
  })
}

const sendTpCompanyVerificationEmail = ({
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
  )}/front/signup-complete/company`
  const verificationUrl = `${buildBackendUrl(
    process.env.NODE_ENV
  )}/api/redUsers/confirm?uid=${redUserId}&token=${verificationToken}&redirect=${encodeURI(
    verificationSuccessPageUrl
  )}`
  const sendTpCompanyVerificationEmailParsed = convertTemplateToHtml(
    null,
    `company-validate-email-address`
  )
  const html = sendTpCompanyVerificationEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${verificationUrl}/g, verificationUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verify your email address!',
    html: html,
  })
}

const sendTpCompanyEmailVerificationSuccessfulEmail = ({
  recipient,
  firstName,
}) => {
  const tpLandingPageUrl = buildTpFrontendUrl(process.env.NODE_ENV)
  const sendTpCompanyEmailVerificationSuccessfulEmailParsed = convertTemplateToHtml(
    null,
    'company-validate-email-address-successful'
  )
  const html = sendTpCompanyEmailVerificationSuccessfulEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${tpLandingPageUrl}/g, tpLandingPageUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your email has been verified for Talent Pool',
    html: html,
  })
}

module.exports = {
  sendTpResetPasswordEmail,
  sendTpJobseekerVerificationEmail,
  sendTpJobseekerEmailVerificationSuccessfulEmail,
  sendTpJobseekerjobseekerProfileApprovedInstructToSubmitJobPreferencesEmail,
  sendTpJobseekerjobseekerProfileNotApprovedYet,
  sendTpCompanyVerificationEmail,
  sendTpCompanyEmailVerificationSuccessfulEmail,
}
