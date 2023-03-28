import { registerEnumType } from '@nestjs/graphql'

export enum FirstPointOfTpContactOption {
  REDI_TEAM_MEMBER = 'REDI_TEAM_MEMBER',
  REDI_STUDENT_ALUMNI = 'REDI_STUDENT_ALUMNI',
  REDI_WEBSITE = 'REDI_WEBSITE',
  COLLEGUE = 'COLLEGUE',
  ALREADY_VOLUNTEER_AT_REDI = 'ALREADY_VOLUNTEER_AT_REDI',
  INTERNET_SEARCH = 'INTERNET_SEARCH',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  OTHER = 'OTHER',
}
registerEnumType(FirstPointOfTpContactOption, {
  name: 'FirstPointOfTpContactOption',
})
