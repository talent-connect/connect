import { Action } from 'redux'
import { RedProfile } from '../../types/RedProfile'

export interface ProfilesState {
  oneProfile?: RedProfile
  loading: boolean
}

export enum ProfilesActionType {
  PROFILES_FETCH_ONE_START = 'PROFILES_FETCH_ONE_START',
  PROFILES_FETCH_ONE_SUCCESS = 'PROFILES_FETCH_ONE_SUCCESS',
  PROFILES_FETCH_ONE_ERROR = 'PROFILES_FETCH_ONE_ERROR'
}
export interface ProfilesFetchOneStartAction extends Action {
  type: ProfilesActionType.PROFILES_FETCH_ONE_START
  payload: RedProfile['id']
}
export interface ProfilesFetchOneSuccessAction extends Action {
  type: ProfilesActionType.PROFILES_FETCH_ONE_SUCCESS
  payload: RedProfile
}
export interface ProfilesFetchOneErrorAction extends Action {
  type: ProfilesActionType.PROFILES_FETCH_ONE_ERROR
  payload: Error
}

export type ProfilesActions =
  | ProfilesFetchOneStartAction
  | ProfilesFetchOneSuccessAction
  | ProfilesFetchOneErrorAction;
