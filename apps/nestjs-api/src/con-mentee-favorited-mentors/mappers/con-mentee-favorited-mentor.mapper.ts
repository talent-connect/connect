import { Injectable } from '@nestjs/common'
import { Mapper } from '@talent-connect/common-types'
import { ConMenteeFavoritedMentorEntity } from '../con-mentee-favorited-mentor.entity'
import { ConMenteeFavoritedMentorEntityProps } from '../con-mentee-favorited-mentor.entityprops'
import { ConMenteeFavoritedMentorRecord } from '../con-mentee-favorited-mentor.record'
import { ConMenteeFavoritedMentorRecordProps } from '../con-mentee-favorited-mentor.recordprops'

@Injectable()
export class ConMenteeFavoritedMentorMapper
  implements
    Mapper<ConMenteeFavoritedMentorEntity, ConMenteeFavoritedMentorRecord>
{
  fromPersistence(
    raw: ConMenteeFavoritedMentorRecord
  ): ConMenteeFavoritedMentorEntity {
    const props = new ConMenteeFavoritedMentorEntityProps()

    props.id = raw.props.Id
    props.mentorId = raw.props.Favoritee_ReDI_Connect_Profile__c
    props.menteeId = raw.props.Favoriter_ReDI_Connect_Profile__c
    props.createdAt = raw.props.CreatedDate
    props.updatedAt = raw.props.LastModifiedDate

    const entity = ConMenteeFavoritedMentorEntity.create(props)

    return entity
  }

  public toPersistence(
    source: ConMenteeFavoritedMentorEntity
  ): ConMenteeFavoritedMentorRecord {
    const props = new ConMenteeFavoritedMentorRecordProps()
    const srcProps = source.props

    props.Id = srcProps.id
    props.Favoritee_ReDI_Connect_Profile__c = srcProps.mentorId
    props.Favoriter_ReDI_Connect_Profile__c = srcProps.menteeId

    const record = ConMenteeFavoritedMentorRecord.create(props)

    return record
  }
}
