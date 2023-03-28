// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllUserContactFieldsFragment = { __typename?: 'UserContact', id: string, behanceUrl?: string | null, lastName: string, linkedInProfileUrl?: string | null, loopbackUserId: string, personalDescription?: string | null, personalWebsite?: string | null, postalMailingAddress?: string | null, slackUsername?: string | null, stackOverflowUrl?: string | null, telephoneNumber?: string | null, birthDate?: any | null, twitterUrl?: string | null, updatedAt: any, createdAt: any, dribbbleUrl?: string | null, email: string, firstName: string, gender?: Types.Gender | null, githubProfileUrl?: string | null, howDidHearAboutRediKey?: Types.FirstPointOfTpContactOption | null, howDidHearAboutRediOtherText?: string | null };

export const AllUserContactFieldsFragmentDoc = `
    fragment AllUserContactFields on UserContact {
  id
  behanceUrl
  lastName
  linkedInProfileUrl
  loopbackUserId
  personalDescription
  personalWebsite
  postalMailingAddress
  slackUsername
  stackOverflowUrl
  telephoneNumber
  birthDate
  twitterUrl
  updatedAt
  createdAt
  dribbbleUrl
  email
  firstName
  gender
  githubProfileUrl
  howDidHearAboutRediKey
  howDidHearAboutRediOtherText
}
    `;