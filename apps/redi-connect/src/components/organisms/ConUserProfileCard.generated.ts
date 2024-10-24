// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type ConUserProfileCardProfilePropFragment = { __typename?: 'ConProfile', id: string, fullName: string, languages?: Array<Types.Language> | null, categories: Array<Types.MentoringTopic>, rediLocation: Types.RediLocation, profileAvatarImageS3Key?: string | null };

export const ConUserProfileCardProfilePropFragmentDoc = `
    fragment ConUserProfileCardProfileProp on ConProfile {
  id
  fullName
  languages
  categories
  rediLocation
  profileAvatarImageS3Key
}
    `;