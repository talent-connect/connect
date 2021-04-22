import {
  MentoringSessionsState,
  MentoringSessionsActions,
  MentoringSessionsActionType,
} from './types'

const initialState: MentoringSessionsState = {
  matches: [],
  asyncResult: 'notSubmitted',
}

export const mentoringSessionsReducer = (
  state: MentoringSessionsState = initialState,
  action: MentoringSessionsActions
): MentoringSessionsState => {
  switch (action.type) {
    case MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_START:
    case MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_START:
      return { ...state, asyncResult: 'submitting' }

    case MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_SUCCESS:
      return { ...state, matches: action.payload, asyncResult: 'success' }
    case MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_SUCCESS:
      return { ...state, asyncResult: 'success' }

    case MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_ERROR:
    case MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_ERROR:
      return { ...state, asyncResult: 'error' }

    case MentoringSessionsActionType.MENTORING_SESSIONS_CLEAR_ASYNC_RESULT:
      return { ...state, asyncResult: 'notSubmitted' }

    default:
      return { ...state }
  }
}
