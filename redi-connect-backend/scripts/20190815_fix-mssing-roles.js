'use strict';

const app = require('../server/server.js');
const _ = require('lodash');

const { RedUser, RedProfile, RoleMapping, Role } = app.models;

(async function() {
  const mentorRole = await Role.findOne({ where: { name: 'mentor' } });
  const menteeRole = await Role.findOne({ where: { name: 'mentee' } });

  const users = await RedUser.find();
  const profiles = await RedProfile.find()
    .map(profile => profile.toJSON())
    .filter(profile => profile.redUserId);
  const roleMappings = await RoleMapping.find();
  const userIds = users.map(user => user.id.toString());
  const roleMappingUserIds = roleMappings.map(mapping => mapping.principalId);
  const usersWithoutMapping = _.difference(userIds, roleMappingUserIds);

  const usersWithoutMappingProfiles = usersWithoutMapping
    .map(userId => {
      const profile = profiles.find(
        profile => profile.redUserId.toString() === userId
      );
      if (!profile) console.log('Problem: ', userId);
      return profile;
    })
    .filter(p => p);

  console.log(usersWithoutMappingProfiles);

  const createMappingsPromises = usersWithoutMappingProfiles
    .filter(profile => {
      return ['mentee', 'mentor'].includes(profile.userType);
    })
    .map(profile => {
      const role = profile.userType === 'mentee' ? menteeRole : mentorRole;
      return role.principals.create({
        principalType: RoleMapping.USER,
        principalId: profile.redUserId,
      });
    });
  try {
    const results = await Promise.all(createMappingsPromises);
    console.log(results);
  } catch (error) {
    console.log(error);
  }
})();
