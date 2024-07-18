const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

// Configuration for TailwindCSS v2.2.16
module.exports = {
  purge: [
    join(__dirname, './src/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  prefix: 'tw-',
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}

// Configuration for TailwindCSS v3
// module.exports = {
//   content: [
//     join(__dirname, './src/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,html}'),
//     ...createGlobPatternsForDependencies(__dirname),
//   ],
//  prefix: 'tw-',
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
