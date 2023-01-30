'use strict'
const _ = require('lodash')

const Rx = require('rxjs')

const app = require('../../server/server')

const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

module.exports = function (TpJobListing) {
  TpJobListing.observe('before save', function updateTimestamp(ctx, next) {
    const currentDate = new Date()

    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = currentDate
      }
      ctx.instance.updatedAt = new Date()
      ctx.instance.summary = DOMPurify.sanitize(ctx.instance.summary)
    } else {
      ctx.data.updatedAt = new Date()
      ctx.instance.summary = DOMPurify.sanitize(ctx.instance.summary, {RETURN_DOM: true})
    }
    next()
  })

  TpJobListing.observe('access', function includeStuff(ctx, next) {
    ctx.query.include = ['tpCompanyProfile']

    next()
  })
}
