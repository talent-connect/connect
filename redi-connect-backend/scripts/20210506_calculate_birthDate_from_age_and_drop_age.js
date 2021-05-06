const _ = require('lodash');
const moment = require('moment');

const app = require('../server/server');

const RedProfile = app.models.RedProfile;

(async () => {
  const allProfiles = await RedProfile.find({ include: 'redUser' });
  allProfiles.forEach(async (profile) => {
    const toDay = moment(new Date());
    const birthDate = moment((toDay.format('DD.MM.') + (toDay.year() - profile.age).toString()), 'DD.MM.YYYY')
    console.log('this RedProfile :');
    console.log(`${profile.firstName} ${profile.lastName}`);
    console.log('birthDate calculated:');
    console.log(`${birthDate} from age ${profile.age}`);
    await profile.updateAttribute('birthDate', birthDate);
    await profile.removeAttribute('age');
  });
})();
