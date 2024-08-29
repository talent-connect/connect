'use strict'
const _ = require('lodash')

const Rx = require('rxjs')
const { of } = Rx
const { switchMap, map } = require('rxjs/operators')

const app = require('../../server/server')
const {
  sendTpCompanyVerificationEmail,
  sendTpCompanyProfileApprovedEmail,
  sendTpCompanyProfileSubmittedForReviewEmail,
} = require('../../lib/email/tp-email')

module.exports = function (TpCompanyProfile) {}
