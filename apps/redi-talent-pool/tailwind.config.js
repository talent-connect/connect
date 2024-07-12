const { join } = require('path')

module.exports = {
  content: [
    join(__dirname, './src/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,html}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
