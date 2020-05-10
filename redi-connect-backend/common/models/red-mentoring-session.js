'use strict';

const Rx = require('rxjs');
const { switchMap } = require('rxjs/operators');

const app = require('../../server/server');
const { sendMentoringSessionLoggedEmail } = require('../../lib/email');

module.exports = function(RedMentoringSession) {
  // IMPORTANT ACL-related method: this combines with the ACL $authenticated-can-execute-find,
  // to allow $mentor and $mentee to look up RedMentoringSessions. To make sure a mentee user can only
  // see RedMentoringSession-es related to him/her, and the same for a mentor user, the below entity filter
  // is used.
  RedMentoringSession.observe(
    'access',
    function onlyMatchesRelatedToCurrentUser(ctx, next) {
      if (!ctx.options.currentUser) return next();

      const currentUserProfileId = ctx.options.currentUser.redProfile.id;

      // TODO: this one is included (as of writing) only for convenience in admin panel.
      // Considering putting in a if(adminUser) block
      ctx.query.include = ['mentor', 'mentee'];

      if (!ctx.query.where) ctx.query.where = {};

      // TODO: Replace this with role-based 'admin' role check
      if (ctx.options.currentUser.email !== 'cloud-accounts@redi-school.org') {
        const currentUserMenteeOrMentor = {
          or: [
            { mentorId: currentUserProfileId },
            { menteeId: currentUserProfileId },
          ],
        };
        const existingWhere = ctx.query.where;
        if (Object.values(existingWhere).length > 0) {
          ctx.query.where = { and: [currentUserMenteeOrMentor, existingWhere] };
        } else {
          ctx.query.where = currentUserMenteeOrMentor;
        }
      }

      next();
    }
  );

  RedMentoringSession.observe('before save', function updateTimestamp(
    ctx,
    next
  ) {
    if (ctx.options.currentUser.email !== 'cloud-accounts@redi-school.org') {
      if (ctx.instance) {
        if (ctx.isNewInstance) {
          ctx.instance.mentorId = ctx.options.currentUser.redProfile.id;
          const findOneRedProfile = Rx.bindNodeCallback(
            app.models.RedProfile.findOne.bind(app.models.RedProfile)
          );
          Rx.zip(
            findOneRedProfile({ where: { id: ctx.instance.mentorId } }),
            findOneRedProfile({ where: { id: ctx.instance.menteeId } })
          )
            .pipe(
              switchMap(([mentor, mentee]) =>
                sendMentoringSessionLoggedEmail(
                  mentor.contactEmail,
                  mentor.firstName,
                  ctx.options.currentUser.redProfile.rediLocation,
                )
              )
            )
            .subscribe();
        }
      }
    }

    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = new Date();
      }
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }

    if (process.env.NODE_ENV !== 'seeding') {
      if (ctx.instance) {
        ctx.instance.rediLocation = ctx.options.currentUser.redProfile.rediLocation;
      } else {
        ctx.data.rediLocation = ctx.options.currentUser.redProfile.rediLocation;
      }
    }

    next();
  });
};
