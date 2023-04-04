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
    filePath: path.resolve(__dirname, 'templates'),
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
module.exports = {
  sendTpResetPasswordEmail,
}
