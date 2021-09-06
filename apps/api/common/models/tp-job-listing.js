'use strict'
const _ = require('lodash')

const Rx = require('rxjs')

const app = require('../../server/server')

module.exports = function (TpJobListing) {
  TpJobListing.observe('before save', function updateTimestamp(ctx, next) {
    const currentDate = new Date()

    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = currentDate
      }
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    next()
  })

  TpJobListing.observe('access', function includeStuff(ctx, next) {
    ctx.query.include = ['tpCompanyProfile']

    next()
  })
}
