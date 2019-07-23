const { bindNodeCallback, from } = require('rxjs');
const {
  switchMap,
  concatMap,
  map,
  tap,
  mergeMap,
  count,
} = require('rxjs/operators');

const app = require('../server/server');
const { Role, RedUser, RoleMapping } = app.models;

const roleFindOne = bindNodeCallback(Role.findOne.bind(Role));
const userFind = bindNodeCallback(RedUser.find.bind(RedUser));
const rolePrincipalCreate = role =>
  bindNodeCallback(role.principals.create.bind(role));

let menteeRole, mentorRole;

roleFindOne({ where: { name: 'mentee' } })
  .pipe(
    map(menteeRole => ({ menteeRole })),
    switchMap(
      () => roleFindOne({ where: { name: 'mentor' } }),
      (data, mentorRole) => ({ ...data, mentorRole })
    ),
    tap(({ mentorRole: _mentorRole, menteeRole: _menteeRole }) => {
      menteeRole = _menteeRole;
      mentorRole = _mentorRole;
      console.log(menteeRole);
      console.log(mentorRole);
    }),
    switchMap(() => userFind({ include: 'redProfile' })),
    switchMap(users => from(users)),
    concatMap(user =>
      rolePrincipalCreate(
        user.toJSON().redProfile.userType === 'mentor' ? mentorRole : menteeRole
      )({ principalType: RoleMapping.USER, principalId: user.toJSON().id })
    ),
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
  .subscribe(null, null, () => process.exit());
