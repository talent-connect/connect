// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type EditableContactCompanyProfilePropFragment = { __typename?: 'TpCompanyProfile', phoneNumber?: string | null };

export type EditableContactUserContactPropFragment = { __typename?: 'UserContact', firstName: string, lastName: string, email: string };

export const EditableContactCompanyProfilePropFragmentDoc = `
    fragment EditableContactCompanyProfileProp on TpCompanyProfile {
  phoneNumber
}
    `;
export const EditableContactUserContactPropFragmentDoc = `
    fragment EditableContactUserContactProp on UserContact {
  firstName
  lastName
  email
}
    `;