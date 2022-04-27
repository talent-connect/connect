'use strict'
const _ = require('lodash')

const Rx = require('rxjs')
const { of } = Rx
const { switchMap, map } = require('rxjs/operators')

const app = require('../../server/server')

const addFullNamePropertyForAdminSearch = (ctx) => {
  let thingToUpdate
  if (ctx.instance) thingToUpdate = ctx.instance
  else if (ctx.data) thingToUpdate = ctx.data
  else return

  const firstName = thingToUpdate.firstName
  const lastName = thingToUpdate.lastName

  if (firstName || lastName) {
    const merged = `${firstName ? firstName + ' ' : ''}${lastName || ''}`
    thingToUpdate.loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName =
      merged
  }
}

module.exports = function (TpJobseekerCv) {
  TpJobseekerCv.observe('before save', function updateTimestamp(ctx, next) {
    addFullNamePropertyForAdminSearch(ctx)
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

  TpJobseekerCv.observe('loaded', (ctx, next) => {
    if (ctx.isNewInstance) {
      return next()
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    }

    // if (
    //   ctx.options &&
    //   ctx.options.currentUser &&
    //   ctx.options.currentUser.email === 'cloud-accounts@redi-school.org'
    // ) {
    // } else {
    //   delete ctx.data.administratorInternalComment
    // }

    next()
  })
}
