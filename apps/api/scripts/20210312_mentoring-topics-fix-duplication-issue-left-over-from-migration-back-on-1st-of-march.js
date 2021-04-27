const _ = require('lodash');

const app = require('../server/server');

const RedProfile = app.models.RedProfile;

(async () => {
  const allProfiles = await RedProfile.find({ include: 'redUser' });
  allProfiles.forEach(async (profile) => {
    const profilePOJO = profile.toJSON();
    const topics = profilePOJO.categories;
    const topicsDeduped = _.uniq(topics);
    if (topicsDeduped.length !== topics.length) {
      console.log('this RedProfile has duplicates:');
      console.log(`${profile.firstName} ${profile.lastName}`);
      console.log('deduped:');
      console.log(topicsDeduped);
      await profile.updateAttribute('categories', topicsDeduped);
    }
  });
})();
