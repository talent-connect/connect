import { HttpError } from 'react-admin'
import storage from './storage'

interface FetchOptions {
  user?: {
    authenticated: boolean,
    token: string,
  }
  headers?: Headers
  body?: BodyInit
}

const fetchJson = async (url: RequestInfo, options: FetchOptions = {}) => {
  const requestHeaders =
    options.headers || new Headers({ Accept: 'application/json' })
  if (
    !requestHeaders.has('Content-Type') &&
    !(options?.body && options.body instanceof FormData)
  ) {
    requestHeaders.set('Content-Type', 'application/json')
  }
  if (options.user?.authenticated && options.user.token) {
    requestHeaders.set('Authorization', options.user.token)
  }
  const response = await fetch(url, { ...options, headers: requestHeaders })
  const text = await response.text()
  const o = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  }
  const status = o.status
  const statusText = o.statusText
  const headers = o.headers
  const body = o.body
  let json
  
  try {
    json = JSON.parse(body)
  } catch (e) {
    // not json, no big deal
  }
  if (status < 200 || status >= 300) {
    return Promise.reject(
      new HttpError(
        json?.error?.message || statusText,
        status,
        json
      )
    )
  }
  return Promise.resolve({
    status,
    headers,
    body,
    json,
  })
}

export default function (url: RequestInfo, options: FetchOptions = {}) {
  options.user = {
    authenticated: true,
    token: storage.load('lbtoken').id,
  }
  return fetchJson(url, options)
}
