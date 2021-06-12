'use strict'
const _ = require('lodash')

const Rx = require('rxjs')
const { of } = Rx
const { switchMap, map } = require('rxjs/operators')

const app = require('../../server/server')
const { sendTpCompanyVerificationEmail } = require('../../lib/email/tp-email')

const addFullNamePropertyForAdminSearch = (ctx) => {
  let thingToUpdate
  if (ctx.instance) thingToUpdate = ctx.instance
  else if (ctx.data) thingToUpdate = ctx.data
  else return

  const firstName = thingToUpdate.firstName
  const lastName = thingToUpdate.lastName

  if (firstName || lastName) {
    const merged = `${firstName ? firstName + ' ' : ''}${lastName || ''}`
    thingToUpdate.loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName = merged
  }
}

module.exports = function (TpCompanyProfile) {
  TpCompanyProfile.observe('before save', function updateTimestamp(ctx, next) {
    addFullNamePropertyForAdminSearch(ctx)
    const currentDate = new Date()
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = currentDate
        ctx.instance.gaveGdprConsentAt = currentDate
      }
      ctx.instance.updatedAt = new Date()
    } else {
      ctx.data.updatedAt = new Date()
    }
    next()
  })

  TpCompanyProfile.observe('loaded', function getLastLoginDateTime(ctx, next) {
    if (ctx.isNewInstance) {
      return next()
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    }

    if (
      ctx.options &&
      ctx.options.currentUser &&
      ctx.options.currentUser.email === 'cloud-accounts@redi-school.org'
    ) {
    } else {
      return next()
    }

    const AccessToken = app.models.AccessToken

    const getLastLoginDateTime = () =>
      ctx.options.currentUser
        ? Rx.bindNodeCallback(AccessToken.find.bind(AccessToken))({
            where: {
              userId: ctx.data.redUserId,
            },
            order: ['created DESC'],
            limit: 1,
          }).pipe(
            map((accessTokens) =>
              accessTokens && accessTokens[0] ? accessTokens[0].created : null
            )
          )
        : Rx.of([null])

    getLastLoginDateTime().subscribe(
      (lastLoginDateTime) => {
        Object.assign(ctx.data, {
          lastLoginDateTime,
        })
        next()
      },
      (err) => next(err)
    )
  })

  TpCompanyProfile.observe('loaded', (ctx, next) => {
    if (ctx.isNewInstance) {
      return next()
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    }

    if (
      ctx.options &&
      ctx.options.currentUser &&
      ctx.options.currentUser.email === 'cloud-accounts@redi-school.org'
    ) {
    } else {
      delete ctx.data.administratorInternalComment
    }

    next()
  })

  TpCompanyProfile.observe('after save', async function (context, next) {
    // Onky continue if this is a brand new user
    if (process.env.NODE_ENV === 'seeding') return next()

    const tpCompanyProfileInst = context.instance
    const redUserInst = await tpCompanyProfileInst.redUser.get()
    const tpCompanyProfile = tpCompanyProfileInst.toJSON()
    const redUser = redUserInst.toJSON()

    if (!context.isNewInstance) return next()

    const companyRole = await app.models.Role.findOne({
      where: { name: 'company' },
    })
    await companyRole.principals.create({
      principalType: app.models.RoleMapping.USER,
      principalId: redUser.id,
    })

    var verifyOptions = {
      type: 'email',
      mailer: {
        send: async (verifyOptions, context, cb) => {
          sendTpCompanyVerificationEmail({
            recipient: verifyOptions.to,
            redUserId: redUser.id,
            firstName: tpCompanyProfile.firstName,
            verificationToken: verifyOptions.verificationToken,
            rediLocation: tpCompanyProfile.rediLocation,
          }).subscribe()
        },
      },
      to: redUser.email,
      from: 'dummy@dummy.com',
    }

    redUserInst.verify(verifyOptions, function (err, response) {
      console.log(err)
      console.log(response)
      next()
    })
  })
}
