const Rx = require('rxjs')
const _ = require('lodash')
const { bindNodeCallback, from } = Rx;
const { switchMap, mergeMap, count, map } = require('rxjs/operators')

const app = require('../server/server')

const { RedProfile } = app.models;

const redProfileFind = bindNodeCallback(RedProfile.find.bind(RedProfile))

redProfileFind()
  .pipe(
    switchMap(redProfiles => from(redProfiles)),
    map(redProfile => {
      redProfile.languages = redProfile.languages.map(l => _.trim(l)).map(l => _.upperFirst(l)).filter(l => l).filter(l => l !== 'Other')
      console.log(redProfile.languages)
      return redProfile
    }),
    mergeMap(redProfile => {
      return redProfile.updateAttribute("languages", redProfile.languages)
    }),
    count()
  )
  .subscribe(console.log)
