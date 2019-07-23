'use strict';

const Rx = require('rxjs');
const { switchMap, tap, map } = require('rxjs/operators');

const app = require('../../server/server');
const {
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
} = require('../../lib/email');

module.exports = function(RedMatch) {
  /**
   *
   * @param {string} mentorId
   * @param {Function(Error, object)} callback
   */

  RedMatch.observe('before save', function updateTimestamp(ctx, next) {
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date();
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

  // IMPORTANT ACL-related method: this combines with the ACL $authenticated-can-execute-find,
  // to allow $mentor and $mentee to look up RedMatch. To make sure a mentee user can only
  // see RedMatch-es related to him/her, and the same for a mentor user, the below entity filter
  // is used.
  RedMatch.observe('access', function onlyMatchesRelatedToCurrentUser(
    ctx,
    next
  ) {
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
  });

  RedMatch.acceptMentorship = function(data, options, callback) {
    const { redMatchId } = data;
    const redMatchFindById = redMatchId =>
      Rx.bindNodeCallback(RedMatch.findById.bind(RedMatch))(redMatchId);
    const redProfileFindOne = Rx.bindNodeCallback(
      app.models.RedProfile.findOne.bind(app.models.RedProfile)
    );
    // TODO: enforce following rules
    // 1. Requesting user must be a mentor
    // 2. matchId must correspond to a Match where
    //    a. the .mentor is the current user
    //    b. the .status === 'applied'

    Rx.of({ redMatchId })
      .pipe(
        switchMap(({ redMatchId }) => redMatchFindById(redMatchId)),
        switchMap(redMatchInst =>
          Rx.bindNodeCallback(redMatchInst.updateAttribute.bind(redMatchInst))(
            'status',
            'accepted'
          )
        ),
        switchMap(redMatchInst =>
          Rx.bindNodeCallback(redMatchInst.updateAttribute.bind(redMatchInst))(
            'matchMadeActiveOn',
            new Date()
          )
        ),
        // Fire off email firing in a separate process
        tap(redMatchInst => {
          Rx.zip(
            redProfileFindOne({ where: { id: redMatchInst.menteeId } }),
            redProfileFindOne({ where: { id: redMatchInst.mentorId } })
          )
            .pipe(
              map(([mentee, mentor]) => ({ mentee, mentor })),
              switchMap(({ mentee, mentor }) =>
                sendMentorshipAcceptedEmail(
                  [mentee.contactEmail, mentor.contactEmail],
                  mentor.firstName,
                  mentee.firstName
                )
              )
            )
            .subscribe();
        })
      )
      .subscribe(redMatchInst => {
        callback(null, redMatchInst);
      });
  };

  RedMatch.requestMentorship = function(data, options, callback) {
    const { applicationText, mentorId } = data;
    const redMatchCreate = Rx.bindNodeCallback(RedMatch.create.bind(RedMatch));
    const redProfileFind = Rx.bindNodeCallback(
      app.models.RedProfile.findOne.bind(app.models.RedProfile)
    );
    // TODO: enforce following rules
    // 1. Requesting user must be a mentee
    // 2. Requested mentor must be an actual mentor
    // 3. Requested mentor must have free mentoring spots
    // 4. There must not be an existing RedMatch between requesting mentee and requested mentor
    const redMatch = {
      status: 'applied',
      applicationText,
      mentorId,
      menteeId: options.currentUser.redProfile.id,
    };
    redProfileFind({ where: { id: mentorId } })
      .pipe(
        switchMap(mentorProfile =>
          sendMentorshipRequestReceivedEmail(
            mentorProfile.contactEmail,
            mentorProfile.firstName,
            `${options.currentUser.redProfile.firstName} ${
              options.currentUser.redProfile.lastName
            }`
          )
        )
      )
      .subscribe();
    redMatchCreate(redMatch).subscribe(
      inst => callback(null, inst),
      err => callback(err)
    );
  };
};
