import { Injectable, NotFoundException } from '@nestjs/common'
import { ObjectType } from '@nestjs/graphql'
import {
  ConMentoringSessionEntity,
  ConMentoringSessionEntityProps,
  CreateConMentoringSessionInput,
} from '@talent-connect/common-types'
import { CurrentUser } from '../auth/current-user.decorator'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { SfApiConMentoringSessionsService } from '../salesforce-api/sf-api-con-mentoring-sessions.service'
import { ConMentoringSessionMapper } from './mappers/con-mentoring-session.mapper'

@Injectable()
export class ConMentoringSessionsService {
  constructor(
    private readonly api: SfApiConMentoringSessionsService,
    private readonly mapper: ConMentoringSessionMapper
  ) {}

  // TODO: think about - can this method get user not from the resolver?
  async create(input: CreateConMentoringSessionInput, user: CurrentUserInfo) {
    const props = new ConMentoringSessionEntityProps()
    Object.assign(props, input)
    props.mentorId = user.contactId
    const entityToPersist = ConMentoringSessionEntity.create(props)
    const persistedObject = await this.api.createConMentoringSession(
      this.mapper.toPersistence(entityToPersist)
    )
    const persistedEntity = this.mapper.fromPersistence(persistedObject)

    return persistedEntity
  }

  async findAll(filter: any = {}) {
    const persistedConMentoringSessions =
      await this.api.getAllConMentoringSessions(filter)

    const entities: ConMentoringSessionEntity[] =
      persistedConMentoringSessions.map((source) =>
        this.mapper.fromPersistence(source)
      )

    return entities
  }

  async findOneById(id: number) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('ConMentoringSession not found')
    }
  }
}
