import { RedMentoringSession } from '../../types/RedMentoringSession'
import {
  MentoringSessionsActionType,
  MentoringSessionsClearAsyncResultAction,
  MentoringSessionsCreateErrorAction,
  MentoringSessionsCreateStartAction,
  MentoringSessionsCreateSuccessAction,
  MentoringSessionsFetchErrorAction,
  MentoringSessionsFetchStartAction,
  MentoringSessionsFetchSuccessAction
} from './types'

export const mentoringSessionsFetchStart = (): MentoringSessionsFetchStartAction => ({
  type: MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_START
})

export const mentoringSessionsFetchSuccess = (
  matches: RedMentoringSession[]
): MentoringSessionsFetchSuccessAction => ({
  type: MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_SUCCESS,
  payload: matches
})

export const mentoringSessionsFetchError = (
  error: Error
): MentoringSessionsFetchErrorAction => ({
  type: MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_ERROR,
  payload: error
})

export const mentoringSessionsCreateStart = (
  redMentoringSession: RedMentoringSession
): MentoringSessionsCreateStartAction => ({
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_START,
  payload: redMentoringSession
})

export const mentoringSessionsCreateSuccess = (
  redMentoringSession: RedMentoringSession
): MentoringSessionsCreateSuccessAction => ({
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_SUCCESS,
  payload: redMentoringSession
})

export const mentoringSessionsCreateError = (
  error: Error
): MentoringSessionsCreateErrorAction => ({
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_ERROR,
  payload: error
})

export const mentoringSessionsClearAsyncResult = (): MentoringSessionsClearAsyncResultAction => ({
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CLEAR_ASYNC_RESULT
})
