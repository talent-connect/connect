import {
  MatchesFetchStartAction,
  MatchesActionType,
  MatchesFetchSuccessAction,
  MatchesFetchErrorAction,
  MatchesAcceptMentorshipStartAction,
  MatchesAcceptMentorshipSuccessAction,
  MatchesAcceptMentorshipErrorAction,
  MatchesMarkAsDismissedStartAction,
  MatchesMarkAsCompleteAction,
  MatchesDeclineMentorshipStartAction,
  MatchesDeclineMentorshipSuccessAction,
  MatchesDeclineMentorshipErrorAction,
} from './types'
import { RedMatch } from '@talent-connect/shared-types'

export const matchesFetchStart = (): MatchesFetchStartAction => ({
  type: MatchesActionType.MATCHES_FETCH_START,
})

export const matchesFetchSuccess = (
  matches: RedMatch[]
): MatchesFetchSuccessAction => ({
  type: MatchesActionType.MATCHES_FETCH_SUCCESS,
  payload: matches,
})

export const matchesFetchError = (error: Error): MatchesFetchErrorAction => ({
  type: MatchesActionType.MATCHES_FETCH_ERROR,
  payload: error,
})

export const matchesAcceptMentorshipStart = (
  redMatchId: string,
  mentorReplyMessageOnAccept: string
): MatchesAcceptMentorshipStartAction => ({
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_START,
  payload: {
    redMatchId,
    mentorReplyMessageOnAccept,
  },
})

export const matchesDeclineMentorshipStart = (
  options: { redMatchId: string } & Pick<
    RedMatch,
    | 'ifDeclinedByMentor_chosenReasonForDecline'
    | 'ifDeclinedByMentor_ifReasonIsOther_freeText'
    | 'ifDeclinedByMentor_optionalMessageToMentee'
  >
): MatchesDeclineMentorshipStartAction => ({
  type: MatchesActionType.MATCHES_DECLINE_MENTORSHIP_START,
  payload: options,
})

export const matchesMarkAsComplete = (
  redMatchId: string,
  mentorMessageOnComplete: string
): MatchesMarkAsCompleteAction => ({
  type: MatchesActionType.MATCHES_MARK_AS_COMPLETED,
  payload: {
    redMatchId,
    mentorMessageOnComplete,
  },
})

export const matchesMarkAsDismissed = (
  redMatchId: string
): MatchesMarkAsDismissedStartAction => ({
  type: MatchesActionType.MATCHES_MARK_AS_DISMISSED_START,
  payload: {
    redMatchId,
  },
})

export const matchesAcceptMentorshipSuccess = (
  matches: RedMatch[]
): MatchesAcceptMentorshipSuccessAction => ({
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_SUCCESS,
  payload: matches,
})

export const matchesAcceptMentorshipError = (
  error: Error
): MatchesAcceptMentorshipErrorAction => ({
  type: MatchesActionType.MATCHES_ACCEPT_MENTORSHIP_ERROR,
  payload: error,
})

export const matchesDeclineMentorshipSuccess = (
  matches: RedMatch[]
): MatchesDeclineMentorshipSuccessAction => ({
  type: MatchesActionType.MATCHES_DECLINE_MENTORSHIP_SUCCESS,
  payload: matches,
})

export const matchesDeclineMentorshipError = (
  error: Error
): MatchesDeclineMentorshipErrorAction => ({
  type: MatchesActionType.MATCHES_DECLINE_MENTORSHIP_ERROR,
  payload: error,
})
