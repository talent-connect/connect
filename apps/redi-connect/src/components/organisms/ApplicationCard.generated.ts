// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type ApplicationCardApplicationPropFragment = { __typename?: 'ConMentorshipMatch', id: string, createdAt: any, mentorId: string, applicationText?: string | null, expectationText?: string | null, menteeId: string, status: Types.MentorshipMatchStatus, updatedAt: any, mentor: { __typename?: 'ConProfile', id: string, firstName: string, fullName: string, rediLocation: Types.RediLocation, profileAvatarImageS3Key?: string | null }, mentee: { __typename?: 'ConProfile', id: string, firstName: string, fullName: string, rediLocation: Types.RediLocation, profileAvatarImageS3Key?: string | null } };

export const ApplicationCardApplicationPropFragmentDoc = `
    fragment ApplicationCardApplicationProp on ConMentorshipMatch {
  id
  createdAt
  mentorId
  applicationText
  expectationText
  mentor {
    id
    firstName
    fullName
    rediLocation
    profileAvatarImageS3Key
  }
  menteeId
  mentee {
    id
    firstName
    fullName
    rediLocation
    profileAvatarImageS3Key
  }
  status
  updatedAt
}
    `;