import { Field, ID, ObjectType } from '@nestjs/graphql'
import { EntityProps } from '../base-interfaces-types-classes'
import { ConProfileEntityProps } from '../con-profile'
import { MentorshipMatchStatus } from './enums'

@ObjectType('ConMentorshipMatch')
export class ConMentorshipMatchEntityProps implements EntityProps {
  @Field((type) => ID)
  id: string //* DONE

  @Field((type) => MentorshipMatchStatus)
  status: MentorshipMatchStatus
  matchMadeActiveOn?: Date
  applicationText?: string
  expectationText?: string
  mentorReplyMessageOnAccept?: string
  mentorMessageOnComplete?: string
  hasMenteeDismissedMentorshipApplicationAcceptedNotification?: boolean
  ifDeclinedByMentor_chosenReasonForDecline?: string
  ifDeclinedByMentor_ifReasonIsOther_freeText?: string
  ifDeclinedByMentor_optionalMessageToMentee?: string
  ifDeclinedByMentor_dateTime?: Date

  // TODO: is there a way we can get rid of the id field?
  @Field((type) => ConProfileEntityProps)
  mentor: ConProfileEntityProps
  mentorId: string
  @Field((type) => ConProfileEntityProps)
  mentee: ConProfileEntityProps
  menteeId: string

  createdAt: Date
  updatedAt: Date
}
