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

let menteeRole, mentorRole, adminRole;

roleFindOne({ where: { name: 'mentee' } })
  .pipe(
    map(menteeRole => ({ menteeRole })),
    switchMap(
      () => roleFindOne({ where: { name: 'mentor' } }),
      (data, mentorRole) => ({ ...data, mentorRole })
    ),
    switchMap(
      () => roleFindOne({ where: { name: 'admin' } }),
      (data, adminRole) => ({ ...data, adminRole })
    ),
    tap(
      ({
        mentorRole: _mentorRole,
        menteeRole: _menteeRole,
        adminRole: _adminRole,
      }) => {
        menteeRole = _menteeRole;
        mentorRole = _mentorRole;
        adminRole = _adminRole;
      }
    ),
    switchMap(() => userFind({ include: 'redProfile' })),
    switchMap(users => from(users)),
    concatMap(user => {
      let role;
      const userType = user.toJSON().redProfile.userType;
      const accountEmail = user.toJSON().email;
      if (accountEmail === 'cloud-accounts@redi-school.org') {
        role = adminRole;
      } else if (userType === 'mentor') {
        role = mentorRole;
      } else {
        role = menteeRole;
      }
      return rolePrincipalCreate(role)({
        principalType: RoleMapping.USER,
        principalId: user.toJSON().id,
      });
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
  .subscribe(null, null, () => process.exit());
