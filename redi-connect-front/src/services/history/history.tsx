import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { store } from "../../redux/store";
import { UserActionType } from "../../redux/user/types";
import { isLoggedIn } from "../auth/auth";

const history = createBrowserHistory();

// TODO: replace this with something less ludicrous
history.listen(() => {
  if (isLoggedIn()) {
    store.dispatch({ type: UserActionType.USER_PROFILE_FETCH_START });
  }
});

export { history, Router };
