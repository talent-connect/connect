// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type ProfileCardProfilePropFragment = { __typename?: 'ConProfile', id: string, fullName: string, languages?: Array<Types.ConnectProfileLanguage> | null, categories: Array<Types.MentoringTopic>, rediLocation: Types.RediLocation, profileAvatarImageS3Key?: string | null };

export const ProfileCardProfilePropFragmentDoc = `
    fragment ProfileCardProfileProp on ConProfile {
  id
  fullName
  languages
  categories
  rediLocation
  profileAvatarImageS3Key
}
    `;