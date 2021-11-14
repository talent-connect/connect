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
      'daily-cronjob-reminder-email-templates',
      `${templateIdentifier}.mjml`
    ),
    'utf-8'
  )
  const parsedTemplate = mjml2html(convertTemplate, {
    filePath: path.resolve(__dirname, 'templates'),
  })
  return parsedTemplate.html
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
    subject: 'How’s the mentorship with ${mentorFirstName} going?'.replace(
      '${mentorFirstName}',
      mentorFirstName
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

function sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentor({
  recipient,
  menteeFirstName,
  mentorFirstName,
  matchMadeActiveOn,
}) {
  const parsedEmail = convertTemplateToHtml(
    'mentorship-is-weeks-old-so-request-feedback_mentor'
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
  return sendMjmlEmailFactory({
    to: recipient,
    subject:
      'Checking in: We’d love to hear about your mentorship, ' +
      mentorFirstName,

    html: html,
  })
}

function sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentee({
  recipient,
  menteeFirstName,
  mentorFirstName,
  matchMadeActiveOn,
}) {
  const parsedEmail = convertTemplateToHtml(
    'mentorship-is-weeks-old-so-request-feedback_mentee'
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
  return sendMjmlEmailFactory({
    to: recipient,
    subject:
      'Checking in: We’d love to hear about your mentorship, ' +
      menteeFirstName,
    html: html,
  })
}

function sendPendingMentorshipApplicationReminderEmailToMentor({
  recipient,
  menteeFirstName,
  menteeLastName,
  mentorFirstName,
  matchRequestedOn,
}) {
  const parsedEmail = convertTemplateToHtml(
    'pending-mentorship-application-reminder_mentor'
  )
  const html = parsedEmail
    .replace(/\${menteeFirstName}/g, menteeFirstName)
    .replace(/\${menteeLastName}/g, menteeLastName)
    .replace(/\${mentorFirstName}/g, mentorFirstName)
    .replace(
      /\${matchRequestedOn}/g,
      matchRequestedOn
        .setZone('Europe/Berlin')
        .setLocale('en-GB')
        .toLocaleString(DateTime.DATE_FULL)
    )
  return sendMjmlEmailFactory({
    to: recipient,
    subject:
      `Hey ${mentorFirstName}, ${menteeFirstName} ${menteeLastName} has ` +
      `applied to you on ReDI Connect!`,
    html: html,
  })
}

module.exports = {
  sendNoMentoringSessionLoggedYetEmailToMentor,
  sendNoMentoringSessionLoggedYetEmailToMentee,
  sendNoMentoringSessionLoggedYetSecondReminderEmailToMentor,
  sendNoMentoringSessionLoggedYetSecondReminderEmailToMentee,
  sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentor,
  sendMentorshipIsWeeksOldSoRequestFeedbackEmailToMentee,
  sendPendingMentorshipApplicationReminderEmailToMentor,
}
