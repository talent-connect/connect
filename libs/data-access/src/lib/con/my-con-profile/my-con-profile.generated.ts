import * as Types from '@talent-connect/data-access';

import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from 'react-query';
import { fetcher } from '@talent-connect/data-access';
export type LoadMyProfileQueryVariables = Types.Exact<{
  loopbackUserId: Types.Scalars['ID'];
}>;


export type LoadMyProfileQuery = { __typename?: 'Query', conProfile: { __typename?: 'ConProfile', ifUserMentee_activeMentorshipMatches: number, ifUserMentor_activeMentorshipMatches: number, profileStatus: Types.ConnectProfileStatus, birthDate?: any | null, email: string, expectations?: string | null, firstName: string, gender?: Types.Gender | null, githubProfileUrl?: string | null, id: string, languages?: Array<Types.ConnectProfileLanguage> | null, lastName: string, linkedInProfileUrl?: string | null, loopbackUserId: string, mentee_currentlyEnrolledInCourse: Types.RediCourse, mentee_highestEducationLevel?: Types.EducationLevel | null, mentee_occupationCategoryId?: Types.OccupationCategory | null, mentee_occupationJob_placeOfEmployment?: string | null, mentee_occupationJob_position?: string | null, mentee_occupationLookingForJob_what?: string | null, mentee_occupationOther_description?: string | null, mentee_occupationStudent_studyName?: string | null, mentee_occupationStudent_studyPlace?: string | null, mentor_occupation?: string | null, mentor_workPlace?: string | null, optOutOfMenteesFromOtherRediLocation: boolean, personalDescription?: string | null, profileAvatarImageS3Key?: string | null, rediLocation: Types.RediLocation, slackUsername?: string | null, telephoneNumber?: string | null, userActivatedAt?: any | null, userType: Types.UserType, categories: Array<Types.MentoringTopic>, menteeCountCapacity?: number | null } };

export type PatchMyProfileMutationVariables = Types.Exact<{
  input: Types.UpdateConProfileInput;
}>;


export type PatchMyProfileMutation = { __typename?: 'Mutation', patchConProfile: { __typename?: 'ConProfile', profileStatus: Types.ConnectProfileStatus, birthDate?: any | null, email: string, expectations?: string | null, firstName: string, gender?: Types.Gender | null, githubProfileUrl?: string | null, id: string, languages?: Array<Types.ConnectProfileLanguage> | null, lastName: string, linkedInProfileUrl?: string | null, loopbackUserId: string, mentee_currentlyEnrolledInCourse: Types.RediCourse, mentee_highestEducationLevel?: Types.EducationLevel | null, mentee_occupationCategoryId?: Types.OccupationCategory | null, mentee_occupationJob_placeOfEmployment?: string | null, mentee_occupationJob_position?: string | null, mentee_occupationLookingForJob_what?: string | null, mentee_occupationOther_description?: string | null, mentee_occupationStudent_studyName?: string | null, mentee_occupationStudent_studyPlace?: string | null, mentor_occupation?: string | null, mentor_workPlace?: string | null, optOutOfMenteesFromOtherRediLocation: boolean, personalDescription?: string | null, profileAvatarImageS3Key?: string | null, rediLocation: Types.RediLocation, slackUsername?: string | null, telephoneNumber?: string | null, userActivatedAt?: any | null, userType: Types.UserType, categories: Array<Types.MentoringTopic>, menteeCountCapacity?: number | null } };

export type FieldsFragment = { __typename?: 'ConProfile', profileStatus: Types.ConnectProfileStatus, birthDate?: any | null, email: string, expectations?: string | null, firstName: string, gender?: Types.Gender | null, githubProfileUrl?: string | null, id: string, languages?: Array<Types.ConnectProfileLanguage> | null, lastName: string, linkedInProfileUrl?: string | null, loopbackUserId: string, mentee_currentlyEnrolledInCourse: Types.RediCourse, mentee_highestEducationLevel?: Types.EducationLevel | null, mentee_occupationCategoryId?: Types.OccupationCategory | null, mentee_occupationJob_placeOfEmployment?: string | null, mentee_occupationJob_position?: string | null, mentee_occupationLookingForJob_what?: string | null, mentee_occupationOther_description?: string | null, mentee_occupationStudent_studyName?: string | null, mentee_occupationStudent_studyPlace?: string | null, mentor_occupation?: string | null, mentor_workPlace?: string | null, optOutOfMenteesFromOtherRediLocation: boolean, personalDescription?: string | null, profileAvatarImageS3Key?: string | null, rediLocation: Types.RediLocation, slackUsername?: string | null, telephoneNumber?: string | null, userActivatedAt?: any | null, userType: Types.UserType, categories: Array<Types.MentoringTopic>, menteeCountCapacity?: number | null };

export const FieldsFragmentDoc = `
    fragment fields on ConProfile {
  profileStatus
  birthDate
  email
  expectations
  firstName
  gender
  githubProfileUrl
  id
  languages
  lastName
  linkedInProfileUrl
  loopbackUserId
  mentee_currentlyEnrolledInCourse
  mentee_highestEducationLevel
  mentee_occupationCategoryId
  mentee_occupationJob_placeOfEmployment
  mentee_occupationJob_position
  mentee_occupationLookingForJob_what
  mentee_occupationOther_description
  mentee_occupationStudent_studyName
  mentee_occupationStudent_studyPlace
  mentor_occupation
  mentor_workPlace
  optOutOfMenteesFromOtherRediLocation
  personalDescription
  profileAvatarImageS3Key
  rediLocation
  slackUsername
  telephoneNumber
  userActivatedAt
  userType
  categories
  menteeCountCapacity
}
    `;
export const LoadMyProfileDocument = `
    query loadMyProfile($loopbackUserId: ID!) {
  conProfile(loopbackUserId: $loopbackUserId) {
    ...fields
    ifUserMentee_activeMentorshipMatches
    ifUserMentor_activeMentorshipMatches
  }
}
    ${FieldsFragmentDoc}`;
export const useLoadMyProfileQuery = <
      TData = LoadMyProfileQuery,
      TError = unknown
    >(
      variables: LoadMyProfileQueryVariables,
      options?: UseQueryOptions<LoadMyProfileQuery, TError, TData>
    ) =>
    useQuery<LoadMyProfileQuery, TError, TData>(
      ['loadMyProfile', variables],
      fetcher<LoadMyProfileQuery, LoadMyProfileQueryVariables>(LoadMyProfileDocument, variables),
      options
    );

useLoadMyProfileQuery.getKey = (variables: LoadMyProfileQueryVariables) => ['loadMyProfile', variables];
;

export const PatchMyProfileDocument = `
    mutation patchMyProfile($input: UpdateConProfileInput!) {
  patchConProfile(patchConProfileInput: $input) {
    ...fields
  }
}
    ${FieldsFragmentDoc}`;
export const usePatchMyProfileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<PatchMyProfileMutation, TError, PatchMyProfileMutationVariables, TContext>) =>
    useMutation<PatchMyProfileMutation, TError, PatchMyProfileMutationVariables, TContext>(
      ['patchMyProfile'],
      (variables?: PatchMyProfileMutationVariables) => fetcher<PatchMyProfileMutation, PatchMyProfileMutationVariables>(PatchMyProfileDocument, variables)(),
      options
    );