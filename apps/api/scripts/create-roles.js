const { bindNodeCallback, from } = require('rxjs')
const { concatMap, tap } = require('rxjs/operators')

const app = require('../server/server')
const { Role } = app.models

const roleCreate = bindNodeCallback(Role.create.bind(Role))

const roles = ['admin', 'mentee', 'mentor', 'jobseeker', 'company']

console.log('****** Create Roles **************************')
from(roles)
  .pipe(
    tap((role) => console.log(`role ${role}`)),
    concatMap((role) => roleCreate({ name: role }))
  )
  .subscribe(console.log, null, () => {
    console.log('*** DONE Create Roles ************************')
    process.exit()
  })
