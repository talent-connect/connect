import * as Sentry from '@sentry/react'
import { BrowserOptions } from '@sentry/react'

type AppName = 'tp' | 'con'

export const defaultConfig: BrowserOptions = {
  environment: process.env.NODE_ENV,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: Number(process.env.NX_SENTRY_TRACES_SAMPLE_RATE),
  replaysSessionSampleRate: Number(
    process.env.NX_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
  ),
  replaysOnErrorSampleRate: 1.0,
}

export function initSentry(appName: AppName, config = defaultConfig) {
  const dsn = {
    con: process.env.NX_CON_SENTRY_DSN,
    tp: process.env.NX_TP_SENTRY_DSN,
  }[appName]

  if (!dsn) throw new Error('DSN is undefined')

  Sentry.init({
    dsn,
    ...defaultConfig,
    ...config,
  })
}
