const { bindNodeCallback, from } = require('rxjs')
const Rx = require('rxjs')
const { concatMap, switchMap, switchMapTo, tap } = require('rxjs/operators')

const app = require('../server/server')
const { Role } = app.models

const roleDestroyAll = Rx.bindNodeCallback(Role.destroyAll.bind(Role))
const roleCreate = bindNodeCallback(Role.create.bind(Role))
const roleListAll = bindNodeCallback(Role.find.bind(Role))

const roles = ['admin', 'mentee', 'mentor', 'jobseeker', 'company']

Rx.of({})
  .pipe(
    tap(() => console.log('********** Create Roles **********************')),
    tap(() => console.log('-------- Destroy Old List roles --------------')),
    switchMap(roleDestroyAll),
    tap(() => console.log('-------- List roles after destroy ------------')),
    switchMap(roleListAll),
    tap(console.log),
    tap(() => console.log('--- DONE Destroy List Roles ------------------')),
    tap(() => console.log('-------- Create New Roles --------------------')),
    switchMapTo(roles),
    // tap((role) => console.log(`role ${role}`)),
    concatMap((role) => roleCreate({ name: role })),
    tap(() => console.log('--- DONE Create New Roles --------------------'))
  )
  .subscribe(console.log, null, () => {
    console.log('*** DONE Create Roles **********************')
    process.exit()
  })
