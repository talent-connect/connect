const path = require('path')
const { createLogger, transports, format } = require('winston')
const { combine, timestamp, prettyPrint } = format

require('winston-daily-rotate-file')

const dailyReminderEmailLogFileTransport = new transports.DailyRotateFile({
  dirname: path.resolve(__dirname, '..', '..', '..', '..'),
  filename: 'daily-reminder-email-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  utc: true,
})

module.exports = {
  reminderEmailLogger: createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [new transports.Console(), dailyReminderEmailLogFileTransport],
  }),
}
