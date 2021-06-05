const Rx = require('rxjs');
const _ = require('lodash');

const app = require('../server/server');

const { RedProfile, RedUser } = app.models;

(async () => {
  const allProfiles = await RedProfile.find({ include: 'redUser' });
  const allUsers = await RedUser.find({ include: 'redProfile' });

  // Find orphaned RedUsers
  const usersWithoutProfile = allUsers.filter((u) => !u.toJSON().redProfile);
  await usersWithoutProfile.forEach(async (user) => {
    const userData = user.toJSON();
    const id = userData.id.toString();
    await RedUser.destroyById(id, (err) => console.log(err));
    console.log(`Deleting orphaned RedUser #${id} with email ${userData.email}`);
  });

  console.log(allUsers.length);
  console.log(allProfiles.length);
})();