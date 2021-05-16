import { of } from 'rxjs'
import { map, switchMap, filter } from 'rxjs/operators'
import { ofType, ActionsObservable } from 'redux-observable'
import { UserActions, UserActionType, ProfileSaveStartAction } from './types'
import { fetchSaveRedProfile, saveRedProfile } from '../../services/api/api'
import { getAccessToken, isLoggedIn } from '../../services/auth/auth'

const profileFetchEpic = (action$: ActionsObservable<UserActions>) =>
  action$.pipe(
    ofType(UserActionType.USER_PROFILE_FETCH_START),
    // TODO: better way of doing this? Conditionally only carrying on if user is logged in
    filter(() => isLoggedIn()),
    switchMap(async () => {
      try {
        const res = await fetchSaveRedProfile(getAccessToken())
        return res
      } catch (err) {
        return of(err)
      }
    }),
    map((profile) => ({
      type: UserActionType.USER_PROFILE_FETCH_SUCCESS,
      payload: profile,
    }))
  )

const profileSaveEpic = (action$: ActionsObservable<ProfileSaveStartAction>) =>
  action$.pipe(
    ofType(UserActionType.USER_PROFILE_SAVE_START),
    switchMap((action) => saveRedProfile(action.payload)),
    map((profile) => ({
      type: UserActionType.USER_PROFILE_SAVE_SUCCESS,
      payload: profile,
    }))
  )

export const userEpics = {
  profileFetchEpic,
  profileSaveEpic,
}
