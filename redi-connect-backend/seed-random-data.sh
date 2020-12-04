#!/bin/sh
HTTP=1 NODE_ENV=seeding REDI_LOCATION=berlin node scripts/seed-database.js && 
HTTP=1 NODE_ENV=seeding REDI_LOCATION=berlin node scripts/create-roles.js &&
HTTP=1 NODE_ENV=seeding REDI_LOCATION=berlin node scripts/link-roles-to-users.js
