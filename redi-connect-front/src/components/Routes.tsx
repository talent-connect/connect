/* eslint-disable react/no-array-index-key */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { allRoutes } from "../routes/index";

import { PrivateRoute } from "./PrivateRoute";

export const Routes = () => (
  <div className="routes">
    <Switch>
      {allRoutes.map(({ requiresLoggedIn, exact, path, component }, i) =>
        requiresLoggedIn ? (
          <PrivateRoute
            exact={exact}
            path={path}
            component={component}
            key={i}
          />
        ) : (
          <Route exact={exact} path={path} component={component} key={i} />
        )
      )}
      <Redirect to="/front/home" />
    </Switch>
  </div>
);
