import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { isLoggedIn } from './auth/auth';

interface CachedRequestOptions {
  cacheKey: string
  dontShowErrorMessage: boolean
  showErrorMessage: ({message}: {message: string}) => void 
}

export function cachedGet (url: string, config: AxiosRequestConfig, { cacheKey = url, isOnlineFirst = false, dontShowErrorMessage = false, showErrorMessage } = { cacheKey: url, isOnlineFirst: false, dontShowErrorMessage: false, showErrorMessage: () => {}}): Promise<AxiosResponse> {
  // Get from cache and resolve if the access token is valid for best online performance as well as offline / lie-fi support, but make the call to the network anyway to update the cache for next visit. if there's nothing in the cache, fallback to the network
  if (isOnlineFirst) {
    // Online first approach
    // Get from network then fallback to cache
    return onlineFirstApproach(url, config, {cacheKey, dontShowErrorMessage, showErrorMessage})
  } else {
    // Offline first approach
    // Get from cache first, make the request anyway to update the cache then fallback to network
    return offlineFirstApproach(url, config, {cacheKey, dontShowErrorMessage, showErrorMessage})
  }
}

function offlineFirstApproach(url: string, config: AxiosRequestConfig, {cacheKey, dontShowErrorMessage, showErrorMessage}: CachedRequestOptions ): Promise<AxiosResponse> {
  return Promise.race([
    Promise.all([getFromCache(url, config, cacheKey), isTokenValid()]).then(([p1Res, p2Res]) => p1Res),
    getFromNetworkAndSaveToCache(url, config, cacheKey)
  ])
    .catch(error => {
      console.warn('error', error)
      if (!error.response) { // Network error or Results are not in cache
        if (error.message !== 'No cached response found' && error.message !== 'no token found' && error.message !== 'token expired') {
          // Network error

          if (!dontShowErrorMessage) {
            showErrorMessage({ message: `Couldn't complete request, please try again later` })
          }
        }
        return getFromNetworkAndSaveToCache(url, config)
      } else {
      // let the consumer catch and handle the error
        throw error
      }
    })
}

function onlineFirstApproach(url: string, config: AxiosRequestConfig, {cacheKey, dontShowErrorMessage, showErrorMessage}: CachedRequestOptions): Promise<AxiosResponse> {
  return getFromNetworkAndSaveToCache(url, config, cacheKey)
      .catch(error => {
        if (!error.response) {
          // Network error
          if (!dontShowErrorMessage && error.message !== 'No cached response found' && error.message !== 'no token found' && error.message !== 'token expired') {
            showErrorMessage({ message: `Couldn't complete request, please try again later` })
          }
          return getFromCache(url, config, cacheKey)
        } else {
          throw error
        }
      })
}

function isTokenValid() {
  new Promise((resolve, reject) => {
    if(isLoggedIn()) {
      resolve(true)
    } else {
      reject(new Error('no token found'))
    }
  })
}

function getFromCache (url: string, config: AxiosRequestConfig, cacheKey: string = url): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const cachedResponse = window.localStorage.getItem(cacheKey)
    if (cachedResponse) {
      const response = JSON.parse(cachedResponse)
      resolve(response)
    } else {
      reject(new Error('No cached response found'))
    }
  })
}

function getFromNetworkAndSaveToCache (url: string, config: AxiosRequestConfig, cacheKey = url): Promise<AxiosResponse> {
  return axios.get(url, { ...config, timeout: 40000 })
    .then(response => {
      window.localStorage.setItem(cacheKey, JSON.stringify(response))
      return response
    })
}