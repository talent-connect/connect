// const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
// const { join } = require('path')

// module.exports = {
//   content: [
//     join(__dirname, './src/**/*.{js,ts,jsx,tsx,html}'),
//     ...createGlobPatternsForDependencies(__dirname),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
//   presets: [require('../../tailwind-workspace-preset.js')],
// }

const SharedTailwindConfig = require('../../libs/shared-shadcn-ui-components/src/lib/utils/tailwind.config')

module.exports = {
  ...SharedTailwindConfig,
}
