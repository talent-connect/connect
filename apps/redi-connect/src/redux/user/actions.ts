import { RedProfile } from '../../types/RedProfile'
import {
  ProfileFetchStartAction,
  ProfileFetchSuccessAction,
  UserActionType,
  ProfileFetchErrorAction,
  ProfileSaveStartAction,
  ProfileSaveSuccessAction,
  ProfileSaveErrorAction,
} from './types'

export const profileFetchStart = (): ProfileFetchStartAction => ({
  type: UserActionType.USER_PROFILE_FETCH_START,
})

export const profileFetchSuccess = (
  profile: RedProfile
): ProfileFetchSuccessAction => ({
  type: UserActionType.USER_PROFILE_FETCH_SUCCESS,
  payload: profile,
})

export const profileFetchError = (error: Error): ProfileFetchErrorAction => ({
  type: UserActionType.USER_PROFILE_FETCH_ERROR,
  payload: error,
})

export const profileSaveStart = (
  redProfile: Partial<RedProfile>
): ProfileSaveStartAction => ({
  type: UserActionType.USER_PROFILE_SAVE_START,
  payload: redProfile,
})
export const profileSaveSuccess = (
  profile: RedProfile
): ProfileSaveSuccessAction => ({
  type: UserActionType.USER_PROFILE_SAVE_SUCCESS,
  payload: profile,
})

export const profileSaveError = (error: Error): ProfileSaveErrorAction => ({
  type: UserActionType.USER_PROFILE_SAVE_ERROR,
  payload: error,
})
