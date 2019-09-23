import React from "react";
import axios from "axios";
import has from "lodash/has";
import includes from "lodash/includes";

import { history } from "../history/history";
import { getAccessToken, isLoggedIn, purgeAllSessionData } from "../auth/auth";

export const nonLoggedInHttp = axios.create();

export const http = axios.create();

http.interceptors.request.use(
  function(config) {
    const isAuthorizationHeaderSet = has(config, "headers.Authorization");
    const _isLoggedIn = isLoggedIn();
    if (_isLoggedIn && !isAuthorizationHeaderSet) {
      const accessToken = getAccessToken();
      config.headers.Authorization = `${accessToken.id}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  resp => resp,
  err => {
    // Code in this function adapted from: https://github.com/axios/axios#handling-errors
    if (err.response) {
      err.userMessage = err.response.data.error.message;
    } else if (err.request) {
      err.userMessage = "Please check your internet connection.";
    } else {
      err.userMessage = "An error occurred; please try again.";
    }
    console.log(err);

    if (includes([401, 403], err.response.status)) {
      purgeAllSessionData();
      history.push(
        `/front/login?goto=${encodeURIComponent(history.location.pathname)}`
      );
    } else {
      history.push("/error/4xx");
    }
  }
);

export const HttpContext = React.createContext(http);

/*
export function with$Http(Component) {
  return function ComponentWith$Http(props) {
    return (
      <$HttpContext.Consumer>
        {_$http => <Component {...props} $http={_$http} /> }
      </$HttpContext.Consumer>
    );
  };
}
*/
