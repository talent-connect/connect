import { ActionsObservable, ofType } from "redux-observable";
import { concat, from, of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { API_URL } from "../../config/config";
import { http } from "../../services/http/http";
import { profilesFetchOneStart } from "../profiles/actions";
import { profileFetchStart } from "../user/actions";
import {
  matchesAcceptMentorshipSuccess,
  matchesFetchStart,
  matchesFetchSuccess
} from "./actions";
import {
  MatchesAcceptMentorshipStartAction,
  MatchesActions,
  MatchesActionType
} from "./types";

const fetchFilter = {
  include: ["mentee", "mentor"]
};

export const matchesFetchEpic = (action$: ActionsObservable<MatchesActions>) =>
  action$.pipe(
    ofType(MatchesActionType.MATCHES_FETCH_START),
    switchMap(() =>
      http(`${API_URL}/redMatches?filter=${JSON.stringify(fetchFilter)}`)
    ),
    map(resp => resp.data),
    map(matchesFetchSuccess)
  );

export const matchesAcceptMentorshipEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_START),
    switchMap(action => {
      const request = from(
        http(`${API_URL}/redMatches/acceptMentorship`, {
          method: "post",
          data: {
            redMatchId: (action as MatchesAcceptMentorshipStartAction).payload
              .redMatchId
          }
        })
      ).pipe(
        map(resp => resp.data),
        map(matchesAcceptMentorshipSuccess)
      );

      return request;
    }),
    switchMap((successAction: any) => {
      return concat(
        of(successAction),
        of(matchesFetchStart()),
        of(profileFetchStart()),
        // This next one is a terrible idea. It is a hard-dependency coming from <Profile>. Use case:
        // A mentor is looking at a mentee's profile page. The mentee in question has applied (via RedMatch)
        // for mentorship. Mentor clicks the <ConnectButton>, setting off a chain of actions and epics
        // in the matches module, where we are now. The profile page must now refresh, since the mentee's match
        // has changed from .status = applied to .status = accepted. To force a refresh of that page, we must
        // trigger a re-fetch of the underlying date used by the page, i.e. rootState.profiles.oneProfile.
        // Ideally, that page should itself have some kind of logic: on(change of RedMatch status) { reFetch() }
        of(profilesFetchOneStart(successAction.payload.menteeId))
      );
    })

    // TODO: fix this
    // catchError((err as Error) => matchesAcceptMentorshipError(err))
  );

export const matchesEpics = {
  matchesFetchEpic,
  matchesAcceptMentorshipEpic
};
