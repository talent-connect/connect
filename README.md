# Connect

You'll find two sister products in this repository:

- ReDI Connect, a tool to connect mentees to mentors, deployed to https://connect.redi-school.org
- ReDI Talent Pool, a tool to connect jobseekers to companies and get jobs, deployed to https://cv-builder.redi-school.org

Both are created, run and managed by ReDI School of Digital Integration. We're a non-profit school in Germany (in Berlin, Munich and NRW) with a community of hundreds of professionals from the digital industry volunteering to teach and mentor students. Our students are tech-interested locals and newcomers to Germany.

## Getting started for developers

1. Make sure mongodb is installed your computer
2. If you're re-seeding, drop the database files: `rm -rf mongodb-data/*`
3. Run `yarn` in project root to install dependencies
4. Run `yarn start:all` to boot all apps, _or_ a subset of apps using the `start:x` commands in package.json.

   It'll take a while and lots of warnings will show until everything's booted.

5. If you're re-seeding, run `yarn seed` to seed database

You can open these in your browser:

- ReDI Talent Pool: http://localhost:2999
- ReDI Connect: http://localhost:3000
- Admin panel: http://localhost:3001
- ReDI Connect Location Picker: http://localhost:3002
- API/backend: http://localhost:3003, Swagger: http://localhost:3003/explorer

Set environment variable `DEV_MODE_EMAIL_RECIPIENT=your-own-email-address@gmail.com` and it'll override the default recipient and send to that instead (e.g. `DEV_MODE_EMAIL_RECIPIENT=your-own-email-address@gmail.com yarn start:all`).

All features will run correctly locally with two exceptions:

1. AWS SES (Simple Email Service) used for transactional emails (sign-up confirmation, verification, event notifications etc)
2. AWS S3 to store avatar images uploaded by users.

You need an AWS access/secret key for the above - write to @ericbolikowski to get these, then put them into your environment file (`apps/api/.env`).

We use [Nx Dev Tools](https://nx.dev/) to manage this monorepo. Find all the apps/products under `apps/` and all libraries they consume under `libs/`.

Use trunk-based branching - create feature/bugfix/docs/refactor/blabla branches directly off `master` and file PRs to merge back into `master`. Name branches `<type>/short-hyphenated-title`, where `type` is `feat`, `fix`, `docs`, `style`, `refactor`, `test` or `chore`.

## Getting started for designers

See the [Onboarding Checklist](https://github.com/talent-connect/connect/wiki#onboarding-checklist) and [Workflow for design tasks](https://github.com/talent-connect/connect/wiki#onboarding-checklist) in our Wiki.

## Getting started in depth

## Guide to the repo and working on it

## Editor setup

## Good to know

## Manual testing

## About the Nx monorepo

Main benefits:

- code sharing between apps (admin, backend, redi connect, redi talent pool) - great for components, types, utilities, and much more
- one linter to rule them all - no more crazy pull requests with style changes
- one command to start it all - no more four terminal windows to start all the apps
- overall easier to extend & scale - there’s future work in the pipeline for which Nx is a great match (NestJS, Storybook, hint hint)

# Nx out-of-the-box docs

All the below is written by Nx.

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Powerful, Extensible Dev Tools**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/nx-community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@talent-connect/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## ☁ Nx Cloud

### Computation Memoization in the Cloud

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-cloud-card.png"></p>

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
