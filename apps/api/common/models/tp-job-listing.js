'use strict'
const _ = require('lodash')

const Rx = require('rxjs')

const app = require('../../server/server')

module.exports = function (TpJobListing) {
  TpJobListing.observe('before save', function updateTimestamp(ctx, next) {
    const currentDate = new Date()
    const expiryDate = new Date()
    // MVP expiry date defaults to 30 days in the future
    expiryDate.setDate(expiryDate.getDate() + 30)

    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = currentDate
        if (ctx.instance.expiresAt === null){
          ctx.instance.expiresAt = expiryDate
        }
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
