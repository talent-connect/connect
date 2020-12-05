# ReDI Connect

ReDI Connect is a tool to connect mentors and mentees. It is built for ReDI School and its community of teachers, students and volunteers.

## Features

- sign-up for mentors/mentees
- profiles that contain misc. personalia, and checkboxes for what areas of support mentors can offer and mentees are looking for
- form for mentees to submit an application to mentors for mentorship
- mentorship session logging
- problem reporting
- administration panel

## Milestones

- improve overall design, UX and code quality (current state is result of rushed work and has technical debt)
- consider supplementing the front-end web application by a native/hybrid/cross-platform Android / iOS mobile application

## Components

- database: MongoDB
- redi-connect-backend: Loopback/Express.js-based REST server
- redi-connect-front: frontend coded in React
- redi-connect-admin: simple administration panel (based on react-admin)

All can be run locally in development mode using below instructions. The production version is hosted on AWS - consult @ericbolikowski for details.

## Contribution guide

Contribution guide will be elaborated. For now, please:

- Please follow the [gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) model for branching (minus release branches). TL;DR: create `feat/xxx` branches off `develop` and file a PR once the feature is ready. Merge of `develop` into `master` done by maintainers only, once `develop` is release-ready. Use `hotfix` branches off `master`.
- Please follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4) when writing your commit messages. This is required for merge commits to `develop` and `master`, and encouraged for all other commits. TL;DR: use this syntax for commit summary: `<type<[(<scope<)]: <description>`, where `type = fix|feat|chore|docs|style|refactor|perf|test|`, `scope=backend|front|admin` (sub-scope optional).

## Getting started (without Docker)

### Installation

1. Ensure following is installed and active:
   - mongod
   - node v14
2. Optionally, to easily browse the MongoDB database, install _Studio 3T_
3. Install dependencies: run `yarn` in `redi-connect-front` folder, `yarn` in `redi-connect-admin` folder, run `npm install` in `redi-connect-backend` folder
4. Optionally, create a folder named `mongodb-data` for MongoDB's data files
5. Create your `.env.development` in `redi-connect-backend`. You can base it off `.env.sample` in the same folder. Reach out to @ericbolikowski for a complete `.env.development`.

### Run

1. For a clean development session, clear the old database (via Studio 3T, any other GUI, or simply deleting and re-creating the MongoDB data folder)
2. Open the monogdb data folder (e.g. `cd mongodb-data`) and start the mongodb daemon: `mongod --dbpath .`
3. To seed the database with anonymous data, run `REDI_LOCATION=berlin ./seed-random-data.sh` in `redi-connect-backend` (note: the output of this script might make you think that it's failing, because it keeps showing `Unhandled promise rejection` warnings; it will display about 100 of these messages and it will succeed anyway, showing `done` at the very end)
4. Run `yarn start:berlin` in `redi-connect-front`
5. Run `./start-dev.sh` in `redi-connect-backend`
6. Run `./yarn start` in `redi-connect-admin`

## Getting started (with Docker)

### Installation

You don't need to have Node or Mongo installed locally.
You need Docker and Docker Compose.

Create your `.env.development` in `redi-connect-backend`. You can base it off `.env.sample` in the same folder. Reach out to @ericbolikowski for a complete `.env.development`.

### Run

1. `docker-compose build` will build all the required images.
2. `docker-compose up -d` will run all the containers.
3. `docker-compose ps` will show the state of all the container (hopefully `Up`).
4. `docker-compose stop` will stop all the containers.

### Connect

The services are exposed as such:

- `front` on http://localhost:3001
- `admin` on http://localhost:3002
- `backend` on http://localhost:3003

### Good to know

- The `front` app is set up to use `berlin` as the REDI location. This can be changed by editing the Docker Compose file (look for `REDI_LOCATION`).
- The MongoDB files will be stored in `mongodb-data`.
- The source files will be _mounted_ in the containers, so that if you edit the local files, the change will be reflected immediately in the containers, and the content will be updated accordingly (as if you were working locally).
- The seed data will automatically be loaded by the service named `seed`. This service will create the file `mongodb-data/seed-has-been-loaded` to avoid reloading the data each time you run `docker-compose up`. You can force reloading the seed data by removing that file and running `docker-compose up seed`.
- The Dockerfiles for `admin`, `backend`, and `front` install the dependencies (with `yarn` or `npm install`) in `CMD` as well because we are bind-mounting the local `node_modules` directory, which might contain outdated or invalid versions of the dependencies.

## Testing

The seed data contains an admin account with `cloud-accounts@redi-school.org` as the login and password.

You can find more test users in `seed-database.js`.

If you want to test email receipt (for example by applying from the mentee user to the mentor user), you have at least two options:

- Re-seed the database, but change the email addresses in the seed files first.
- When running the backend, set environment variable `DEV_MODE_EMAIL_RECIPIENT=your-own-email-address@gmail.com` and it'll override the default recipient and send to that instead.
