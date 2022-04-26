import { registerEnumType } from '@nestjs/graphql'

export enum DeclineReason {
  notEnoughTimeNowToBeMentor = 'notEnoughTimeNowToBeMentor',
  notRightExpertise = 'notRightExpertise',
  anotherMentorMoreSuitable = 'anotherMentorMoreSuitable',
  other = 'other',
}
registerEnumType(DeclineReason, { name: 'DeclineReason' })
