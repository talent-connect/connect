const { bindNodeCallback, from } = require('rxjs')
const { concatMap } = require('rxjs/operators')

const app = require('../server/server')
const { Role } = app.models

const roleCreate = bindNodeCallback(Role.create.bind(Role))

const roles = ['admin', 'mentee', 'mentor']

from(roles)
  .pipe(concatMap(role => roleCreate({ name: role })))
  .subscribe(console.log, null, () => process.exit())
