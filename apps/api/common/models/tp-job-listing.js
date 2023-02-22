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
      console.log(ctx.instance.summary)
      ctx.instance.summary = DOMPurify.sanitize(ctx.instance.summary)
    } else {
      ctx.data.updatedAt = new Date()

      // TODO: Kate & Eric to discuss
      // Uncommenting the following code will cause the cyclic dependency error
      // ctx.instance is not defined at this point so we cannot use it

      console.log(ctx.data.summary)
      ctx.data.summary = DOMPurify.sanitize(ctx.data.summary ?? '')
    }
    next()
  })

  TpJobListing.observe('access', function includeStuff(ctx, next) {
    ctx.query.include = ['tpCompanyProfile']

    next()
  })
}
