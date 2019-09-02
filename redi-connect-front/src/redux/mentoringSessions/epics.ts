import { ActionsObservable, ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { from, concat, of } from 'rxjs';
import { API_URL } from '../../config/config';
import { http } from '../../services/http/http';
import {
  mentoringSessionsCreateSuccess,
  mentoringSessionsFetchSuccess,
  mentoringSessionsFetchStart
} from './actions';
import {
  MentoringSessionsActions,
  MentoringSessionsActionType
} from './types';
import { profileFetchStart } from '../user/actions';
import { profilesFetchOneStart } from '../profiles/actions';

const fetchFilter = {
  include: ['mentee', 'mentor'],
};

export const mentoringSessionsFetchEpic = (
  action$: ActionsObservable<MentoringSessionsActions>
) =>
  action$.pipe(
    ofType(MentoringSessionsActionType.MENTORING_SESSIONS_FETCH_START),
    switchMap(() =>
      http(
        `${API_URL}/redMentoringSessions?filter=${JSON.stringify(fetchFilter)}`
      )
    ),
    map(resp => resp.data),
    map(mentoringSessionsFetchSuccess)
  );

export const mentoringSessionsCreateEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(MentoringSessionsActionType.MENTORING_SESSIONS_CREATE_START),
    switchMap(action => {
      const request = from(
        http(`${API_URL}/redMentoringSessions`, {
          method: 'post',
          data: action.payload,
        })
      ).pipe(
        map(resp => resp.data),
        map(mentoringSessionsCreateSuccess)
      );

      return request;
    }),
    switchMap((successAction: any) => {
      return concat(
        of(successAction),
        of(mentoringSessionsFetchStart()),
        of(profileFetchStart()),
        // This one is a terrible idea for the same reason explained in
        // matches/epics.ts
        of(profilesFetchOneStart(successAction.payload.menteeId)),
      );
    })

    // TODO: fix this
    // catchError((err as Error) => mentoringSessionsCreateError(err))
  );

export const mentoringSessionsEpics = {
  mentoringSessionsFetchEpic,
  mentoringSessionsCreateEpic,
};
