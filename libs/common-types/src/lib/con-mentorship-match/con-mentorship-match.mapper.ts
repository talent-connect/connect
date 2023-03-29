import { Injectable } from '@nestjs/common'
import {
  ConMentorshipMatchEntity,
  ConMentorshipMatchEntityProps,
  ConMentorshipMatchRecord,
  ConMentorshipMatchRecordProps,
  Mapper,
  MentorshipMatchStatus,
} from '@talent-connect/common-types'

@Injectable()
export class ConMentorshipMatchMapper
  implements Mapper<ConMentorshipMatchEntity, ConMentorshipMatchRecord>
{
  fromPersistence(raw: ConMentorshipMatchRecord): ConMentorshipMatchEntity {
    const props = new ConMentorshipMatchEntityProps()

    props.id = raw.props.Id

    props.applicationText = raw.props.Application_Text__c
    props.expectationText = raw.props.Expectations__c
    props.hasMenteeDismissedMentorshipApplicationAcceptedNotification =
      raw.props.Acceptance_Notification_Dismissed__c
    props.ifDeclinedByMentor_chosenReasonForDecline =
      raw.props.Decline_Reason__c
    props.ifDeclinedByMentor_dateTime = raw.props.Declined_On__c
    props.ifDeclinedByMentor_ifReasonIsOther_freeText =
      raw.props.Decline_Reason_Other__c
    props.ifDeclinedByMentor_optionalMessageToMentee =
      raw.props.Decline_Message__c
    props.matchMadeActiveOn = raw.props.Application_Accepted_On__c
    props.mentorMessageOnComplete = raw.props.Mentor_Completion_Message__c
    props.mentorReplyMessageOnAccept = raw.props.Mentor_Acceptance_Message__c
    props.status = raw.props.Status__c as MentorshipMatchStatus

    props.menteeId = raw.props.Mentee__c
    props.mentorId = raw.props.Mentor__c

    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = ConMentorshipMatchEntity.create(props)

    return entity
  }

  public toPersistence(
    source: ConMentorshipMatchEntity
  ): ConMentorshipMatchRecord {
    const dstProps = new ConMentorshipMatchRecordProps()
    const srcProps = source.props

    dstProps.Id = srcProps.id
    dstProps.Application_Text__c = srcProps.applicationText
    dstProps.Expectations__c = srcProps.expectationText
    dstProps.Acceptance_Notification_Dismissed__c =
      srcProps.hasMenteeDismissedMentorshipApplicationAcceptedNotification
    dstProps.Decline_Reason__c =
      srcProps.ifDeclinedByMentor_chosenReasonForDecline
    dstProps.Declined_On__c = srcProps.ifDeclinedByMentor_dateTime
    dstProps.Decline_Reason_Other__c =
      srcProps.ifDeclinedByMentor_ifReasonIsOther_freeText
    dstProps.Decline_Message__c =
      srcProps.ifDeclinedByMentor_optionalMessageToMentee
    dstProps.Application_Accepted_On__c = srcProps.matchMadeActiveOn
    dstProps.Mentor_Completion_Message__c = srcProps.mentorMessageOnComplete
    dstProps.Mentor_Acceptance_Message__c = srcProps.mentorReplyMessageOnAccept
    dstProps.Status__c = srcProps.status
    dstProps.Mentee__c = srcProps.menteeId
    dstProps.Mentor__c = srcProps.mentorId
    dstProps.CreatedDate = srcProps.createdAt
    dstProps.LastModifiedDate = srcProps.updatedAt

    const record = ConMentorshipMatchRecord.create(dstProps)

    return record
  }
}
