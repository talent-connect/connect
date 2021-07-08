'use strict'
const _ = require('lodash')

const Rx = require('rxjs')
const { of } = Rx
const { switchMap, map } = require('rxjs/operators')

const app = require('../../server/server')
const {
  sendTpJobseekerVerificationEmail,
  sendTpJobseekerjobseekerProfileApprovedInstructToSubmitJobPreferencesEmail,
  sendTpJobseekerjobseekerProfileNotApprovedYet,
} = require('../../lib/email/tp-email')

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

module.exports = function (TpJobseekerProfile) {
  TpJobseekerProfile.observe(
    'before save',
    function updateTimestamp(ctx, next) {
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
    }
  )

  TpJobseekerProfile.observe(
    'loaded',
    function getLastLoginDateTime(ctx, next) {
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
    }
  )

  TpJobseekerProfile.observe('loaded', (ctx, next) => {
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

  TpJobseekerProfile.pendingReviewDoAccept = function (
    data,
    options,
    callback
  ) {
    pendingReviewAcceptOrDecline('ACCEPT')(data, options, callback)
  }

  TpJobseekerProfile.pendingReviewDoDecline = function (
    data,
    options,
    callback
  ) {
    pendingReviewAcceptOrDecline('DECLINE')(data, options, callback)
  }

  const pendingReviewAcceptOrDecline = (acceptDecline) => async (
    data,
    options,
    callback
  ) => {
    if (!_.includes(['ACCEPT', 'DECLINE'], acceptDecline)) {
      throw new Error('Invalid acceptDecline parameter')
    }
    const { tpJobseekerProfileId } = data
    console.log(data)
    const jobseekerRole = await app.models.Role.findOne({
      where: { name: 'jobseeker' },
    })
    const findTpJobseekerProfile = switchMap(({ tpJobseekerProfileId }) =>
      loopbackModelMethodToObservable(
        TpJobseekerProfile,
        'findById'
      )(tpJobseekerProfileId)
    )
    const validateCurrentState = switchMap((tpJobseekerProfileInst) => {
      const state = tpJobseekerProfileInst.toJSON().state
      if (state === 'submitted-for-review') {
        return of(tpJobseekerProfileInst)
      } else {
        throw new Error('Invalid current state (is not "submitted-for-review")')
      }
    })
    const setNewTpJobseekerProfileProperties = switchMap(
      (tpJobseekerProfileInst) =>
        loopbackModelMethodToObservable(
          tpJobseekerProfileInst,
          'updateAttributes'
        )(
          currentUserStateToPostReviewUpdates[acceptDecline][
            tpJobseekerProfileInst.toJSON().state
          ]
        )
    )
    const createRoleMapping = switchMap((tpJobseekerProfileInst) => {
      const { redUserId } = tpJobseekerProfileInst.toJSON()
      jobseekerRole.principals.create({
        principalType: app.models.RoleMapping.USER,
        principalId: redUserId,
      })
      return of(tpJobseekerProfileInst)
    })

    const sendEmailUserReviewedAcceptedOrDenied = switchMap(
      (tpJobseekerProfileInst) => {
        const { contactEmail, firstName } = tpJobseekerProfileInst.toJSON()
        const stateToEmailFuncMap = {
          ACCEPT: sendTpJobseekerjobseekerProfileApprovedInstructToSubmitJobPreferencesEmail,
          DECLINE: sendTpJobseekerjobseekerProfileNotApprovedYet,
        }
        const emailFunc = stateToEmailFuncMap[acceptDecline]
        return emailFunc({
          recipient: contactEmail,
          firstName,
        })
      }
    )

    Rx.of({ tpJobseekerProfileId })
      .pipe(
        findTpJobseekerProfile,
        validateCurrentState,
        setNewTpJobseekerProfileProperties,
        createRoleMapping,
        sendEmailUserReviewedAcceptedOrDenied
      )
      .subscribe(
        (tpJobseekerProfileInst) => {
          callback(null, tpJobseekerProfileInst)
        },
        (err) => console.log(err)
      )
  }

  TpJobseekerProfile.observe('after save', async function (context, next) {
    // Onky continue if this is a brand new user
    if (process.env.NODE_ENV === 'seeding') return next()

    const tpJobseekerProfileInst = context.instance
    const redUserInst = await tpJobseekerProfileInst.redUser.get()
    const tpJobseekerProfile = tpJobseekerProfileInst.toJSON()
    const redUser = redUserInst.toJSON()

    redUserInst.updateAttribute('rediLocation', tpJobseekerProfile.rediLocation)

    if (!context.isNewInstance) return next()

    var verifyOptions = {
      type: 'email',
      mailer: {
        send: async (verifyOptions, context, cb) => {
          sendTpJobseekerVerificationEmail({
            recipient: verifyOptions.to,
            redUserId: redUser.id,
            firstName: tpJobseekerProfile.firstName,
            verificationToken: verifyOptions.verificationToken,
            rediLocation: tpJobseekerProfile.rediLocation,
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

  // ensure only administrator can see TpJobseekerCv when isProfileVisibleToCompanies is false
  TpJobseekerProfile.observe(
    'access',
    function onlyMatchesRelatedToCurrentUser(ctx, next) {
      if (!ctx.query.where) ctx.query.where = {}

      // TODO: Replace this with role-based 'admin' role check
      if (
        !ctx.options.currentUser ||
        ctx.options.currentUser.email !== 'cloud-accounts@redi-school.org'
      ) {
        const condition = {
          isProfileVisibleToCompanies: true,
          state: {
            inq: [
              'profile-approved-awaiting-job-preferences',
              'job-preferences-shared-with-redi-awaiting-interview-match',
            ],
          },
        }
        const existingWhere = ctx.query.where
        if (Object.values(existingWhere).length > 0) {
          ctx.query.where = { and: [condition, existingWhere] }
        } else {
          ctx.query.where = condition
        }
      }

      next()
    }
  )
}

const loopbackModelMethodToObservable = (loopbackModel, modelMethod) => (
  methodParameter
) =>
  Rx.bindNodeCallback(loopbackModel[modelMethod].bind(loopbackModel))(
    methodParameter
  )

const currentUserStateToPostReviewUpdates = {
  ACCEPT: {
    'submitted-for-review': {
      state: 'profile-approved-awaiting-job-preferences',
    },
  },
  DECLINE: {
    'submitted-for-review': {
      state: 'drafting-profile',
    },
  },
}

const sendEmailUserReviewedAcceptedOrDenied = switchMap(
  (tpJobseekerProfileInst) => {
    const userType = tpJobseekerProfileInst.toJSON().userType
    const userTypeToEmailMap = {
      mentor: sendMentorPendingReviewAcceptedEmail,
      mentee: sendMenteePendingReviewAcceptedEmail,
      'public-sign-up-mentor-rejected': sendPendingReviewDeclinedEmail,
      'public-sign-up-mentee-rejected': sendPendingReviewDeclinedEmail,
    }
    if (!_.has(userTypeToEmailMap, userType)) {
      throw new Error('User does not have valid user type')
    }
    const emailFunc = userTypeToEmailMap[userType]
    const { contactEmail, firstName, rediLocation } = redProfileInst.toJSON()
    return emailFunc({
      recipient: contactEmail,
      firstName,
      rediLocation,
      userType,
    })
  }
)
