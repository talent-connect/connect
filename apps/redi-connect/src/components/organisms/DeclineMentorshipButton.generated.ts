// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

import { AllConMentorshipMatchFieldsFragmentDoc } from '../../../../../libs/data-access/src/lib/connect/mentorship-matches/con-mentorship-match.fragment.generated';
import { useMutation, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type DeclineMentorshipButtonMatchPropFragment = { __typename?: 'ConMentorshipMatch', applicationText?: string | null, createdAt: any, expectationText?: string | null, hasMenteeDismissedMentorshipApplicationAcceptedNotification?: boolean | null, id: string, ifDeclinedByMentor_chosenReasonForDecline?: string | null, ifDeclinedByMentor_dateTime?: any | null, ifDeclinedByMentor_ifReasonIsOther_freeText?: string | null, ifDeclinedByMentor_optionalMessageToMentee?: string | null, matchMadeActiveOn?: any | null, menteeId: string, mentorId: string, mentorMessageOnComplete?: string | null, mentorReplyMessageOnAccept?: string | null, status: Types.MentorshipMatchStatus, updatedAt: any, mentee: { __typename?: 'ConProfile', firstName: string } };

export type DeclineMentorshipMutationVariables = Types.Exact<{
  input: Types.ConMentorshipMatchesDeclineMentorshipInputDto;
}>;


export type DeclineMentorshipMutation = { __typename?: 'Mutation', conMentorshipMatchesDeclineMentorship: { __typename?: 'ConMentorshipMatchesDeclineMentorshipOutputDto', ok: boolean } };

export const DeclineMentorshipButtonMatchPropFragmentDoc = `
    fragment DeclineMentorshipButtonMatchProp on ConMentorshipMatch {
  ...AllConMentorshipMatchFields
  mentee {
    firstName
  }
}
    ${AllConMentorshipMatchFieldsFragmentDoc}`;
export const DeclineMentorshipDocument = `
    mutation declineMentorship($input: ConMentorshipMatchesDeclineMentorshipInputDto!) {
  conMentorshipMatchesDeclineMentorship(input: $input) {
    ok
  }
}
    `;
export const useDeclineMentorshipMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeclineMentorshipMutation, TError, DeclineMentorshipMutationVariables, TContext>) =>
    useMutation<DeclineMentorshipMutation, TError, DeclineMentorshipMutationVariables, TContext>(
      ['declineMentorship'],
      (variables?: DeclineMentorshipMutationVariables) => fetcher<DeclineMentorshipMutation, DeclineMentorshipMutationVariables>(DeclineMentorshipDocument, variables)(),
      options
    );