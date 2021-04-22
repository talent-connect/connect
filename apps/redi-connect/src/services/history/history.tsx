import React from 'react'

import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { store } from '../../redux/store'
import { UserActionType } from '../../redux/user/types'
import { isLoggedIn } from '../auth/auth'

const history = createBrowserHistory()

// FIRST KEEP THIS COMMENTED OUT AS A REMINDER
// THE PLAN IS TO GET RID OD THIS FILE COMPLETLY

// TODO: replace this with something less ludicrous
// history.listen(() => {
//   if (isLoggedIn()) {
//     store.dispatch({ type: UserActionType.USER_PROFILE_FETCH_START })
//   }
// })

export const HistoryContext = React.createContext(history)

export { history, Router }

/*
export function withHistory(Component: React.ReactNode) {
  return function ComponentWithHistory(props: any) {
    return (
      <HistoryContext.Consumer>
        {_ => <Component {...props} history={_history} /> }
      </HistoryContext.Consumer>
    );
  };
}
*/
