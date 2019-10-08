[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Releasing

This repo uses [semantic-release](https://github.com/semantic-release/semantic-release), [commitizen](https://github.com/commitizen/cz-cli), [commitlint](http://commitlint.js.org), [husky](https://github.com/typicode/husky) and [conventional commits](https://conventionalcommits.org/en/v1.0.0-beta.4/) in order to automate the release proccess

### Setup/Prequisites

1. The user needs to have a `GH_TOKEN` environment variable set with a valid git token that has push access to the repository which can be generated following these [steps](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
2. the token can be added into a `~/.bash_profile` to avoid manually setting it before running the command.
3. The script should be run from the release branch only (default: master) otherwise it will fail. To change the release branch you can edit the "release" section in the `package.json` file to temporarily set the release branch as follows
```
"release": {
  ...
  "branch": "feature/integrate-semantic-release"
  ...
}
```

### Usage

- `yarn commit` will run commitizen cli to generate a conventional style commit message
- `yarn release` will do a dry-run of the release without pushing or changing any files
- `yarn release --no-ci` will do a real release.
We could potentially use this to automate releases when new commits/PRs land in the master branch
Details

### A release will:

- Bump the version in `package.json` according to semantic versioning (semver) based on the changes/commit messages (fix/perf = patch, feat = minor, breaking = major)
- Create a git tag
- Generate a CHANGELOG.md with the latest changes since the last release
- Push the changes to the repository & create a git release
