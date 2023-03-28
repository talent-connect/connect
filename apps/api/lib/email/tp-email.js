'use strict'

const aws = require('aws-sdk')
const Rx = require('rxjs')
const mjml2html = require('mjml')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')

const { buildTpFrontendUrl } = require('../build-tp-frontend-url')
const { buildBackendUrl } = require('../build-backend-url')

const { sendMjmlEmailFactory } = require('./email')

const sendTpResetPasswordEmailTemplate = fs.readFileSync(
  path.resolve(__dirname, 'tp-templates', 'reset-password.mjml'),
  'utf-8'
)

const sendTpResetPasswordEmailParsed = mjml2html(
  sendTpResetPasswordEmailTemplate,
  {
    filePath: path.resolve(__dirname, 'assets', 'email', 'templates'),
  }
)

const sendTpResetPasswordEmail = ({ recipient, accessToken }) => {
  const resetPasswordUrl = `${buildTpFrontendUrl(
    process.env.NODE_ENV
  )}/front/reset-password/set-new-password/${accessToken}`
  const rediEmailAdress = 'career@redi-school.org'
  const html = sendTpResetPasswordEmailParsed.html
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
  const sendTpJobseekerEmailVerificationSuccessfulEmailParsed =
    convertTemplateToHtml(null, 'jobseeker-validate-email-address-successful')
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

const sendTpJobseekerjobseekerProfileApprovedInstructToSubmitJobPreferencesEmail =
  ({ recipient, firstName }) => {
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
  const sendTpCompanyEmailVerificationSuccessfulEmailParsed =
    convertTemplateToHtml(null, 'company-validate-email-address-successful')
  const html = sendTpCompanyEmailVerificationSuccessfulEmailParsed
    .replace(/\${firstName}/g, firstName)
    .replace(/\${tpLandingPageUrl}/g, tpLandingPageUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your email has been verified for Talent Pool',
    html: html,
  })
}

const sendTpCompanyProfileApprovedEmail = ({ recipient, firstName }) => {
  const sendTpCompanyProfileApprovedEmailParsed = convertTemplateToHtml(
    null,
    'company-profile-approved'
  )
  const html = sendTpCompanyProfileApprovedEmailParsed.replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Your company profile has been approved for Talent Pool',
    html: html,
  })
}

const sendTpCompanyProfileSubmittedForReviewEmail = ({ companyName }) => {
  const sendTpCompanyProfileSubmittedForReviewEmailParsed =
    convertTemplateToHtml(null, 'company-profile-submitted-for-review')

  const html = sendTpCompanyProfileSubmittedForReviewEmailParsed.replace(
    /\${companyName}/g,
    companyName
  )

  return sendMjmlEmailFactory({
    to: ['birgit@redi-school.org', 'janis@redi-school.org'],
    subject: 'New company in Talent Pool',
    html,
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
  sendTpCompanyProfileApprovedEmail,
  sendTpCompanyProfileSubmittedForReviewEmail,
}
