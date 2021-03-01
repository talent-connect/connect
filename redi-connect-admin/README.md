# ReDI Connect

## Overview


## Installation
1. Ensure the following is installed locally:
   - mongod
   - node v10
2. Optionally, to easily browse the MongoDB database, install *Studio 3T* (note: during install, you can get a free non-profit license if your use case of ReDI Connect is non-profit)
3. Install dependencies:
   a. Go to `redi-connect-front` folder and run `yarn`
   b. Go to `redi-connect-backend` folder and run `npm install`
4. Prepare a folder where MongoDB can store its data files: `mkdir mongodb-data` (this folder is included in `.gitignore`)

## Usage
1. Nuke old database
2. Start mongod in mongodb-data folder: `cd mongodb-data && mongod --dbpath .`
3. Run `yarn start` in `redi-connect-frontend`
4. Run `yarn start` in `redi-connect-backend`

## Production deployment
Production deployment is so far done manually by Eric.

## Handy recipes
MongoDB is running and you want to kill it:
1. Find the process ID of `monogod` (running on port `27107` by default)