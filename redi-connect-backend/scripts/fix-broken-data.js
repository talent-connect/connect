const Rx = require('rxjs');
const _ = require('lodash');

const app = require('../server/server');

const { RedProfile, RedUser } = app.models;

(async () => {
  const allProfiles = await RedProfile.find({ include: 'redUser' });
  const allUsers = await RedUser.find({ include: 'redProfile' });

  // Reconcile RedProfile.rediLocation and RedUser.rediLocation
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

  // Find orphaned RedUsers
  const usersWithoutProfile = allUsers.filter((u) => !u.toJSON().redProfile);
  await usersWithoutProfile.forEach(async (user) => {
    const userData = user.toJSON();
    const id = userData.id.toString();
    await RedUser.destroyById(id, (err) => console.log(err));
  });

  await allProfiles.forEach(async (profile) => {
    const profileData = profile.toJSON();
    const profileRediLocation = profileData.rediLocation;

    const categories = profileData.categories;
    let categoriesUpdateNeeded = false;
    let newCategories = [];

    // check categories
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      let location;
      if (category.includes('nrw')) location = 'nrw';
      else if (category.includes('munich')) location = 'munich';
      else location = 'berlin';
      if (location !== profileRediLocation) {
        categoriesUpdateNeeded = true;
        console.log(
          `RedProfile for ${profileData.firstName} ${profileData.lastName}, ${profileData.userType} in location ${profileRediLocation} has category ${category} not valid for this location`
        );
      } else {
        newCategories.push(category);
      }
    }

    if (categoriesUpdateNeeded) {
      console.log(categories);
      console.log(newCategories);

      profile.updateAttribute('categories', newCategories);
    }

    // check course
    const course = profileData.mentee_currentlyEnrolledInCourse;
    if (course) {
      let location;
      if (course.includes('nrw')) location = 'nrw';
      else if (course.includes('munich')) location = 'munich';
      else location = 'berlin';
      if (location !== profileRediLocation) {
        console.log(
          `RedProfile for ${profileData.firstName} ${profileData.lastName}, ${profileData.userType} in location ${profileRediLocation} has a course ${course} not valid for this location`
        );
      }
    }

    if (categoriesUpdateNeeded) {
      console.log(`\n\n`);
    }
  });

  console.log(allUsers.length);
  console.log(allProfiles.length);
})();
