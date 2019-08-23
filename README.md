# ReDI Connect
ReDI Connect is a tool to connect mentors and mentees. It is built for ReDI School and its community of teachers, students and volunteers.

## Features
* sign-up for mentors/mentees
* profiles that contain misc. personalia, and checkboxes for what areas of support mentors can offer and mentees are looking for
* form for mentees to submit an application to mentors for mentorship
* mentorship session logging
* problem reporting
* administration panel

## Milestones
* improve overall design, UX and code quality (current state is result of rushed work and has technical debt)
* consider supplementing the front-end web application by a native/hybrid/cross-platform Android / iOS mobile application

## Components
database: MongoDB
redi-connect-backend: Loopback/Express.js-based REST server
redi-connect-front: frontend coded in React
redi-connect-admin: simple administration panel (based on react-admin)

All can be run locally in development mode using below instructions. The production version is hosted on AWS - consult @ericbolikowski for details.

## Getting started

### Installation
1. Ensure following is installed and active:
   - mongod
   - node v10
2. Optionally, to easily browse the MongoDB database, install *Studio 3T*
3. Install dependencies: run `yarn` in `redi-connect-front` folder, run `npm install` in `redi-connect-backend` folder
4. Optionally, create a folder named `mongodb-data` for MongoDB's data files

### Run
1. For a clean development session, clear the old database (via Studio 3T, any other GUI, or simply deleting and re-creating the MongoDB data folder)
2. Open the monogdb data folder (e.g. `cd mongodb-data`) and start the mongodb daemon: `mongod --dbpath .`
3. To seed the database with anonymous data, run `./seed-random-data.sh` in `redi-connect-backend`
4. Run `yarn start` in `redi-connect-frontend`
5. Run `./start-dev.sh` in `redi-connect-backend` 
6. Run `./yarn start` in `redi-connect-admin`
