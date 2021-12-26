import { FC } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { allRoutes } from '../routes/index'
import { PrivateRoute } from './PrivateRoute'

export const Routes: FC = () => (
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
)
