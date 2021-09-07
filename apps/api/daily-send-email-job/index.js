const { DateTime } = require('luxon')
const app = require('../server/server.js')

const { RedProfile } = app.models

// I'll be triggered once a day by Autocode contacting
// my endpoint.
module.exports = function sendAllJobs() {
  const now = DateTime.now()
}
