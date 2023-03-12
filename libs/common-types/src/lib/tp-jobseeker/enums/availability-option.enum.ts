import { registerEnumType } from '@nestjs/graphql'

export enum TpAvailabilityOption {
  immediately = 'immediately',
  oneMonthNotice = 'oneMonthNotice',
  twoMonthNotice = 'twoMonthNotice',
  threeMonthNotice = 'threeMonthNotice',
  date = 'date',
}

registerEnumType(TpAvailabilityOption, { name: 'TpAvailabilityOption' })
