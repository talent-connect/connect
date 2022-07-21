// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllConMentorshipMatchFieldsFragmentDoc } from '../../../../../libs/data-access/src/lib/con/mentorship-matches/con-mentorship-match.fragment.generated';
export type ConfirmMentorshipMatchPropFragment = { __typename?: 'ConMentorshipMatch', applicationText?: string | null, createdAt: any, expectationText?: string | null, hasMenteeDismissedMentorshipApplicationAcceptedNotification?: boolean | null, id: string, ifDeclinedByMentor_chosenReasonForDecline?: string | null, ifDeclinedByMentor_dateTime?: any | null, ifDeclinedByMentor_ifReasonIsOther_freeText?: string | null, ifDeclinedByMentor_optionalMessageToMentee?: string | null, matchMadeActiveOn?: any | null, menteeId: string, mentorId: string, mentorMessageOnComplete?: string | null, mentorReplyMessageOnAccept?: string | null, status: Types.MentorshipMatchStatus, updatedAt: any, mentee: { __typename?: 'ConProfile', firstName: string } };

export const ConfirmMentorshipMatchPropFragmentDoc = `
    fragment ConfirmMentorshipMatchProp on ConMentorshipMatch {
  ...AllConMentorshipMatchFields
  mentee {
    firstName
  }
}
    ${AllConMentorshipMatchFieldsFragmentDoc}`;