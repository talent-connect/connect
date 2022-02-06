'use strict';
const _ = require('lodash');

const Rx = require('rxjs');
const { of } = Rx;
const { switchMap, map } = require('rxjs/operators');

const app = require('../../server/server');
const {
  sendTpJobSeekerVerificationEmail,
  sendTpJobSeekerjobSeekerProfileApprovedInstructToSubmitJobPreferencesEmail,
  sendTpJobSeekerjobSeekerProfileNotApprovedYet,
} = require('../../lib/email/tp-email');

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

module.exports = function (TpJobSeekerProfile) {
  TpJobSeekerProfile.observe(
    'before save',
    function updateTimestamp (ctx, next) {
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
    }
  );

  TpJobSeekerProfile.observe(
    'loaded',
    function getLastLoginDateTime (ctx, next) {
      if (ctx.isNewInstance) {
        return next();
        // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
      }

      if (
        ctx.options &&
        ctx.options.currentUser &&
        ctx.options.currentUser.email === 'cloud-accounts@redi-school.org'
      ) {
      } else {
        return next();
      }

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
              accessTokens && accessTokens[0] ? accessTokens[0].created : null
            )
          )
          : Rx.of([null]);

      getLastLoginDateTime().subscribe(
        (lastLoginDateTime) => {
          Object.assign(ctx.data, {
            lastLoginDateTime,
          });
          next();
        },
        (err) => next(err)
      );
    }
  );

  TpJobSeekerProfile.observe('loaded', (ctx, next) => {
    if (ctx.isNewInstance) {
      return next();
      // TODO: the next two else-if blocks can definitely be DRY-ed. Merge them.
    }

    if (
      ctx.options &&
      ctx.options.currentUser &&
      ctx.options.currentUser.email === 'cloud-accounts@redi-school.org'
    ) {
    } else {
      delete ctx.data.administratorInternalComment;
    }

    next();
  });

  TpJobSeekerProfile.pendingReviewDoAccept = function (
    data,
    options,
    callback
  ) {
    pendingReviewAcceptOrDecline('ACCEPT')(data, options, callback);
  };

  TpJobSeekerProfile.pendingReviewDoDecline = function (
    data,
    options,
    callback
  ) {
    pendingReviewAcceptOrDecline('DECLINE')(data, options, callback);
  };

  const pendingReviewAcceptOrDecline =
    (acceptDecline) => async (data, options, callback) => {
      if (!_.includes(['ACCEPT', 'DECLINE'], acceptDecline)) {
        throw new Error('Invalid acceptDecline parameter');
      }
      const { tpJobSeekerProfileId } = data;
      const jobSeekerRole = await app.models.Role.findOne({
        where: { name: 'jobSeeker' },
      });
      const findTpJobSeekerProfile = switchMap(({ tpJobSeekerProfileId }) =>
        loopbackModelMethodToObservable(
          TpJobSeekerProfile,
          'findById'
        )(tpJobSeekerProfileId)
      );
      const validateCurrentState = switchMap((tpJobSeekerProfileInst) => {
        const state = tpJobSeekerProfileInst.toJSON().state;
        if (state === 'submitted-for-review') {
          return of(tpJobSeekerProfileInst);
        } else {
          throw new Error(
            'Invalid current state (is not "submitted-for-review")'
          );
        }
      });
      const setNewTpJobSeekerProfileProperties = switchMap(
        (tpJobSeekerProfileInst) =>
          loopbackModelMethodToObservable(
            tpJobSeekerProfileInst,
            'updateAttributes'
          )(
            currentUserStateToPostReviewUpdates[acceptDecline][
            tpJobSeekerProfileInst.toJSON().state
            ]
          )
      );
      const createRoleMapping = switchMap((tpJobSeekerProfileInst) => {
        const { redUserId } = tpJobSeekerProfileInst.toJSON();
        jobSeekerRole.principals.create({
          principalType: app.models.RoleMapping.USER,
          principalId: redUserId,
        });
        return of(tpJobSeekerProfileInst);
      });

      const sendEmailUserReviewedAcceptedOrDenied = switchMap(
        (tpJobSeekerProfileInst) => {
          const { contactEmail, firstName } = tpJobSeekerProfileInst.toJSON();
          const stateToEmailFuncMap = {
            ACCEPT:
              sendTpJobSeekerjobSeekerProfileApprovedInstructToSubmitJobPreferencesEmail,
            DECLINE: sendTpJobSeekerjobSeekerProfileNotApprovedYet,
          };
          const emailFunc = stateToEmailFuncMap[acceptDecline];
          return emailFunc({
            recipient: contactEmail,
            firstName,
          });
        }
      );

      Rx.of({ tpJobSeekerProfileId })
        .pipe(
          findTpJobSeekerProfile,
          validateCurrentState,
          setNewTpJobSeekerProfileProperties,
          createRoleMapping,
          sendEmailUserReviewedAcceptedOrDenied
        )
        .subscribe(
          (tpJobSeekerProfileInst) => {
            callback(null, tpJobSeekerProfileInst);
          },
          (err) => console.log(err)
        );
    };

  TpJobSeekerProfile.observe('after save', async function (context, next) {
    // Onky continue if this is a brand new user
    if (process.env.NODE_ENV === 'seeding') return next();

    const tpJobSeekerProfileInst = context.instance;
    const redUserInst = await tpJobSeekerProfileInst.redUser.get();
    const tpJobSeekerProfile = tpJobSeekerProfileInst.toJSON();
    const redUser = redUserInst.toJSON();

    redUserInst.updateAttribute('rediLocation', tpJobSeekerProfile.rediLocation);

    if (!context.isNewInstance) return next();

    var verifyOptions = {
      type: 'email',
      mailer: {
        send: async (verifyOptions, context, cb) => {
          sendTpJobSeekerVerificationEmail({
            recipient: verifyOptions.to,
            redUserId: redUser.id,
            firstName: tpJobSeekerProfile.firstName,
            verificationToken: verifyOptions.verificationToken,
            rediLocation: tpJobSeekerProfile.rediLocation,
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

  // ensure only administrator can see TpJobSeekerCv when isProfileVisibleToCompanies is false
  //   TpJobSeekerProfile.observe(
  //     'access',
  //     function onlyMatchesRelatedToCurrentUser(ctx, next) {
  //       if (!ctx.query.where) ctx.query.where = {}

  //       // TODO: Replace this with role-based 'admin' role check
  //       if (
  //         !ctx.options.currentUser ||
  //         ctx.options.currentUser.email !== 'cloud-accounts@redi-school.org'
  //       ) {
  //         const condition = {
  //           isProfileVisibleToCompanies: true,
  //           state: {
  //             inq: [
  //               'profile-approved-awaiting-job-preferences',
  //               'job-preferences-shared-with-redi-awaiting-interview-match',
  //             ],
  //           },
  //         }
  //         const existingWhere = ctx.query.where
  //         if (Object.values(existingWhere).length > 0) {
  //           ctx.query.where = { and: [condition, existingWhere] }
  //         } else {
  //           ctx.query.where = condition
  //         }
  //       }

  //       next()
  //     }
  //   )
};

const loopbackModelMethodToObservable =
  (loopbackModel, modelMethod) => (methodParameter) =>
    Rx.bindNodeCallback(loopbackModel[modelMethod].bind(loopbackModel))(
      methodParameter
    );

const currentUserStateToPostReviewUpdates = {
  ACCEPT: {
    'submitted-for-review': {
      state: 'profile-approved',
    },
  },
  DECLINE: {
    'submitted-for-review': {
      state: 'drafting-profile',
    },
  },
};

const sendEmailUserReviewedAcceptedOrDenied = switchMap(
  (tpJobSeekerProfileInst) => {
    const userType = tpJobSeekerProfileInst.toJSON().userType;
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
  }
);
