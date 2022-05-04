import { Injectable, NotFoundException } from '@nestjs/common'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { SfApiRepository } from '../salesforce-api/sf-api.repository'
import { ConMenteeFavoritedMentorEntity } from './con-mentee-favorited-mentor.entity'
import { ConMenteeFavoritedMentorEntityProps } from './con-mentee-favorited-mentor.entityprops'
import { ConMenteeFavoritedMentorRecord } from './con-mentee-favorited-mentor.record'
import { ConMenteeFavoritedMentorCreateMutationInputDto } from './dtos/con-mentee-favorited-mentor-create.mutation-dtos'
import { ConMenteeFavoritedMentorDeleteMutationInputDto } from './dtos/con-mentee-favorited-mentor-delete.mutation-dtos'
import { ConMenteeFavoritedMentorMapper } from './mappers/con-mentee-favorited-mentor.mapper'

@Injectable()
export class ConMenteeFavoritedMentorsService {
  constructor(
    // TODO: should we access this via a service instead?
    private readonly repository: SfApiRepository,
    private readonly conProfilesService: ConProfilesService,
    private readonly mapper: ConMenteeFavoritedMentorMapper
  ) {}

  async create(
    input: ConMenteeFavoritedMentorCreateMutationInputDto,
    user: CurrentUserInfo
  ) {
    const props = new ConMenteeFavoritedMentorEntityProps()
    const currentUserMenteeProfile =
      await this.conProfilesService.findOneByLoopbackUserId(user.loopbackUserId)
    props.menteeId = currentUserMenteeProfile.props.id
    props.mentorId = input.mentorId

    const entityToPersist = ConMenteeFavoritedMentorEntity.create(props)
    const recordToPersist = this.mapper.toPersistence(entityToPersist)

    const persistedObject = await this.repository.createRecord(
      ConMenteeFavoritedMentorRecord.metadata.SALESFORCE_OBJECT_NAME,
      recordToPersist.props
    )

    return { ok: true }
  }

  async delete(
    input: ConMenteeFavoritedMentorDeleteMutationInputDto,
    user: CurrentUserInfo
  ) {
    const currentUserMenteeProfile =
      await this.conProfilesService.findOneByLoopbackUserId(user.loopbackUserId)
    const menteeId = currentUserMenteeProfile.props.id

    const existingRecords = await this.repository.findRecordsOfObject({
      objectName:
        ConMenteeFavoritedMentorRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        ConMenteeFavoritedMentorRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: {
        Favoriter_ReDI_Connect_Profile__c: menteeId,
        Favoritee_ReDI_Connect_Profile__c: input.mentorId,
      },
    })
    if (existingRecords.length === 0) {
      throw new NotFoundException(
        "Didn't find any mathching ConMenteeFavoritedMentorRecord"
      )
    }

    const recordToDelete = existingRecords[0]

    await this.repository.deleteRecord(
      ConMenteeFavoritedMentorRecord.metadata.SALESFORCE_OBJECT_NAME,
      recordToDelete.Id
    )

    return { ok: true }
  }

  async findAllByMenteeId(menteeId: string) {
    const data = await this.repository.findRecordsOfObject({
      objectName:
        ConMenteeFavoritedMentorRecord.metadata.SALESFORCE_OBJECT_NAME,
      objectFields:
        ConMenteeFavoritedMentorRecord.metadata.SALESFORCE_OBJECT_FIELDS,
      filter: { Favoriter_ReDI_Connect_Profile__c: menteeId },
    })
    const records = data.map((props) =>
      ConMenteeFavoritedMentorRecord.create(props)
    )
    const entities: ConMenteeFavoritedMentorEntity[] = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }
}
