'use strict';

const app = require('../server/server.js');
const _ = require('lodash');
const fp = require('lodash/fp');
const Rx = require('rxjs');
const { from, of } = Rx;
const {
  concatMap,
  mergeMap,
  switchMap,
  filter,
  mapTo,
  map,
  switchMapTo,
  count,
  reduce,
  tap,
  toArray,
} = require('rxjs/operators');

const { RedProfile } = app.models;

const redProfileFind = Rx.bindNodeCallback(RedProfile.find.bind(RedProfile));
const redProfileUpdateField = redProfileInst =>
  Rx.bindNodeCallback(redProfileInst.updateAttribute.bind(redProfileInst));

redProfileFind()
  .pipe(
    switchMap(redProfiles => from(redProfiles)),
    filter(redProfile => redProfile.toJSON().lastName),
    mergeMap(redProfileInst => {
      const redProfile = redProfileInst.toJSON();
      const userType = redProfile.userType;
      if (!userType) console.log('i got you');
      const didComeFromTypeForm = typeof redProfile.index !== 'undefined';
      return redProfileUpdateField(redProfileInst)(
        'signup-source',
        didComeFromTypeForm
          ? 'imported-from-typeform'
          : 'manual-import-via-script'
      );
    }),
    count()
  )
  .subscribe(console.log, console.log, console.log);
