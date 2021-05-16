#!/bin/sh
HTTP=1 NODE_ENV=seeding REDI_LOCATION=berlin node ./apps/api/scripts/seed-database.js && 
HTTP=1 NODE_ENV=seeding REDI_LOCATION=berlin node ./apps/api/scripts/create-roles.js &&
HTTP=1 NODE_ENV=seeding REDI_LOCATION=berlin node ./apps/api/scripts/link-roles-to-users.js
