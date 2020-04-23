import { MatchesState, MatchesActions, MatchesActionType } from './types'

const initialState: MatchesState = {
  matches: [],
  loading: false
}

export const matchesReducer = (
  state: MatchesState = initialState,
  action: MatchesActions
): MatchesState => {
  switch (action.type) {
    case MatchesActionType.MATCHES_FETCH_START:
    case MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_START:
      return { ...state, loading: true }

    case MatchesActionType.MATCHES_FETCH_SUCCESS:
      return { ...state, matches: action.payload, loading: false }
    case MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_SUCCESS:
      return { ...state, loading: false }

    case MatchesActionType.MATCHES_FETCH_ERROR:
    case MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_ERROR:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
