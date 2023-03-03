import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../../base-interfaces-types-classes'
import { FirstPointOfTpContactOption } from './enums'
import { Gender } from './enums/gender.enum'

@ObjectType('UserContact')
export class UserContactEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string
  email: string
  loopbackUserId: string
  firstName: string
  lastName: string
  @Field((type) => Gender)
  gender?: Gender
  birthDate?: Date
  personalDescription?: string
  linkedInProfileUrl?: string
  githubProfileUrl?: string
  slackUsername?: string

  postalMailingAddress?: string
  personalWebsite?: string
  twitterUrl?: string
  behanceUrl?: string
  stackOverflowUrl?: string
  dribbbleUrl?: string
  howDidHearAboutRediKey?: FirstPointOfTpContactOption
  howDidHearAboutRediOtherText?: string

  telephoneNumber?: string
  createdAt: Date
  updatedAt: Date
}
