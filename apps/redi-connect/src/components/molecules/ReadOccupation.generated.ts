// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type ReadOccupationProfilePropFragment = { __typename?: 'ConProfile', userType: Types.UserType, mentor_occupation?: string | null, mentor_workPlace?: string | null, mentee_occupationCategoryId?: Types.OccupationCategory | null, mentee_occupationJob_placeOfEmployment?: string | null, mentee_occupationJob_position?: string | null, mentee_occupationStudent_studyPlace?: string | null, mentee_occupationStudent_studyName?: string | null, mentee_occupationLookingForJob_what?: string | null, mentee_occupationOther_description?: string | null };

export const ReadOccupationProfilePropFragmentDoc = `
    fragment ReadOccupationProfileProp on ConProfile {
  userType
  mentor_occupation
  mentor_workPlace
  mentee_occupationCategoryId
  mentee_occupationJob_placeOfEmployment
  mentee_occupationJob_position
  mentee_occupationStudent_studyPlace
  mentee_occupationStudent_studyName
  mentee_occupationLookingForJob_what
  mentee_occupationOther_description
}
    `;