import { Injectable } from '@nestjs/common'
import {
  ConMentoringSessionEntity,
  ConMentoringSessionEntityProps,
  ConMentoringSessionPersistence,
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
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = ConMentoringSessionEntity.create(props)

    return entity
  }
}
