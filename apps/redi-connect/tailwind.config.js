const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, './src/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
