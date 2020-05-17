'use strict';

const Rx = require('rxjs');
const { from } = Rx;
const { switchMap, tap, map, mergeMap } = require('rxjs/operators');

const app = require('../../server/server');
const {
  sendMentorshipRequestReceivedEmail,
  sendMentorshipAcceptedEmail,
  sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted,
} = require('../../lib/email');

module.exports = function(RedMatch) {
  /**
   *
   * @param {string} mentorId
   * @param {Function(Error, object)} callback
   */

  RedMatch.observe('before save', function updateTimestamp(ctx, next) {
    if (process.env.NODE_ENV === 'seeding') return next()
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date();
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }

    // if current user is admin, don't run any of the logic below
    if (ctx.options && ctx.options.currentUser && ctx.options.currentUser.email === 'cloud-accounts@redi-school.org') return next()
    
    // Note: tricky handling of the .rediLocation property coming up. This fix was done on 17 May 2020.
    // Ideally, we should get .rediLocation from ctx.options.currentUser.redProfle. This was how it was coded,
    // but it caused a bug. When a mentee user requests a mentorship from a mentor, the remote method further
    // down in this file is triggered: requestMentorship. That method does a RedMatch.create operation, which
    // triggers this method. When run, ctx.options.currentUser is NOT popuplated. After some googling and perusing
    // the Loopback docs, there does not seem to be an easy way of ensuring the context given to a remote method
    // propagates down to the operation hooks (e.g. "before save"). So, we've included a "hack" where we for this
    // special case check if the instance (ctx.instance or ctx.data) _already_ has the .rediLocation property set.
    // If so, we allow it to stay the way it is. This does open the door for users specifying this by themselves,
    // but given the usage of ReDI Connect, this is an "acceptable risk". However, whenever Loopback as the backend
    // is replaced, make sure to TODO: replace it.
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date();
      ctx.instance.updatedAt = new Date();
      if (!ctx.instance.rediLocation) ctx.instance.rediLocation = ctx.options.currentUser.redProfile.rediLocation
    } else {
      ctx.data.updatedAt = new Date();
      if (!ctx.data.rediLocation) ctx.data.rediLocation = ctx.options.currentUser.redProfile.rediLocation
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

  RedMatch.acceptMentorship = async (data, options, callback) => {
    const { redMatchId } = data;

    const RedProfile = app.models.RedProfile;

    let redMatch = await RedMatch.findById(redMatchId);
    const redMatchData = redMatch.toJSON();
    const [mentor, mentee] = await Promise.all([
      RedProfile.findById(redMatchData.mentorId),
      RedProfile.findById(redMatchData.menteeId),
    ]);

    redMatch = await redMatch.updateAttributes({
      status: 'accepted',
      matchMadeActiveOn: new Date(),
      rediLocation: options.currentUser.redProfile.rediLocation,
    });

    await sendMentorshipAcceptedEmail(
      [mentee.contactEmail, mentor.contactEmail],
      mentor.firstName,
      mentee.firstName
    ).toPromise();

    const menteePendingMatches = await RedMatch.find({
      where: {
        menteeId: redMatchData.menteeId,
        status: 'applied',
      },
      include: ['mentee', 'mentor'],
    });

    await Promise.all(
      menteePendingMatches.map(pendingMatch => {
        return pendingMatch.updateAttributes({
          status: 'invalidated-as-other-mentor-accepted',
          rediLocation: options.currentUser.redProfile.rediLocation,
        });
      })
    );

    await Promise.all(
      menteePendingMatches.map(pendingMatch => {
        const pendingMatchData = pendingMatch.toJSON();
        return sendNotificationToMentorThatPendingApplicationExpiredSinceOtherMentorAccepted(
          pendingMatchData.mentor.contactEmail,
          pendingMatchData.mentee.firstName,
          pendingMatchData.mentor.firstName
        ).toPromise();
      })
    );

    callback(null, redMatch.toJSON());
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
      rediLocation: options.currentUser.redProfile.rediLocation,
    };
    redProfileFind({ where: { id: mentorId } })
      .pipe(
        switchMap(mentorProfile =>
          sendMentorshipRequestReceivedEmail(
            mentorProfile.contactEmail,
            mentorProfile.firstName,
            `${options.currentUser.redProfile.firstName} ${
              options.currentUser.redProfile.lastName
            }`,
            options.currentUser.redProfile.rediLocation,
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
