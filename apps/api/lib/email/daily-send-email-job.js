'use strict'

const aws = require('aws-sdk')
const Rx = require('rxjs')
const mjml2html = require('mjml')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const { DateTime } = require('luxon')

const { buildTpFrontendUrl } = require('../build-tp-frontend-url')
const { buildBackendUrl } = require('../build-backend-url')

const { sendMjmlEmailFactory } = require('./email')
const { buildFrontendUrl } = require('../build-frontend-url')

const convertTemplateToHtml = (templateIdentifier) => {
  const convertTemplate = fs.readFileSync(
    path.resolve(
      __dirname,
      'daily-send-email-job-templates',
      `${templateIdentifier}.mjml`
    ),
    'utf-8'
  )
  const parsedTemplate = mjml2html(convertTemplate, {
    filePath: path.resolve(__dirname, 'templates'),
  })
  return parsedTemplate.html
}

const sendMenteeNotSentApplicationAfterActivationEmail = ({
  recipient,
  redUserId,
  firstName,
  userType: signupType,
  verificationToken,
  rediLocation,
}) => {
  const parsedEmail = convertTemplateToHtml(
    `mentee-not-sent-application-after-activation`
  )
  const html = sendTpJobseekerVerificationEmailParsed
    .replace(/{firstName}/g, firstName)
    .replace(/{verificationUrl}/g, verificationUrl)
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'Verify your email address!',
    html: html,
  })
}

function sendNoMentoringSessionLoggedYetEmailToMentor({}) {
  const parsedEmail = convertTemplateToHtml(
    'no-mentoring-session-logged-yet_mentor'
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

function sendNoMentoringSessionLoggedYetEmailToMentor({
  recipient,
  menteeFirstName,
  mentorFirstName,
  matchMadeActiveOn,
  redMatchId,
  mentorRediLocation,
}) {
  const parsedEmail = convertTemplateToHtml(
    'no-mentoring-session-logged-yet_mentor'
  )
  const html = parsedEmail
    .replace(/\${menteeFirstName}/g, menteeFirstName)
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(
      /\${matchMadeActiveOn}/g,
      matchMadeActiveOn
        .setZone('Europe/Berlin')
        .setLocale('en-GB')
        .toLocaleString(DateTime.DATE_FULL)
    )
    .replace(
      /\${logMentoringSessionUrl}/g,
      buildFrontendUrl(process.env.NODE_ENV, mentorRediLocation) +
        `/app/mentorships/${redMatchId}`
    )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: `How’s the mentorship with ${menteeFirstName} going?`.replace(
      /\${menteeFirstName}/g,
      menteeFirstName
    ),
    html: html,
  })
}

function sendNoMentoringSessionLoggedYetEmailToMentee({
  recipient,
  menteeFirstName,
  mentorFirstName,
  matchMadeActiveOn,
  redMatchId,
  mentorRediLocation,
}) {
  const parsedEmail = convertTemplateToHtml(
    'no-mentoring-session-logged-yet_mentee'
  )
  const html = parsedEmail
    .replace(/\${menteeFirstName}/g, menteeFirstName)
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(
      /\${matchMadeActiveOn}/g,
      matchMadeActiveOn
        .setZone('Europe/Berlin')
        .setLocale('en-GB')
        .toLocaleString(DateTime.DATE_FULL)
    )
    .replace(
      /\${logMentoringSessionUrl}/g,
      buildFrontendUrl(process.env.NODE_ENV, mentorRediLocation) +
        `/app/mentorships/${redMatchId}`
    )
  return sendMjmlEmailFactory({
    to: recipient,
    subject: 'How’s the mentorship with ${menteeFirstName} going?'.replace(
      '${menteeFirstName}',
      menteeFirstName
    ),
    html: html,
  })
}

function sendNoMentoringSessionLoggedYetSecondReminderEmailToMentor({
  recipient,
  menteeFirstName,
  mentorFirstName,
  matchMadeActiveOn,
  redMatchId,
  mentorRediLocation,
}) {
  const parsedEmail = convertTemplateToHtml(
    'no-mentoring-session-logged-yet-second-reminder_mentor'
  )
  const html = parsedEmail
    .replace(/\${menteeFirstName}/g, menteeFirstName)
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(
      /\${matchMadeActiveOn}/g,
      matchMadeActiveOn
        .setZone('Europe/Berlin')
        .setLocale('en-GB')
        .toLocaleString(DateTime.DATE_FULL)
    )
    .replace(
      /\${logMentoringSessionUrl}/g,
      buildFrontendUrl(process.env.NODE_ENV, mentorRediLocation) +
        `/app/mentorships/${redMatchId}`
    )
  return sendMjmlEmailFactory({
    to: recipient,
    subject:
      `Still no sessions with ${menteeFirstName} logged - how’s it going?`.replace(
        /\${menteeFirstName}/g,
        menteeFirstName
      ),
    html: html,
  })
}

function sendNoMentoringSessionLoggedYetSecondReminderEmailToMentee({
  recipient,
  menteeFirstName,
  mentorFirstName,
  matchMadeActiveOn,
  redMatchId,
  mentorRediLocation,
}) {
  const parsedEmail = convertTemplateToHtml(
    'no-mentoring-session-logged-yet-second-reminder_mentee'
  )
  const html = parsedEmail
    .replace(/\${menteeFirstName}/g, menteeFirstName)
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(
      /\${matchMadeActiveOn}/g,
      matchMadeActiveOn
        .setZone('Europe/Berlin')
        .setLocale('en-GB')
        .toLocaleString(DateTime.DATE_FULL)
    )
    .replace(
      /\${logMentoringSessionUrl}/g,
      buildFrontendUrl(process.env.NODE_ENV, mentorRediLocation) +
        `/app/mentorships/${redMatchId}`
    )
  return sendMjmlEmailFactory({
    to: recipient,
    subject:
      `Still no sessions with ${mentorFirstName} logged - how’s it going?`.replace(
        /\${mentorFirstName}/g,
        mentorFirstName
      ),
    html: html,
  })
}

module.exports = {
  sendNoMentoringSessionLoggedYetEmailToMentor,
  sendNoMentoringSessionLoggedYetEmailToMentee,
  sendNoMentoringSessionLoggedYetSecondReminderEmailToMentor,
  sendNoMentoringSessionLoggedYetSecondReminderEmailToMentee,
}
