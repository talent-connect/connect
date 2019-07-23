import {
  ProfilesFetchOneStartAction,
  ProfilesActionType,
  ProfilesFetchOneSuccessAction,
  ProfilesFetchOneErrorAction,
} from './types';
import { RedProfile } from '../../types/RedProfile';

// TODO: in this action, should the redProfileId be the payload, or should
// it be wrapped in an object as such: { redProfileId: redProfileId } ??
export const profilesFetchOneStart = (
  redProfileId: RedProfile['id']
): ProfilesFetchOneStartAction => ({
  type: ProfilesActionType.PROFILES_FETCH_ONE_START,
  payload: redProfileId
});

export const profilesFetchOneSuccess = (
  profile: RedProfile
): ProfilesFetchOneSuccessAction => ({
  type: ProfilesActionType.PROFILES_FETCH_ONE_SUCCESS,
  payload: profile,
});

export const profilesFetchError = (
  error: Error
): ProfilesFetchOneErrorAction => ({
  type: ProfilesActionType.PROFILES_FETCH_ONE_ERROR,
  payload: error,
});
