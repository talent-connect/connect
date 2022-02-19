const { bindNodeCallback, from } = require('rxjs')
const { switchMap, concatMap, map, tap, count } = require('rxjs/operators')

const app = require('../server/server')
const { Role, RedUser, RoleMapping } = app.models

const roleFindOne = bindNodeCallback(Role.findOne.bind(Role))
const userFind = bindNodeCallback(RedUser.find.bind(RedUser))
const rolePrincipalCreate = (role) =>
  bindNodeCallback(role.principals.create.bind(role))

let menteeRole, mentorRole, adminRole, companyRole, jobseekerRole

roleFindOne({ where: { name: 'mentee' } })
  .pipe(
    map((menteeRole) => ({ menteeRole })),
    switchMap(
      () => roleFindOne({ where: { name: 'mentor' } }),
      (data, mentorRole) => ({ ...data, mentorRole })
    ),
    switchMap(
      () => roleFindOne({ where: { name: 'admin' } }),
      (data, adminRole) => ({ ...data, adminRole })
    ),
    switchMap(
      () => roleFindOne({ where: { name: 'company' } }),
      (data, companyRole) => ({ ...data, companyRole })
    ),
    switchMap(
      () => roleFindOne({ where: { name: 'jobseeker' } }),
      (data, jobseekerRole) => ({ ...data, jobseekerRole })
    ),
    tap(
      ({
        mentorRole: _mentorRole,
        menteeRole: _menteeRole,
        adminRole: _adminRole,
        companyRole: _companyRole,
        jobseekerRole: _jobseekerRole,
      }) => {
        menteeRole = _menteeRole
        mentorRole = _mentorRole
        adminRole = _adminRole
        companyRole = _companyRole
        jobseekerRole = _jobseekerRole
      }
    ),
    switchMap(() => userFind({ include: 'redProfile' })),
    switchMap((users) => from(users)),
    concatMap((user) => {
      let role, userType
      const userJSON = user.toJSON()

      if (userJSON.redProfile) userType = userJSON.redProfile.userType
      else if (userJSON.tpCompanyProfile) userType = 'tpCompany'
      else if (userJSON.tpJobseekerProfile) userType = 'tpJobseeker'

      if (userJSON.email === 'cloud-accounts@redi-school.org') {
        role = adminRole
      } else if (userType === 'mentor') {
        role = mentorRole
      } else if (userType === 'mentee') {
        role = menteeRole
      } else if (userType === 'tpCompany') {
        role = companyRole
      } else if (userType === 'tpJobseeker') {
        role = jobseekerRole
      } else {
        // e.g. public-sign-up-mentee-pending-review
        role = menteeRole
      }

      return rolePrincipalCreate(role)({
        principalType: RoleMapping.USER,
        principalId: user.toJSON().id,
      })
    }),
    count()

    /*

    map(redUser => ({ redUser })),
    switchMap(
      () => roleFindOne({ where: { name: 'mentee' } }),
      (data, role) => ({ ...data, role })
    ),
    switchMap(
      data =>
        rolePrincipalCreate(data.role)({
          principalType: RoleMapping.USER,
          principalId: data.redUser.toJSON().id,
        }),
      (data, roleMapping) => ({ ...data, roleMapping })
    )
    */
  )
  .subscribe(null, null, () => process.exit())
