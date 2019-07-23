import { ActionsObservable, ofType } from 'redux-observable';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { from, concat, of } from 'rxjs';
import { API_URL } from '../../config/config';
import { http } from '../../services/http/http';
import { profilesFetchOneSuccess, profilesFetchOneStart } from './actions';
import { ProfilesActions, ProfilesActionType } from './types';

export const profilesFetchOneEpic = (
  action$: ActionsObservable<ProfilesActions>
) =>
  action$.pipe(
    ofType(ProfilesActionType.PROFILES_FETCH_ONE_START),
    switchMap(({ payload }) => http(`${API_URL}/redProfiles/${payload}`)),
    map(resp => resp.data),
    map(profilesFetchOneSuccess)
  );

export const profilesEpics = {
  profilesFetchOneEpic,
};
