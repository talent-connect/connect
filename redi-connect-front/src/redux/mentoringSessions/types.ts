import { Action } from 'redux'
import { RedMentoringSession } from '../../types/RedMentoringSession'
import { FormSubmitResult } from '../../types/FormSubmitResult'

export interface MentoringSessionsState {
  matches: RedMentoringSession[]
  asyncResult: FormSubmitResult
}

export enum MentoringSessionsActionType {
  MENTORING_SESSIONS_FETCH_START = 'MENTORING_SESSIONS_FETCH_START',
  MENTORING_SESSIONS_FETCH_SUCCESS = 'MENTORING_SESSIONS_FETCH_SUCCESS',
  MENTORING_SESSIONS_FETCH_ERROR = 'MENTORING_SESSIONS_FETCH_ERROR',
  MENTORING_SESSIONS_CREATE_START = 'MENTORING_SESSIONS_CREATE_START',
  MENTORING_SESSIONS_CREATE_SUCCESS = 'MENTORING_SESSIONS_CREATE_SUCCESS',
  MENTORING_SESSIONS_CREATE_ERROR = 'MENTORING_SESSIONS_CREATE_ERROR',
  MENTORING_SESSIONS_CLEAR_ASYNC_RESULT = 'MENTORING_SESSIONS_CLEAR_ASYNC_RESULT'
}
export interface MentoringSessionsFetchStartAction extends Action {
  type: MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_START
}
export interface MentoringSessionsFetchSuccessAction extends Action {
  type: MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_SUCCESS
  payload: RedMentoringSession[]
}
export interface MentoringSessionsFetchErrorAction extends Action {
  type: MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_ERROR
  payload: Error
}
export interface MentoringSessionsCreateStartAction extends Action {
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_START
  payload: RedMentoringSession
}
export interface MentoringSessionsCreateSuccessAction extends Action {
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_SUCCESS
  payload: RedMentoringSession
}
export interface MentoringSessionsCreateErrorAction extends Action {
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_ERROR
  payload: Error
}
export interface MentoringSessionsClearAsyncResultAction extends Action {
  type: MentoringSessionsActionType.MENTORING_SESSIONS_CLEAR_ASYNC_RESULT
}

export type MentoringSessionsActions =
  | MentoringSessionsFetchStartAction
  | MentoringSessionsFetchSuccessAction
  | MentoringSessionsFetchErrorAction
  | MentoringSessionsCreateStartAction
  | MentoringSessionsCreateSuccessAction
  | MentoringSessionsCreateErrorAction
  | MentoringSessionsClearAsyncResultAction;
