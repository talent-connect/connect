import { UserType } from '@talent-connect/data-access'

type _UserType = typeof UserType
type _UserTypeKey = keyof _UserType
type _UserTypeValue = _UserType[_UserTypeKey]

type UserTypePropertyLowercased = Lowercase<_UserTypeKey>
type UserTypeValueLowercased = Lowercase<_UserTypeValue>

export type SignUpPageTypes = Record<
  UserTypePropertyLowercased,
  UserTypeValueLowercased
>
export const SignUpPageTypes = {
  [UserType.Mentor.toLowerCase()]: UserType.Mentor.toLowerCase(),
  [UserType.Mentee.toLowerCase()]: UserType.Mentee.toLowerCase(),
} as SignUpPageTypes
export type SignUpPageType = SignUpPageTypes[keyof SignUpPageTypes]
