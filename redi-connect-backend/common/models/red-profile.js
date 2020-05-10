"use strict";
const _ = require("lodash");

const Rx = require("rxjs");
const { of, from } = Rx;
const { switchMap, tap, map } = require("rxjs/operators");

const app = require("../../server/server");
const {
  sendMentorPendingReviewAcceptedEmail,
  sendMenteePendingReviewAcceptedEmail,
  sendMentorPendingReviewDeclinedEmail,
  sendMenteePendingReviewDeclinedEmail
} = require("../../lib/email");

const addFullNamePropertyForAdminSearch = ctx => {
  let thingToUpdate;
  if (ctx.instance) thingToUpdate = ctx.instance;
  else if (ctx.data) thingToUpdate = ctx.data;
  else return;

  const firstName = thingToUpdate.firstName;
  const lastName = thingToUpdate.lastName;

  if (firstName || lastName) {
    const merged = `${firstName ? firstName + " " : ""}${
      lastName ? lastName : ""
    }`;
    thingToUpdate.loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName = merged;
  }
};

module.exports = function(RedProfile) {
  RedProfile.observe("before save", function updateTimestamp(ctx, next) {
    addFullNamePropertyForAdminSearch(ctx);
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date();
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

  // On access, e.g. a GET request to load all RedProfiles to browse them, insert a 
  // WHERE filter based on the user's RedProfile.rediLocation. This ensures that
  // Berlin users only see profiles of other Berlin users. The same thing applies to 
  // Munich users, and future users in other ReDI locations.
  RedProfile.observe("access", function filterToOnlyLoadProfilesInCurrentUsersLocation(ctx, next) {
    if (!ctx.options.currentUser || !ctx.options.currentUser.redProfile) return next();

    if (ctx.options.currentUser.email !== 'cloud-accounts@redi-school.org') {
      const currentUserRediLocation = ctx.options.currentUser.redProfile.rediLocation;
      if (!ctx.query.where) ctx.query.where = {}
      ctx.query.where = { and: [ {rediLocation: currentUserRediLocation }, ctx.query.where ] }
    }

    return next()
  })

  RedProfile.observe("loaded", (ctx, next) => {
    if (ctx.isNewInstance) {
      return next();
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    }

    // Strip away RedProfile.administratorInternalComment if user is NOT cloud-accounts@redi-school.org
    if (
      ctx.options &&
      ctx.options.currentUser &&
      ctx.options.currentUser.email === "cloud-accounts@redi-school.org"
    ) {
    } else {
      delete ctx.data.administratorInternalComment;
    }

    if (ctx.data && ctx.data.userType === "mentor") {
      // In case RedProfile belongs to a mentor, add "computed properties"
      // currentMenteeCount, currentFreeMenteeSpots, and numberOfPendingApplicationWithCurrentUser,
      // currentApplicantCount
      const RedMatch = app.models.RedMatch;
      const RedMentoringSession = app.models.RedMentoringSession;
      const countMatchesByType = type =>
        Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
          mentorId: ctx.data.id,
          status: type
        });
      const countAcceptedMatches = () => countMatchesByType("accepted");
      const countAppliedMatches = () => countMatchesByType("applied");

      const numberOfPendingApplicationWithCurrentUser = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
              mentorId: ctx.data.id,
              menteeId: ctx.options.currentUser.redProfile.id,
              status: "applied"
            })
          : Rx.of([null]);

      const getRedMatchesToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(RedMatch.find.bind(RedMatch))({
              where: {
                menteeId: ctx.options.currentUser.redProfile.id,
                mentorId: ctx.data.id
              }
            })
          : Rx.of([null]);
      const getRedMentoringSessionsToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(
              RedMentoringSession.find.bind(RedMentoringSession)
            )({
              where: {
                menteeId: ctx.options.currentUser.redProfile.id,
                mentorId: ctx.data.id
              }
            })
          : Rx.of([null]);

      Rx.zip(
        countAcceptedMatches(),
        countAppliedMatches(),
        numberOfPendingApplicationWithCurrentUser(),
        getRedMatchesToCurrentMentor(),
        getRedMentoringSessionsToCurrentMentor()
      ).subscribe(
        ([
          currentMenteeCount,
          currentApplicantCount,
          numberOfPendingApplicationWithCurrentUser,
          redMatchesWithCurrentUser,
          redMentoringSessionsWithCurrentUser
        ]) => {
          Object.assign(ctx.data, {
            currentMenteeCount,
            currentApplicantCount,
            currentFreeMenteeSpots:
              ctx.data.menteeCountCapacity - currentMenteeCount,
            numberOfPendingApplicationWithCurrentUser,
            redMatchesWithCurrentUser,
            redMentoringSessionsWithCurrentUser
          });
          next();
        },
        err => next(err)
      );
    } else if (ctx.data && ctx.data.userType === "mentee") {
      // In case RedProfile belongs to a mentee, add "computed properties"
      // numberOfPendingApplicationWithCurrentUser,
      const RedMatch = app.models.RedMatch;
      const RedMentoringSession = app.models.RedMentoringSession;

      const getAllRedMatches = () =>
        Rx.bindNodeCallback(RedMatch.find.bind(RedMatch))({
          where: {
            menteeId: ctx.data.id
          },
          include: "mentor"
        });

      const getRedMatchesToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(RedMatch.find.bind(RedMatch))({
              where: {
                menteeId: ctx.data.id,
                mentorId: ctx.options.currentUser.redProfile.id
              }
            })
          : Rx.of([null]);
      const getRedMentoringSessionsToCurrentMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(
              RedMentoringSession.find.bind(RedMentoringSession)
            )({
              where: {
                menteeId: ctx.data.id,
                mentorId: ctx.options.currentUser.redProfile.id
              }
            })
          : Rx.of([null]);

      Rx.zip(
        getRedMatchesToCurrentMentor(),
        getRedMentoringSessionsToCurrentMentor(),
        getAllRedMatches()
      ).subscribe(
        ([
          redMatchesWithCurrentUser,
          redMentoringSessionsWithCurrentUser,
          allRedMatches
        ]) => {
          const currentActiveMentors = allRedMatches.filter(
            match => match.status === "accepted"
          );
          const currentActiveMentor =
            currentActiveMentors.length > 0
              ? currentActiveMentors[0]
              : undefined;
          const hasActiveMentor = !!currentActiveMentor;
          Object.assign(ctx.data, {
            redMatchesWithCurrentUser,
            redMentoringSessionsWithCurrentUser,
            ifUserIsMentee_hasActiveMentor: hasActiveMentor,
            ifUserIsMentee_activeMentor:
              currentActiveMentor &&
              currentActiveMentor.toJSON &&
              currentActiveMentor.toJSON().mentor
          });
          next();
        },
        err => next(err)
      );
    } else {
      next();
    }
  });

  RedProfile.pendingReviewDoAccept = function(data, options, callback) {
    pendingReviewAcceptOrDecline("ACCEPT")(data, options, callback);
  };

  RedProfile.pendingReviewDoDecline = function(data, options, callback) {
    pendingReviewAcceptOrDecline("DECLINE")(data, options, callback);
  };

  const pendingReviewAcceptOrDecline = acceptDecline => async (
    data,
    options,
    callback
  ) => {
    if (!_.includes(["ACCEPT", "DECLINE"], acceptDecline))
      throw new Error("Invalid acceptDecline parameter");
    const { redProfileId } = data;
    const mentorRole = await app.models.Role.findOne({
      where: { name: "mentor" }
    });
    const menteeRole = await app.models.Role.findOne({
      where: { name: "mentee" }
    });
    const findRedProfile = switchMap(({ redProfileId }) =>
      loopbackModelMethodToObservable(RedProfile, "findById")(redProfileId)
    );
    const validateCurrentUserType = switchMap(redProfileInst => {
      const userType = redProfileInst.toJSON().userType;
      if (_.includes(pendingReviewTypes, userType)) {
        return of(redProfileInst);
      } else {
        throw new Error(
          "Invalid current userType (user is not pending review)"
        );
      }
    });
    const setNewRedProfileProperties = switchMap(redProfileInst =>
      loopbackModelMethodToObservable(
        redProfileInst,
        "updateAttributes"
      )(
        currentUserTypeToPostReviewUpdates[acceptDecline][
          redProfileInst.toJSON().userType
        ]
      )
    );
    const createRoleMapping = switchMap(redProfileInst => {
      const { userType, redUserId } = redProfileInst.toJSON();
      if (!_.includes(["mentee", "mentor"], userType))
        return of(redProfileInst);
      const role = userType === "mentor" ? mentorRole : menteeRole;
      role.principals.create({
        principalType: app.models.RoleMapping.USER,
        principalId: redUserId
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
      .subscribe(
        redMatchInst => {
          callback(null, redMatchInst);
        },
        err => console.log(err)
      );
  };
};

/**
 * Send email to user whose pending status has just been accepted/rejected.
 * Important to note: should be executed AFTER redProfile.userType has been
 * run - the function relies on this to determine what kind of email to send.
 */

const sendEmailUserReviewedAcceptedOrDenied = switchMap(redProfileInst => {
  const userType = redProfileInst.toJSON().userType;
  const userTypeToEmailMap = {
    mentor: sendMentorPendingReviewAcceptedEmail,
    mentee: sendMenteePendingReviewAcceptedEmail,
    "public-sign-up-mentor-rejected": sendMentorPendingReviewDeclinedEmail,
    "public-sign-up-mentee-rejected": sendMenteePendingReviewDeclinedEmail
  };
  if (!_.has(userTypeToEmailMap, userType))
    throw new Error("User does not have valid user type");
  const emailFunc = userTypeToEmailMap[userType];
  const { contactEmail, firstName, rediLocation } = redProfileInst.toJSON();
  return emailFunc(contactEmail, firstName, rediLocation);
});

const pendingReviewTypes = [
  "public-sign-up-mentor-pending-review",
  "public-sign-up-mentee-pending-review"
];
const currentUserTypeToPostReviewUpdates = {
  ACCEPT: {
    "public-sign-up-mentor-pending-review": {
      userType: "mentor",
      userActivated: true
    },
    "public-sign-up-mentee-pending-review": {
      userType: "mentee",
      userActivated: true
    }
  },
  DECLINE: {
    "public-sign-up-mentor-pending-review": {
      userType: "public-sign-up-mentor-rejected",
      userActivated: false
    },
    "public-sign-up-mentee-pending-review": {
      userType: "public-sign-up-mentee-rejected",
      userActivated: false
    }
  }
};

const loopbackModelMethodToObservable = (
  loopbackModel,
  modelMethod
) => methodParameter =>
  Rx.bindNodeCallback(loopbackModel[modelMethod].bind(loopbackModel))(
    methodParameter
  );
