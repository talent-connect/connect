const Rx = require('rxjs');
const _ = require('lodash');

const app = require('../server/server');

const { RedProfile, RedUser } = app.models;

(async () => {
  const allProfiles = await RedProfile.find({ include: 'redUser' });
  const allUsers = await RedUser.find({ include: 'redProfile' });

  await allProfiles.forEach(async (profile) => {
    const profileData = profile.toJSON();
    const userData = profileData.redUser;
    const rediLocationsNotInSync = userData.rediLocation !== profileData.rediLocation;
    const redUser = await RedUser.findById(userData.id);
    if (rediLocationsNotInSync) {
      console.log(`RedProfile ${profileData.id} not in sync with RedUser ${userData.id}`);
      await redUser.updateAttribute('rediLocation', profile.rediLocation);
    }
  });

  const usersWithoutProfile = allUsers.filter((u) => !u.toJSON().redProfile);
  await usersWithoutProfile.forEach(async (user) => {
    const userData = user.toJSON();
    const id = userData.id.toString();
    await RedUser.destroyById(id, (err) => console.log(err));
  });

  console.log(allUsers.length);
  console.log(allProfiles.length);
})();
