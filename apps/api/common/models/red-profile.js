'use strict';
const _ = require('lodash');

const Rx = require('rxjs');
const { of } = Rx;
const { switchMap, map } = require('rxjs/operators');
const { DateTime } = require('luxon');

const app = require('../../server/server');
const {
  sendMentorPendingReviewAcceptedEmail,
  sendMenteePendingReviewAcceptedEmail,
  sendPendingReviewDeclinedEmail,
  sendVerificationEmail,
  sendEmailToUserWithTpJobSeekerProfileSigningUpToCon,
} = require('../../lib/email/email');

const addFullNamePropertyForAdminSearch = (ctx) => {
  let thingToUpdate;
  if (ctx.instance) thingToUpdate = ctx.instance;
  else if (ctx.data) thingToUpdate = ctx.data;
  else return;

  const firstName = thingToUpdate.firstName;
  const lastName = thingToUpdate.lastName;

  if (firstName || lastName) {
    const merged = `${firstName ? firstName + ' ' : ''}${lastName || ''}`;
    thingToUpdate.loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName =
      merged;
  }
};

module.exports = function (RedProfile) {
  RedProfile.observe('before save', function updateTimestamp (ctx, next) {
    addFullNamePropertyForAdminSearch(ctx);
    const currentDate = new Date();
    if (ctx.instance) {
      if (ctx.isNewInstance) {
        ctx.instance.createdAt = currentDate;
        ctx.instance.gaveGdprConsentAt = currentDate;
      }
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

  RedProfile.observe('loaded', function loadRedMatchCount (ctx, next) {
    if (ctx.isNewInstance) {
      return next();
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    }

    if (ctx.options?.currentUser?.email !== 'cloud-accounts@redi-school.org')
      return next();

    const RedMatch = app.models.RedMatch;
    const AccessToken = app.models.AccessToken;

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
            accessTokens?.[0] ? accessTokens[0].created : null
          )
        )
        : Rx.of([null]);

    const countMatchesByType = (type) =>
      Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
        mentorId: ctx.data.id,
        status: type,
      });
    const countTotal = () => countMatchesByType(null);

    Rx.zip(getLastLoginDateTime(), countTotal()).subscribe(
      ([lastLoginDateTime, totalRedMatchCount]) => {
        Object.assign(ctx.data, {
          lastLoginDateTime,
          totalRedMatchCount,
        });
        next();
      },
      (err) => next(err)
    );
  });

  RedProfile.observe('loaded', (ctx, next) => {
    if (ctx.isNewInstance) {
      return next();
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    }

    if (!ctx.data.categories) ctx.data.categories = [];

    // Strip away RedProfile.administratorInternalComment if user is NOT cloud-accounts@redi-school.org
    if (ctx.options?.currentUser?.email !== 'cloud-accounts@redi-school.org') {
      delete ctx.data.administratorInternalComment; //TODO avoid delete
    }

    // If favouritedRedProfileIds[] isn't set, set it. But delete it if the accessing user doesn't own it.
    ctx.data.favouritedRedProfileIds = ctx.data.favouritedRedProfileIds || [];
    const currentUserRedProfileId =
      ctx?.options?.currentUser?.redProfile?.id.toString();
    const isRedProfileOwnedByCurrentUser =
      currentUserRedProfileId === ctx.data.id.toString();
    if (!isRedProfileOwnedByCurrentUser) delete ctx.data.favouritedRedProfileIds; //TODO avoid delete

    if (ctx.data?.userType === 'mentor') {
      // In case RedProfile belongs to a mentor, add "computed properties"
      // currentMenteeCount, currentFreeMenteeSpots, and numberOfPendingApplicationWithCurrentUser,
      // currentApplicantCount
      const RedMatch = app.models.RedMatch;
      const RedMentoringSession = app.models.RedMentoringSession;

      const countMatchesByType = (type) =>
        Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
          mentorId: ctx.data.id,
          status: type,
        });
      const countAcceptedMatches = () => countMatchesByType('accepted');
      const countAppliedMatches = () => countMatchesByType('applied');
      const countTotal = () => countMatchesByType(null);

      const numberOfPendingApplicationWithCurrentUser = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
            mentorId: ctx.data.id,
            menteeId: ctx.options.currentUser.redProfile.id,
            status: 'applied',
          })
          : Rx.of([null]);

      const getRedMatchesToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(RedMatch.find.bind(RedMatch))({
            where: {
              menteeId: ctx.options.currentUser.redProfile.id,
              mentorId: ctx.data.id,
            },
          })
          : Rx.of([null]);
      const getRedMentoringSessionsToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(
            RedMentoringSession.find.bind(RedMentoringSession)
          )({
            where: {
              menteeId: ctx.options.currentUser.redProfile.id,
              mentorId: ctx.data.id,
            },
          })
          : Rx.of([null]);

      Rx.zip(
        countAcceptedMatches(),
        countAppliedMatches(),
        countTotal(),
        numberOfPendingApplicationWithCurrentUser(),
        getRedMatchesToCurrentMentor(),
        getRedMentoringSessionsToCurrentMentor()
      ).subscribe(
        ([
          currentMenteeCount,
          currentApplicantCount,
          totalRedMatchCount,
          numberOfPendingApplicationWithCurrentUser,
          redMatchesWithCurrentUser,
          redMentoringSessionsWithCurrentUser,
        ]) => {
          Object.assign(ctx.data, {
            currentMenteeCount,
            currentApplicantCount,
            totalRedMatchCount,
            currentFreeMenteeSpots:
              ctx.data.menteeCountCapacity - currentMenteeCount,
            numberOfPendingApplicationWithCurrentUser,
            redMatchesWithCurrentUser,
            redMentoringSessionsWithCurrentUser,
          });
          next();
        },
        (err) => next(err)
      );
    } else if (ctx.data?.userType === 'mentee') {
      // In case RedProfile belongs to a mentee, add "computed properties"
      // numberOfPendingApplicationWithCurrentUser,
      const RedMatch = app.models.RedMatch;
      const RedMentoringSession = app.models.RedMentoringSession;

      const countActiveMentorMatches = (type) =>
        Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
          menteeId: ctx.data.id,
          status: 'accepted',
        });
      const getAllRedMatches = () =>
        Rx.bindNodeCallback(RedMatch.find.bind(RedMatch))({
          where: {
            menteeId: ctx.data.id,
          },
          include: 'mentor',
        });

      const getRedMatchesToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(RedMatch.find.bind(RedMatch))({
            where: {
              menteeId: ctx.data.id,
              mentorId: ctx.options.currentUser.redProfile.id,
            },
          })
          : Rx.of([null]);
      const getRedMentoringSessionsToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(
            RedMentoringSession.find.bind(RedMentoringSession)
          )({
            where: {
              menteeId: ctx.data.id,
              mentorId: ctx.options.currentUser.redProfile.id,
            },
          })
          : Rx.of([null]);

      Rx.zip(
        countActiveMentorMatches(),
        getRedMatchesToCurrentMentor(),
        getRedMentoringSessionsToCurrentMentor(),
        getAllRedMatches()
      ).subscribe(
        ([
          activeMentorMatchesCount,
          redMatchesWithCurrentUser,
          redMentoringSessionsWithCurrentUser,
          allRedMatches,
        ]) => {
          const currentActiveMentors = allRedMatches.filter(({ status }) =>
            status === 'accepted');

          const currentActiveMentor =
            currentActiveMentors.length
              ? currentActiveMentors[0]
              : null;
          const hasActiveMentor = !!currentActiveMentor;
          Object.assign(ctx.data, {
            activeMentorMatchesCount,
            redMatchesWithCurrentUser,
            redMentoringSessionsWithCurrentUser,
            ifUserIsMentee_hasActiveMentor: hasActiveMentor,
            ifUserIsMentee_activeMentor: currentActiveMentor?.toJSON?.().mentor,
          });
          next();
        },
        (err) => next(err)
      );
    } else {
      next();
    }
  });

  RedProfile.pendingReviewDoAccept = function (data, options, callback) {
    pendingReviewAcceptOrDecline('ACCEPT')(data, options, callback);
  };

  RedProfile.pendingReviewDoDecline = function (data, options, callback) {
    pendingReviewAcceptOrDecline('DECLINE')(data, options, callback);
  };

  const pendingReviewAcceptOrDecline =
    (acceptDecline) => async (data, options, callback) => {
      if (!_.includes(['ACCEPT', 'DECLINE'], acceptDecline)) {
        throw new Error('Invalid acceptDecline parameter');
      }
      const { redProfileId } = data;
      const mentorRole = await app.models.Role.findOne({
        where: { name: 'mentor' },
      });
      const menteeRole = await app.models.Role.findOne({
        where: { name: 'mentee' },
      });
      const findRedProfile = switchMap(({ redProfileId }) =>
        loopbackModelMethodToObservable(RedProfile, 'findById')(redProfileId)
      );
      const validateCurrentUserType = switchMap((redProfileInst) => {
        const userType = redProfileInst.toJSON().userType;
        if (_.includes(pendingReviewTypes, userType)) {
          return of(redProfileInst);
        }
        throw new Error('Invalid current userType (user is not pending review)');
      });
      const setNewRedProfileProperties = switchMap((redProfileInst) =>
        loopbackModelMethodToObservable(
          redProfileInst,
          'updateAttributes'
        )(
          currentUserTypeToPostReviewUpdates[acceptDecline][
            redProfileInst.toJSON().userType
          ]()
        )
      );
      const createRoleMapping = switchMap((redProfileInst) => {
        const { userType, redUserId } = redProfileInst.toJSON();
        if (!_.includes(['mentee', 'mentor'], userType)) {
          return of(redProfileInst);
        }
        const role = userType === 'mentor' ? mentorRole : menteeRole;
        role.principals.create({
          principalType: app.models.RoleMapping.USER,
          principalId: redUserId,
        });
        return of(redProfileInst);
      });

      Rx.of({ redProfileId })
        .pipe(
          findRedProfile,
          validateCurrentUserType,
          setNewRedProfileProperties,
          createRoleMapping,
          sendEmailUserReviewedAcceptedOrDenied
        )
        .subscribe((redMatchInst) => {
          callback(null, redMatchInst);
        },
          (err) => console.log(err)
        );
    };

  RedProfile.observe('after save', async function (context, next) {
    // Onky continue if this is a brand new user
    if (process.env.NODE_ENV === 'seeding') return next();

    const redProfileInst = context.instance;
    const redUserInst = await redProfileInst.redUser.get();
    const redProfile = redProfileInst.toJSON();
    const redUser = redUserInst.toJSON();

    redUserInst.updateAttribute('rediLocation', redProfile.rediLocation);

    if (!context.isNewInstance) return next();

    // Special case: a new RedProfile is created (by code in red-user.js) if a user already exists
    // (RedUser) but they have an existing Tp Jobsekeer user (TpJobSeekerProfile). If so, we don't
    // proceed with the below verification email, but shoot off a special email to the user.
    if (redProfile.signupSource === 'existing-user-with-tp-profile-logging-into-con') {
      sendEmailToUserWithTpJobSeekerProfileSigningUpToCon({
        recipient: redUser.email,
        firstName: redProfile.firstName,
      }).subscribe();
      return next();
    }

    var verifyOptions = {
      type: 'email',
      mailer: {
        send: async (verifyOptions, context, cb) => {
          sendVerificationEmail({
            recipient: verifyOptions.to,
            redUserId: redUser.id,
            firstName: redProfile.firstName,
            userType: redProfile.userType,
            verificationToken: verifyOptions.verificationToken,
            rediLocation: redProfile.rediLocation,
          }).subscribe();
        },
      },
      to: redUser.email,
      from: 'dummy@dummy.com',
    };

    redUserInst.verify(verifyOptions, function (err, response) {
      console.log(err);
      console.log(response);
      next();
    });
  });
};

