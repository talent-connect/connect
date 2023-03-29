const app = require('../server/server')
const Rx = require('rxjs')
const { mergeMap, switchMap } = require('rxjs/operators')
const { bindNodeCallback, from } = Rx

const { RedUser } = app.models

const findUsers = bindNodeCallback(RedUser.find.bind(RedUser))
const setPassword = (redUserInst) =>
  bindNodeCallback(redUserInst.setPassword.bind(redUserInst))

findUsers()
  .pipe(
    switchMap((redUsers) => from(redUsers)),
    mergeMap((redUserInst) => setPassword(redUserInst)('yalla'), 10)
  )
  .subscribe(
    console.log,
    (err) => console.log(err),
    () => console.log('done')
  )
