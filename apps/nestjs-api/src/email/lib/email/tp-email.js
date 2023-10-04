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

const convertTemplateToHtml = (rediLocation, templateString) => {
  const convertTemplate = fs.readFileSync(
    path.resolve(
      __dirname,
      'assets',
      'email',
      'tp-templates',
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

export const sendJobseekerProfileApprovedEmail = ({ recipient, firstName }) => {
  const emailParsed = convertTemplateToHtml(null, 'jobseeker-profile-approved')
  const html = emailParsed.replace(/\${firstName}/g, firstName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Talent Pool: your profile is approved! ReDI for the next step?',
    html: html,
  })
}

/* The code for sending this email wasn't re-implemented when we migrated to Salesforce. 
We might want to do this in the future. */

// export const sendTpJobseekerjobseekerProfileNotApprovedYet = ({
//   recipient,
//   firstName,
// }) => {
//   const emailParsed = convertTemplateToHtml(
//     null,
//     'jobseeker-profile-not-approved-yet'
//   )
//   const html = emailParsed.replace(/\${firstName}/g, firstName)
//   return sendMjmlEmailFactory({
//     to: recipient,
//     subject: 'The approval of your profile is pending',
//     html: html,
//   })
// }

export const sendTpCompanyProfileApprovedEmail = ({ recipient, firstName }) => {
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

export const sendCompanySignupForNewCompanyCompleteEmail = ({
  recipient,
  firstName,
}) => {
  const html = convertTemplateToHtml(
    null,
    'signup-complete-company--signup-type-new-company'
  ).replace(/\${firstName}/g, firstName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Sign-up complete!',
    html,
  })
}

export const sendCompanySignupForExistingCompanyCompleteEmail = ({
  recipient,
  firstName,
  companyName,
}) => {
  const html = convertTemplateToHtml(
    null,
    'signup-complete-company--signup-type-existing-company'
  )
    .replace(/\${firstName}/g, firstName)
    .replace(/\${companyName}/g, companyName)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Sign-up complete!',
    html,
  })
}

export const sendJobseekerSignupCompleteEmail = ({ recipient, firstName }) => {
  const html = convertTemplateToHtml(null, 'signup-complete-jobseeker').replace(
    /\${firstName}/g,
    firstName
  )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Sign-up complete!',
    html,
  })
}
