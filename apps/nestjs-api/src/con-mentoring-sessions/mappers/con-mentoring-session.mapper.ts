import { Injectable } from '@nestjs/common'
import {
  ConMentoringSessionEntity,
  ConMentoringSessionEntityProps,
  ConMentoringSessionPersistence,
  ConMentoringSessionPersistenceProps,
  Mapper,
  MentoringSessionDuration,
} from '@talent-connect/common-types'

@Injectable()
export class ConMentoringSessionMapper
  implements Mapper<ConMentoringSessionEntity, ConMentoringSessionPersistence>
{
  fromPersistence(
    raw: ConMentoringSessionPersistence
  ): ConMentoringSessionEntity {
    const props = new ConMentoringSessionEntityProps()

    props.id = raw.props.Id
    props.date = raw.props.Date__c
    props.minuteDuration =
      MentoringSessionDuration[`MIN${raw.props.Durations_in_Minutes__c}`]
    props.mentorId = raw.props.Mentor__c
    props.menteeId = raw.props.Mentee__c
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = ConMentoringSessionEntity.create(props)

    return entity
  }

  public toPersistence(
    source: ConMentoringSessionEntity
  ): ConMentoringSessionPersistence {
    const props = new ConMentoringSessionPersistenceProps()
    const srcProps = source.props

    props.Id = srcProps.id
    props.Date__c = srcProps.date
    props.Durations_in_Minutes__c = parseInt(
      srcProps.minuteDuration.replace('MIN', '')
    )
    props.Mentor__c = srcProps.mentorId
    props.Mentee__c = srcProps.menteeId

    const persistence = ConMentoringSessionPersistence.create(props)

    return persistence
  }
}
