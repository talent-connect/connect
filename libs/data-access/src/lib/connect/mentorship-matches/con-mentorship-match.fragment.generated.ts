// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllConMentorshipMatchFieldsFragment = { __typename?: 'ConMentorshipMatch', applicationText?: string | null, createdAt: any, expectationText?: string | null, hasMenteeDismissedMentorshipApplicationAcceptedNotification?: boolean | null, id: string, ifDeclinedByMentor_chosenReasonForDecline?: string | null, ifDeclinedByMentor_dateTime?: any | null, ifDeclinedByMentor_ifReasonIsOther_freeText?: string | null, ifDeclinedByMentor_optionalMessageToMentee?: string | null, matchMadeActiveOn?: any | null, menteeId: string, mentorId: string, mentorMessageOnComplete?: string | null, mentorReplyMessageOnAccept?: string | null, status: Types.MentorshipMatchStatus, updatedAt: any };

export const AllConMentorshipMatchFieldsFragmentDoc = `
    fragment AllConMentorshipMatchFields on ConMentorshipMatch {
  applicationText
  createdAt
  expectationText
  hasMenteeDismissedMentorshipApplicationAcceptedNotification
  id
  ifDeclinedByMentor_chosenReasonForDecline
  ifDeclinedByMentor_dateTime
  ifDeclinedByMentor_ifReasonIsOther_freeText
  ifDeclinedByMentor_optionalMessageToMentee
  matchMadeActiveOn
  menteeId
  mentorId
  mentorMessageOnComplete
  mentorReplyMessageOnAccept
  status
  updatedAt
}
    `;