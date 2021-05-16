import { ProfilesState, ProfilesActions, ProfilesActionType } from './types'

const initialState: ProfilesState = {
  oneProfile: undefined,
  loading: false,
}

export const profilesReducer = (
  state: ProfilesState = initialState,
  action: ProfilesActions
): ProfilesState => {
  switch (action.type) {
    case ProfilesActionType.PROFILES_FETCH_ONE_START:
      return { ...state, loading: true }

    case ProfilesActionType.PROFILES_FETCH_ONE_SUCCESS:
      return { ...state, oneProfile: action.payload, loading: false }

    case ProfilesActionType.PROFILES_FETCH_ONE_ERROR:
    default:
      return { ...state }
  }
}
