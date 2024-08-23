'use strict'

const Rx = require('rxjs')
const { switchMap } = require('rxjs/operators')

const app = require('../../server/server')
const { sendMentoringSessionLoggedEmail } = require('../../lib/email/email')

module.exports = function (RedMentoringSession) {}
