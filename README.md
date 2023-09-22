# Connect

You'll find two sister products in this repository:

- ReDI Connect, a tool to connect mentees to mentors, deployed to https://connect.redi-school.org
- ReDI Talent Pool, a tool to connect jobseekers to companies and get jobs, deployed to https://talent-pool.redi-school.org

Both are created, run and managed by [ReDI School of Digital Integration](https://www.redi-school.org). We're a non-profit school in Germany (in Berlin, Hamburg, Munich and NRW) with a community of hundreds of professionals from the digital industry volunteering to teach and mentor students. Our students are tech-interested locals and newcomers to Germany.

## Getting started for developers

First of all, ReDI Connect / Talent Pool connect to a Salesforce instance via the nestjs-api app. You'll need to set a number of environment variables in your `.env` file to make the Salesforce connection work. Reach out to @helloanil, @katamatata or @ericbolikowski to get set up.

After you've set up `.env`, make sure to update `NX_DEV_MODE_EMAIL_RECIPIENT` to your own email address to receive emails from the platform.

1. Make sure [MongoDB](https://docs.mongodb.com/manual/installation/) is installed on your computer.
2. Make sure you're running the _v14.17.6_ version of Node locally when you're running the backend server and checkout to a new branch. To do this, you can use [nvm](https://github.com/nvm-sh/nvm#node-version-manager), which allows you to select different versions of Node via the command line. Alternatively, we have added support for [Volta](https://docs.volta.sh/guide/understanding). So if you choose, you can use Volta, which sets project-defined tools automatically.
3. Run `yarn` in project root to install dependencies.
4. Run `yarn start:all` to boot all apps, _or_ a subset of apps using the `start:x` commands in package.json.
5. See the [Onboarding Checklist](https://github.com/talent-connect/connect/wiki#onboarding-checklist) in our Wiki.

You can open these in your browser:

- ReDI Talent Pool: http://localhost:2999
- ReDI Connect: http://localhost:3000
- Salesforce login: https://test.salesforce.com/ (get credentials from @katamatata, @helloanil or @ericbolikowski)
- Loopback API: http://localhost:3003, Swagger: http://localhost:3003/explorer
- NestJS API: http://localhost:3333, GraphiQL: http://localhost:3333/graphql

6. If you're using VsCode, make sure you:

   - Enable file nesting (setting `explorer.fileNesting.enabled`) to collapse React component `.graphql`, `.generated.ts` and `.scss` files. This makes it easier to use the file explorer.
   - Install the [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) extension to automatically generate react-query hooks when saving .graphql files. This will speed up your development so you don't need to manually run `yarn graphql:codegen`.

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

## More about GraphQL & data models

### Code generation

TL;DR: run nestjs-api + `yarn graphql:codegen` to update react-query hooks after changing nestjs entity models or any .graphql file. Install [VsCode “Run on Save” extension](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) to automatize codegen (for .graphql files).

Note: in case code generation doesn’t work, it might be because the nestjs-api app is not running. Make sure that it is in a running state.

We use `graphql-codegen` to generate react-query hooks (queries and mutations). To run the code generation, first ensure the nestjs-api is running, then execute `yarn graphql:codegen`.

To auto-run the codegen after changes to `.graphql` files, install this VsCode “Run on Save” extension: [https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave). The repository’s VsCode config (in `.vscode/settings.json`) is already set up to enable this.

### Visualize the entire GraphQL schema

1. Copy the contents of `schema.graphql` in the project root folder. If you want to ensure it’s 100% up to date, first start NestJS (`yarn start:alone:nestjs-api`), then run `yarn graphql:codegen`
2. Open GraphQL Voyager: [https://ivangoncharov.github.io/graphql-voyager/](https://ivangoncharov.github.io/graphql-voyager/)
3. Click Change Schema > SDL > paste the file in > Display.

### Where and how are data model schemas defined?

Schemas for data models (e.g. `ConProfile`, `ConMentoringSession`, `TpJobseekerProfile` and `TpJobListing`) are defined in two places:

1. **Visually, in Salesforce**: Salesforce provides an _Object Manager_ to set up Objects and their properties (e.g. `firstName`, `birthDate`, etc.), through a web admin interface. Talk to Eric/Anil/Manu for access.
2. **In code, in the `common-types` library:** see the repository folder `libs/common-types/src/lib`

Each data model in the `common-types` folder is represented by a Typescript class. Every data model has two representations:

1. As represented in the **salesforce domain**: when the file name or class name ends with `Record`, the model’s structure, property names and property types reflect how the data model is. The term **Record** is chosen since it’s standard terminology in Salesforce. _Record_ is just Salesforce’s way of saying _row_ or _instance_.
2. As represented in the **core domain**: when the file name or class name ends with `Entity`, the model follows a simpler and flatter structure, the same one that was used for years before CON and TP data were migrated to Salesforce. We use the term **Entity** as it implies a “thing”, such as a jobseeker’s profile, a mentor<>mentee match, a logged mentoring session, and so forth.

There are two important reasons why data models have two representations:

1. Salesforce enforces a certain complexity in its data models. For instance, the suffix `__c` is automatically added to the name of any property we define on a model/object. There are also nested objects within objects.
2. For years, CON and TP data lived in a MongoDB database, with a simple and effective data model structure that suited our needs. After migrating all the data to Salesforce, we essentially had two choices: update all code to access data using Salesforce’s names for objects and properties, or create a wrapper / abstraction to maintain our “core” domain models as they’ve been. We chose the latter.

To convert data from one domain representation to another, we use **Mapper** classes. Look for file names ending in `.mapper`.

Our `nestjs-api` thereafter uses GraphQL and code generation (codegen) to defining types (both TS types and GraphQL object tpyes) in various places. You can think of this as the data models “bubbling up” from the back-end:

1. All our data models, or entities, start in the `libs/common-types/src/lib` folder, as typescript classes
2. NestJS analyzes all classes with the decorator `@ObjectType()`
3. NestJS generates a GraphQL schema, containing all our entities in the shape of object types
4. The command `yarn graphql:codegen` uses the `graphql-codegen` tool to read the schema. It then generates Typescript types (see `libs/data-access/src/lib/types/types.ts`). It also scans all `.graphql` files for queries and mutations, and creates `react-query` queries and mutations stored in `.generated.ts` files right next to the `.graphql` file.

## What responsibilities are still carried by Loopback?

- Authenticate users
- Store credentials in its linked MongoDB database
- Create signed urls for uploading assets to S3

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

## Production server administration

We use `pm2` on the production server to manage our two nodejs servers, `loopback` and `nestjs-api`.

- Run `pm2 monit` for an overview of the two servers and their logs. Run `pm2 status` for a quick status of the servers.
- **NOTE:** pm2 will automatically boot nestjs-api and loopback on server restart.
- To start/stop servers, run `pm2 start <server-name>` or `pm2 stop <server-name>`. To restart, run `pm2 restart <server-name>`. You don't need to include environment variables or various other flags, pm2 has this configuration "saved" since the first boot.

If you ever need to configure/start the servers from "scratch", here's how to do it:

- `[All the environment variables] pm2 restart --name loopback --log /home/ubuntu/loopback.log --max-memory-restart 250M /home/ubuntu/connect/apps/api/server/server.js`
- `[All the environment variables] pm2 start --name nestjs-api --log /home/ubuntu/nestjs-api.log --max-memory-restart 500M connect/dist/apps/nestjs-api/main.js`

**If you need to _update the environment variables_**, run the above command with `restart` instead of `start`, and also add the `--update-env` flag.

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
