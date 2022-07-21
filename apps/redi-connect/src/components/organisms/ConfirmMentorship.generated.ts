// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllConMentorshipMatchFieldsFragmentDoc } from '../../../../../libs/data-access/src/lib/con/mentorship-matches/con-mentorship-match.fragment.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type ConfirmMentorshipMatchPropFragment = { __typename?: 'ConMentorshipMatch', applicationText?: string | null, createdAt: any, expectationText?: string | null, hasMenteeDismissedMentorshipApplicationAcceptedNotification?: boolean | null, id: string, ifDeclinedByMentor_chosenReasonForDecline?: string | null, ifDeclinedByMentor_dateTime?: any | null, ifDeclinedByMentor_ifReasonIsOther_freeText?: string | null, ifDeclinedByMentor_optionalMessageToMentee?: string | null, matchMadeActiveOn?: any | null, menteeId: string, mentorId: string, mentorMessageOnComplete?: string | null, mentorReplyMessageOnAccept?: string | null, status: Types.MentorshipMatchStatus, updatedAt: any, mentee: { __typename?: 'ConProfile', firstName: string } };

export type AcceptMentorshipMutationVariables = Types.Exact<{
  input: Types.ConMentorshipMatchesAcceptMentorshipInputDto;
}>;


export type AcceptMentorshipMutation = { __typename?: 'Mutation', conMentorshipMatchesAcceptMentorship: { __typename?: 'ConMentorshipMatchesAcceptMentorshipOutputDto', ok: boolean } };

export const ConfirmMentorshipMatchPropFragmentDoc = `
    fragment ConfirmMentorshipMatchProp on ConMentorshipMatch {
  ...AllConMentorshipMatchFields
  mentee {
    firstName
  }
}
    ${AllConMentorshipMatchFieldsFragmentDoc}`;
export const AcceptMentorshipDocument = `
    mutation acceptMentorship($input: ConMentorshipMatchesAcceptMentorshipInputDto!) {
  conMentorshipMatchesAcceptMentorship(input: $input) {
    ok
  }
}
    `;
export const useAcceptMentorshipMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<AcceptMentorshipMutation, TError, AcceptMentorshipMutationVariables, TContext>) =>
    useMutation<AcceptMentorshipMutation, TError, AcceptMentorshipMutationVariables, TContext>(
      ['acceptMentorship'],
      (variables?: AcceptMentorshipMutationVariables) => fetcher<AcceptMentorshipMutation, AcceptMentorshipMutationVariables>(AcceptMentorshipDocument, variables)(),
      options
    );