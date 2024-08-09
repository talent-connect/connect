'use strict'

const mjml2html = require('mjml')
const fs = require('fs')
const path = require('path')

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
    sender: 'Janis Janowsky <partner@redi-school.org>',
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
    sender: 'Janis Janowsky <partner@redi-school.org>',
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
    sender: 'Janis Janowsky <partner@redi-school.org>',
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
