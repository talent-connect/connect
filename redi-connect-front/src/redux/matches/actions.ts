import {
  MatchesFetchStartAction,
  MatchesActionType,
  MatchesFetchSuccessAction,
  MatchesFetchErrorAction,
  MatchesAcceptMentorshipStartAction,
  MatchesAcceptMentorshipSuccessAction,
  MatchesAcceptMentorshipErrorAction
} from './types'
import { RedMatch } from '../../types/RedMatch'

export const matchesFetchStart = (): MatchesFetchStartAction => ({
  type: MatchesActionType.MATCHES_FETCH_START
})

export const matchesFetchSuccess = (
  matches: RedMatch[]
): MatchesFetchSuccessAction => ({
  type: MatchesActionType.MATCHES_FETCH_SUCCESS,
  payload: matches
})

export const matchesFetchError = (error: Error): MatchesFetchErrorAction => ({
  type: MatchesActionType.MATCHES_FETCH_ERROR,
  payload: error
})

export const matchesAcceptMentorshipStart = (
  redMatchId: string,
  mentorReplyMessageOnAccept: string
): MatchesAcceptMentorshipStartAction => ({
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_START,
  payload: {
    redMatchId,
    mentorReplyMessageOnAccept
  }
})

export const matchesAcceptMentorshipSuccess = (
  matches: RedMatch[]
): MatchesAcceptMentorshipSuccessAction => ({
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_SUCCESS,
  payload: matches
})

export const matchesAcceptMentorshipError = (
  error: Error
): MatchesAcceptMentorshipErrorAction => ({
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_ERROR,
  payload: error
})