/**
 * Send email to user whose pending status has just been accepted/rejected.
 * Important to note: should be executed AFTER redProfile.userType has been
 * run - the function relies on this to determine what kind of email to send.
 */

const sendEmailUserReviewedAcceptedOrDenied = switchMap((redProfileInst) => {
  const userType = redProfileInst.toJSON().userType;
  const userTypeToEmailMap = {
    mentor: sendMentorPendingReviewAcceptedEmail,
    mentee: sendMenteePendingReviewAcceptedEmail,
    'public-sign-up-mentor-rejected': sendPendingReviewDeclinedEmail,
    'public-sign-up-mentee-rejected': sendPendingReviewDeclinedEmail,
  };
  if (!_.has(userTypeToEmailMap, userType)) {
    throw new Error('User does not have valid user type');
  }
  const emailFunc = userTypeToEmailMap[userType];
  const { contactEmail, firstName, rediLocation } = redProfileInst.toJSON();
  return emailFunc({
    recipient: contactEmail,
    firstName,
    rediLocation,
    userType,
  });
});

const pendingReviewTypes = [
  'public-sign-up-mentor-pending-review',
  'public-sign-up-mentee-pending-review',
];
const currentUserTypeToPostReviewUpdates = {
  ACCEPT: {
    'public-sign-up-mentor-pending-review': () => ({
      userType: 'mentor',
      userActivated: true,
      userActivatedAt: DateTime.utc().toString(),
      emailVerified: true,
    }),
    'public-sign-up-mentee-pending-review': () => ({
      userType: 'mentee',
      userActivated: true,
      userActivatedAt: DateTime.utc().toString(),
      emailVerified: true,
    }),
  },
  DECLINE: {
    'public-sign-up-mentor-pending-review': () => ({
      userType: 'public-sign-up-mentor-rejected',
      userActivated: false,
    }),
    'public-sign-up-mentee-pending-review': () => ({
      userType: 'public-sign-up-mentee-rejected',
      userActivated: false,
    }),
  },
};

const loopbackModelMethodToObservable =
  (loopbackModel, modelMethod) => (methodParameter) =>
    Rx.bindNodeCallback(loopbackModel[modelMethod].bind(loopbackModel))(
      methodParameter
    );
