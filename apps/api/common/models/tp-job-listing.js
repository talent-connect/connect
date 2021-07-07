'use strict'
const _ = require('lodash')

const Rx = require('rxjs')

const app = require('../../server/server')

module.exports = function (TpJobListing) {
  TpJobListing.observe('access', function includeStuff(ctx, next) {
    ctx.query.include = ['tpCompanyProfile']

    next()
  })
}
