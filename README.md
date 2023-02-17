# Connect

You'll find three sister products in this repository:

- ReDI Connect, a tool to connect mentees to mentors, deployed to https://connect.redi-school.org
- ReDI Talent Pool, a tool to connect jobseekers to companies and get jobs, deployed to https://talent-pool.redi-school.org
- Christos

Both are created, run and managed by [ReDI School of Digital Integration](https://www.redi-school.org). We're a non-profit school in Germany (in Berlin, Hamburg, Munich and NRW) with a community of hundreds of professionals from the digital industry volunteering to teach and mentor students. Our students are tech-interested locals and newcomers to Germany.

## Getting started for developers

1. Make sure [MongoDB](https://docs.mongodb.com/manual/installation/) is installed on your computer.
2. Make sure you're running the _v14.17.6_ version of Node locally when you're running the backend server and checkout to a new branch. To do this, you can use [nvm](https://github.com/nvm-sh/nvm#node-version-manager), which allows you to select different versions of Node via the command line. Alternatively, we have added support for [Volta](https://docs.volta.sh/guide/understanding). So if you choose, you can use Volta, which sets project-defined tools automatically.
3. Request information for environment variables from @ericbolikowski.
4. Run `yarn` in project root to install dependencies.
5. If you're re-seeding, drop the database files: `rm -rf mongodb-data/*` and run `yarn seed` to seed the database.

   Alternatively, you can drop the database in the MongoDB Shell - [mongo](https://www.mongodb.com/docs/v4.4/mongo/) or [mongosh](https://www.mongodb.com/docs/mongodb-shell/). In a new terminal window run the following:

   ```
   $ mongo
   $ use mongodb
   $ db.dropDatabase()
   ```

   ~~Then run `yarn seed` in project root to seed the database.~~

6. Run `yarn start:all` to boot all apps, _or_ a subset of apps using the `start:x` commands in package.json.

   It'll take a while and lots of warnings will show until everything's booted.

7. If you don't have environment variables set up, talk to @ericbolikowski to get these. The NestJS backend will not work without them.

8. See the [Onboarding Checklist](https://github.com/talent-connect/connect/wiki#onboarding-checklist) in our Wiki.

You can open these in your browser:

- ReDI Talent Pool: http://localhost:2999
- ReDI Connect: http://localhost:3000
- Admin panel: http://localhost:3001
- ReDI Connect Location Picker: http://localhost:3002
- API/backend: http://localhost:3003, Swagger: http://localhost:3003/explorer
- NestJS/new backend: http://localhost:3333, GraphiQL: http://localhost:3333/graphql

Set environment variable `NX_DEV_MODE_EMAIL_RECIPIENT=your-own-email-address@gmail.com` in `apps/nestjs-api/.env.local` and it'll override the default recipient and send to that. You won't be receving any emails otherwise.

We use [Nx Dev Tools](https://nx.dev/) to manage this monorepo. Find all the apps/products under `apps/` and all libraries they consume under `libs/`.

Use trunk-based branching - create feature/bugfix/docs/refactor/blabla branches directly off `master` and file PRs to merge back into `master`. Name branches `<type>/short-hyphenated-title`, where `type` is `feat`, `fix`, `docs`, `style`, `refactor`, `test` or `chore`.

## Note on how to use the GraphiQL playground

The GraphiQL playground is a tool that allows you to test the GraphQL API. It is available at http://localhost:3333/graphql.

The playground is a great tool to test the API, but it is not meant to be used in production. It is a development tool only.

Use it to view all the available GraphQL queries and mutations. Most queries and mutations require authentication. To authenticate, you need to provide a valid JWT token. You can get a valid JWT token by logging in to the ReDI Connect application. Use your browser's developer tools to view network requests. Once you are logged in, find the `POST /api/redUsers/login` request. There, copy the `jwtToken`. Then, in the GraphiQL playground, click on the `HTTP HEADERS` tab. Paste the following:

```
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

Alternatively, use Loopback's Swagger (http://localhost:3003) to manually send a login request, and copy the JWT token from the response.

See this Loom video for a demo: https://www.loom.com/share/b2328a7ec6054afebb8249ea59ef2f18

## Getting started for designers

See the [Onboarding Checklist](https://github.com/talent-connect/connect/wiki#onboarding-checklist) and [Workflow for design tasks](https://github.com/talent-connect/connect/wiki#workflow-design-tasks) in our Wiki.

## Getting started in depth

## Guide to the repo and working on it

## Editor setup

## Good to know

We send out automated reminder emails to ReDI Connect mentor and mentee users, for things like "you've both been in an active mentorship for 10 days, no mentoring sessions have been logged yet, please start logging them". See [Daily job to send notification emails to users](./DAILY-SEND-EMAIL-JOB-DOCS.md) for a full list of automated reminder emails.

## Manual testing

## About the Nx monorepo

Main benefits:

- code sharing between apps (admin, backend, redi connect, redi talent pool) - great for components, types, utilities, and much more
- one linter to rule them all - no more crazy pull requests with style changes
- one command to start it all - no more four terminal windows to start all the apps
- overall easier to extend & scale - there’s future work in the pipeline for which Nx is a great match (NestJS, Storybook, hint hint)

## System Architecture

ReDI Connect and ReDI Talent Pool are two React front-ends that use a Express/Loopback/NodeJS back-end to access data stored in a MongoDB database. The backend is hosted on a virtual machine, whereas the React front-ends are compiled into static assets stored on AWS S3 / CloudFront. Emails to users are sent via AWS SES. Some other static assets plus user uploads are hosted in AWS S3 buckets.

This diagram shows the current system architecture of both platforms:
![Architecture](https://user-images.githubusercontent.com/51786805/144653051-c8be1ee0-26da-42e0-b119-4d0d07754d79.png)

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
