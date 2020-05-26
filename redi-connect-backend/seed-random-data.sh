HTTP=1 NODE_ENV=seeding node scripts/seed-database.js && 
HTTP=1 NODE_ENV=seeding node scripts/create-roles.js &&
HTTP=1 NODE_ENV=seeding node scripts/link-roles-to-users.js