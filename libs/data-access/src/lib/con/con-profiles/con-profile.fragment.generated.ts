// THIS FILE IS GENERATED, DO NOT EDIT!
import * as Types from '@talent-connect/data-access';

export type AllConProfileFieldsFragment = { __typename?: 'ConProfile', userId: string, age?: number | null, birthDate?: any | null, categories: Array<Types.MentoringTopic>, createdAt: any, email: string, expectations?: string | null, firstName: string, fullName: string, gender?: Types.Gender | null, githubProfileUrl?: string | null, id: string, ifUserMentee_activeMentorshipMatches: number, ifUserMentor_activeMentorshipMatches: number, ifUserMentor_hasAvailableMentorshipSlot: boolean, ifUserMentor_doesntHaveAvailableMentorshipSlot: boolean, languages?: Array<Types.ConnectProfileLanguage> | null, lastName: string, linkedInProfileUrl?: string | null, loopbackUserId: string, menteeCountCapacity?: number | null, mentee_currentlyEnrolledInCourse: Types.RediCourse, mentee_highestEducationLevel?: Types.EducationLevel | null, mentee_occupationCategoryId?: Types.OccupationCategory | null, mentee_occupationJob_placeOfEmployment?: string | null, mentee_occupationJob_position?: string | null, mentee_occupationLookingForJob_what?: string | null, mentee_occupationOther_description?: string | null, mentee_occupationStudent_studyName?: string | null, mentee_occupationStudent_studyPlace?: string | null, mentor_occupation?: string | null, mentor_workPlace?: string | null, optOutOfMenteesFromOtherRediLocation: boolean, personalDescription?: string | null, profileAvatarImageS3Key?: string | null, profileStatus: Types.ConnectProfileStatus, rediLocation: Types.RediLocation, slackUsername?: string | null, telephoneNumber?: string | null, updatedAt: any, userActivatedAt?: any | null, userType: Types.UserType };

export const AllConProfileFieldsFragmentDoc = `
    fragment AllConProfileFields on ConProfile {
  userId
  age
  birthDate
  categories
  createdAt
  email
  expectations
  firstName
  fullName
  gender
  githubProfileUrl
  id
  ifUserMentee_activeMentorshipMatches
  ifUserMentor_activeMentorshipMatches
  ifUserMentor_hasAvailableMentorshipSlot
  ifUserMentor_doesntHaveAvailableMentorshipSlot
  languages
  lastName
  linkedInProfileUrl
  loopbackUserId
  menteeCountCapacity
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
  profileStatus
  rediLocation
  slackUsername
  telephoneNumber
  updatedAt
  userActivatedAt
  userType
}
    `;