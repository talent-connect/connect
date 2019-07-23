## Install shit
1. Ensure following stuff is installed:
   - mongod
   - node v10
   - nodemon
2. Optionally, to easily browse the MongoDB database, install *Studio 3T*
3. Install dependencies: run `yarn` in `redi-connect-front` folder, run `npm install` in `redi-connect-backend` folder

## Run shit
1. Nuke old database
2. Start mongod in mongodb-data folder: `cd mongodb-data && mongod --dbpath .`
3. Run `yarn start` in `redi-connect-frontend`
4. Run `./start-dev.sh` in `redi-connect-backend`

## Initialize shit
To seed the database with stuff:
1. Run `./seed-random-data.sh` in `redi-connect-backend`

## Handy shit
MongoDB is running and you want to kill it:
1. Find the process ID of `monogod` (running on port `27107` by default)