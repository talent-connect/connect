const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind')
const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, './src/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,html}'),
    join(
      __dirname,
      '../../libs/shared-shadcn-ui-components/src/**/*.{js,ts,jsx,tsx}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  prefix: 'tw-',
  plugins: [require('tailwindcss-animate')],
  // importing TailwindCSS/shadcn global theme configuration
  presets: [
    require('../../libs/shared-shadcn-ui-components/src/lib/utils/tailwind.config'),
  ],
}
