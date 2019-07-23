import { Action } from 'redux';
import { RedMatch } from '../../types/RedMatch';

export interface MatchesState {
  matches: Array<RedMatch>;
  loading: boolean;
}

export enum MatchesActionType {
  MATCHES_FETCH_START = 'MATCHES_FETCH_START',
  MATCHES_FETCH_SUCCESS = 'MATCHES_FETCH_SUCCESS',
  MATCHES_FETCH_ERROR = 'MATCHES_FETCH_ERROR',
  MATCHES_ACCEPT_MENTORSHIP_START = 'MATCHES_ACCEPT_MENTORSHIP_START',
  MATCHES_ACCEPT_MENTORSHIP_SUCCESS = 'MATCHES_ACCEPT_MENTORSHIP_SUCCESS',
  MATCHES_ACCEPT_MENTORSHIP_ERROR = 'MATCHES_ACCEPT_MENTORSHIP_ERROR',
}
export interface MatchesFetchStartAction extends Action {
  type: MatchesActionType.MATCHES_FETCH_START;
}
export interface MatchesFetchSuccessAction extends Action {
  type: MatchesActionType.MATCHES_FETCH_SUCCESS;
  payload: Array<RedMatch>;
}
export interface MatchesFetchErrorAction extends Action {
  type: MatchesActionType.MATCHES_FETCH_ERROR;
  payload: Error;
}
export interface MatchesAcceptMentorshipStartAction extends Action {
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_START;
  payload: {
    redMatchId: string;
  };
}
export interface MatchesAcceptMentorshipSuccessAction extends Action {
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_SUCCESS;
  payload: Array<RedMatch>;
}
export interface MatchesAcceptMentorshipErrorAction extends Action {
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_ERROR;
  payload: Error;
}

export type MatchesActions =
  | MatchesFetchStartAction
  | MatchesFetchSuccessAction
  | MatchesFetchErrorAction
  | MatchesAcceptMentorshipStartAction
  | MatchesAcceptMentorshipSuccessAction
  | MatchesAcceptMentorshipErrorAction;
