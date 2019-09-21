import { UserState, UserActions, UserActionType } from "./types";

const redProfileJsonStr = localStorage.getItem("redProfile");
const accessTokenJsonStr = localStorage.getItem("accessToken");
let initialState: UserState = { loading: false, saveResult: "notSubmitted" };
if (redProfileJsonStr && accessTokenJsonStr) {
  initialState = {
    profile: JSON.parse(redProfileJsonStr),
    accessToken: JSON.parse(accessTokenJsonStr),
    loading: false,
    saveResult: "notSubmitted"
  };
}

export const userReducer = (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case UserActionType.USER_PROFILE_FETCH_START:
      return { ...state, loading: true };
    case UserActionType.USER_PROFILE_FETCH_SUCCESS:
      return { ...state, profile: action.payload, loading: false };
    case UserActionType.USER_PROFILE_FETCH_ERROR:
      return { ...state, loading: false };

    case UserActionType.USER_PROFILE_SAVE_START:
      return { ...state, saveResult: "submitting" };
    case UserActionType.USER_PROFILE_SAVE_SUCCESS:
      return { ...state, saveResult: "success", profile: action.payload };
    case UserActionType.USER_PROFILE_SAVE_ERROR:
      return { ...state, saveResult: "error" };

    default:
      return state;
  }
};
