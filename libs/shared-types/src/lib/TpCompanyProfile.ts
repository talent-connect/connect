import { Timestamp } from './Timestamp';
import { TpCompanyProfileState } from './TpCompanyProfileState'

export type TpCompanyProfile =
  Timestamp & {
  id: string
  firstName: string
  lastName: string
  contactEmail: string

  profileAvatarImageS3Key: string

  companyName?: string
  location?: string
  tagline?: string

  industry?: string
  website?: string
  linkedInUrl?: string

  phoneNumber?: string

  about?: string

  state: TpCompanyProfileState

  howDidHearAboutRediKey?: string
  howDidHearAboutRediOtherText?: string
}
