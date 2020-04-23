import { RedProfile } from '../../types/RedProfile'
import { Action } from 'redux'
import { AccessToken } from '../../types/AccessToken'
import { FormSubmitResult } from '../../types/FormSubmitResult'

export interface UserState {
  profile?: RedProfile
  accessToken?: AccessToken
  loading: boolean
  saveResult: FormSubmitResult
}

export enum UserActionType {
  USER_PROFILE_FETCH_START = 'USER_PROFILE_FETCH_START',
  USER_PROFILE_FETCH_SUCCESS = 'USER_PROFILE_FETCH_SUCCESS',
  USER_PROFILE_FETCH_ERROR = 'USER_PROFILE_FETCH_ERROR',
  USER_PROFILE_SAVE_START = 'USER_PROFILE_SAVE_START',
  USER_PROFILE_SAVE_SUCCESS = 'USER_PROFILE_SAVE_SUCCESS',
  USER_PROFILE_SAVE_ERROR = 'USER_PROFILE_SAVE_ERROR'
}
export interface ProfileFetchStartAction extends Action {
  type: UserActionType.USER_PROFILE_FETCH_START
}
export interface ProfileFetchSuccessAction extends Action {
  type: UserActionType.USER_PROFILE_FETCH_SUCCESS
  payload: RedProfile
}
export interface ProfileFetchErrorAction extends Action {
  type: UserActionType.USER_PROFILE_FETCH_ERROR
  payload: Error
}

export interface ProfileSaveStartAction extends Action {
  type: UserActionType.USER_PROFILE_SAVE_START
  payload: RedProfile
}
export interface ProfileSaveSuccessAction extends Action {
  type: UserActionType.USER_PROFILE_SAVE_SUCCESS
  payload: RedProfile
}
export interface ProfileSaveErrorAction extends Action {
  type: UserActionType.USER_PROFILE_SAVE_ERROR
  payload: Error
}

export type UserActions =
  | ProfileFetchStartAction
  | ProfileFetchSuccessAction
  | ProfileFetchErrorAction
  | ProfileSaveStartAction
  | ProfileSaveSuccessAction
  | ProfileSaveErrorAction;
