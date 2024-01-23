export interface JwtToken {
  loopbackUserId: string
  email: string
  emailVerified: boolean
  firstName: string
  lastName: string
  rediLocation: string
  userType: string
  companyIdOrName: string
  howDidHearAboutRediKey: string
  howDidHearAboutRediOtherText: string
  isMicrosoftPartner: boolean
  firstPointOfContact: string | null
  firstPointOfContactOther: string | null
  operationType: string
  productSignupSource: string
  tpSignupType: string
  mentor_isPartnershipMentor: boolean
  mentor_workPlace: string
}
