'use strict'

const Rx = require('rxjs')
const { switchMap } = require('rxjs/operators')

const app = require('../../server/server')
const {
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted,
} = require('../../lib/email/email')

module.exports = function (TpJobfair2021InterviewMatch) {
  /**
   *
   * @param {string} mentorId
   * @param {Function(Error, object)} callback
   */

  TpJobfair2021InterviewMatch.observe(
    'before save',
    async function updateTimestamp(ctx, next) {
      if (process.env.NODE_ENV === 'seeding') return next()
      if (ctx.instance) {
        if (ctx.isNewInstance) {
          ctx.instance.createdAt = new Date()
        }
        ctx.instance.updatedAt = new Date()
      } else {
        ctx.data.updatedAt = new Date()
      }

      next()
    }
  )

  // IMPORTANT ACL-related method: this combines with the ACL $authenticated-can-execute-find,
  // to allow $mentor and $mentee to look up TpJobfair2021InterviewMatch. To make sure a mentee user can only
  // see TpJobfair2021InterviewMatch-es related to him/her, and the same for a mentor user, the below entity filter
  // is used.
  TpJobfair2021InterviewMatch.observe(
    'access',
    function onlyMatchesRelatedToCurrentUser(ctx, next) {
      if (!ctx.options.currentUser) return next()

      const currentUserTpJobseekerProfile =
        ctx.options.currentUser.tpJobseekerProfile
      const currentUserTpCompanyProfile =
        ctx.options.currentUser.tpCompanyProfile

      // TODO: this one is included (as of writing) only for convenience in admin panel.
      // Considering putting in a if(adminUser) block
      ctx.query.include = ['interviewee', 'company', 'jobListing']

      if (!ctx.query.where) ctx.query.where = {}

      // TODO: Replace this with role-based 'admin' role check
      if (ctx.options.currentUser.email !== 'cloud-accounts@redi-school.org') {
        const currentUserJobseekerOrCompany = {
          or: [],
        }
        if (currentUserTpJobseekerProfile) {
          currentUserJobseekerOrCompany.or.push({
            intervieweeId: currentUserTpJobseekerProfile.id,
          })
        }
        if (currentUserTpCompanyProfile) {
          currentUserJobseekerOrCompany.or.push({
            companyId: currentUserTpCompanyProfile.id,
          })
        }

        const existingWhere = ctx.query.where
        if (Object.values(existingWhere).length > 0) {
          ctx.query.where = {
            and: [currentUserJobseekerOrCompany, existingWhere],
          }
        } else {
          ctx.query.where = currentUserJobseekerOrCompany
        }
      }

      next()
    }
  )
}
