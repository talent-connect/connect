'use strict';
const _ = require('lodash');

const Rx = require('rxjs');

const app = require('../../server/server');

const addFullNamePropertyForAdminSearch = ctx => {
  let thingToUpdate;
  if (ctx.instance) thingToUpdate = ctx.instance;
  else if (ctx.data) thingToUpdate = ctx.data;
  else return;

  const firstName = thingToUpdate.firstName;
  const lastName = thingToUpdate.lastName;

  if (firstName || lastName) {
    const merged = `${firstName ? (firstName + ' ') : ''}${lastName ? lastName : ''}`;
    thingToUpdate.loopbackComputedDoNotSetElsewhere__forAdminSearch__fullName = merged;
  }
};

module.exports = function(RedProfile) {
  RedProfile.observe('before save', function updateTimestamp(ctx, next) {
    addFullNamePropertyForAdminSearch(ctx);
    if (ctx.instance) {
      if (ctx.isNewInstance) ctx.instance.createdAt = new Date();
      ctx.instance.updatedAt = new Date();
    } else {
      ctx.data.updatedAt = new Date();
    }
    next();
  });

  RedProfile.observe('loaded', (ctx, next) => {
    if (ctx.isNewInstance) {
      return next();
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    } else if (ctx.data && ctx.data.userType === 'mentor') {
      // In case RedProfile belongs to a mentor, add "computed properties"
      // currentMenteeCount, currentFreeMenteeSpots, and matchCountWithCurrentUser,
      // currentApplicantCount
      const RedMatch = app.models.RedMatch;
      const RedMentoringSession = app.models.RedMentoringSession;
      const countMatchesByType = type =>
        Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
          mentorId: ctx.data.id,
          status: type,
        });
      const countAcceptedMatches = () => countMatchesByType('accepted');
      const countAppliedMatches = () => countMatchesByType('applied');

      const currentUserHasAppliedToMentor = () =>
        ctx.options.currentUser
          ? Rx.bindNodeCallback(RedMatch.count.bind(RedMatch))({
              mentorId: ctx.data.id,
              menteeId: ctx.options.currentUser.redProfile.id,
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
        currentUserHasAppliedToMentor(),
        getRedMatchesToCurrentMentor(),
        getRedMentoringSessionsToCurrentMentor()
      ).subscribe(
        ([
          currentMenteeCount,
          currentApplicantCount,
          matchCountWithCurrentUser,
          redMatchesWithCurrentUser,
          redMentoringSessionsWithCurrentUser,
        ]) => {
          Object.assign(ctx.data, {
            currentMenteeCount,
            currentApplicantCount,
            currentFreeMenteeSpots:
              ctx.data.menteeCountCapacity - currentMenteeCount,
            matchCountWithCurrentUser,
            redMatchesWithCurrentUser,
            redMentoringSessionsWithCurrentUser,
          });
          next();
        },
        err => next(err)
      );
    } else if (ctx.data && ctx.data.userType === 'mentee') {
      // In case RedProfile belongs to a mentee, add "computed properties"
      // matchCountWithCurrentUser,
      const RedMatch = app.models.RedMatch;
      const RedMentoringSession = app.models.RedMentoringSession;

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
        getRedMatchesToCurrentMentor(),
        getRedMentoringSessionsToCurrentMentor(),
        getAllRedMatches()
      ).subscribe(
        ([
          redMatchesWithCurrentUser,
          redMentoringSessionsWithCurrentUser,
          allRedMatches,
        ]) => {
          const currentActiveMentors = allRedMatches.filter(
            match => match.status === 'accepted'
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
              currentActiveMentor.toJSON().mentor,
          });
          next();
        },
        err => next(err)
      );
    } else {
      next();
    }
  });
};
