# ReDI Connect
ReDI Connect is a 

## Components
database: MongoDB
redi-connect-backend: Loopback/Express.js-based REST server
redi-connect-front: frontend
redi-connect-admin: simple administration panel (based on react-admin)

All can be run locally using below instructions. The production version is hosted on AWS.

## Getting started

### Installation
1. Ensure following is installed and active:
   - mongod
   - node v10
2. Optionally, to easily browse the MongoDB database, install *Studio 3T*
3. Install dependencies: run `yarn` in `redi-connect-front` folder, run `npm install` in `redi-connect-backend` folder
4. Optionally, create a folder named `mongodb-data` for MongoDB's data files

### Run
1. For a clean development session, clear the old database
2. Open the monogdb data folder (e.g. `cd mongodb-data`) and start the mongodb daemon: `mongod --dbpath .`
3. To seed the database with anonymous data, run 
4. Run `yarn start` in `redi-connect-frontend`
5. Run `./start-dev.sh` in `redi-connect-backend` `./seed-random-data.sh` in `redi-connect-backend`
