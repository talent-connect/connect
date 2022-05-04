import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ConMentorshipMatchEntity,
  ConMentorshipMatchEntityProps,
} from '@talent-connect/common-types'
import { SfApiConMentorshipMatchesService } from '../salesforce-api/sf-api-con-mentorship-matches.service'
import { ConMentorshipMatchMapper } from './mappers/con-mentorship-match.mapper'

@Injectable()
export class ConMentorshipMatchesService {
  constructor(
    private readonly api: SfApiConMentorshipMatchesService,
    private readonly mapper: ConMentorshipMatchMapper
  ) {}

  // create(createConMentorshipMatchInput: CreateConMentorshipMatchInput) {
  //   return 'This action adds a new conMentorshipMatch'
  // }

  async findAll(filter: any = {}) {
    const persistedEntities = await this.api.getAllConMentorshipMatches(filter)

    const entities: ConMentorshipMatchEntity[] = persistedEntities.map(
      (source) => this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findOne(filter: any = {}) {
    const persistedEntities = await this.findAll(filter)
    if (persistedEntities.length > 0) {
      return persistedEntities[0]
    } else {
      throw new NotFoundException('ConMentorshipMatch not found')
    }
  }

  async patch(
    conMentorshipMatchId: string,
    updates: Partial<ConMentorshipMatchEntityProps>
  ): Promise<ConMentorshipMatchEntity> {
    const existingEntity = await this.findOne({ Id: conMentorshipMatchId })
    const pendingEntityProps = Object.assign(
      {},
      existingEntity.props,
      updates
    ) as ConMentorshipMatchEntityProps
    const pendingEntity = ConMentorshipMatchEntity.create(pendingEntityProps)
    const persistedRecord = await this.api.updateConMentorshipMatch(
      this.mapper.toPersistence(pendingEntity)
    )
    const persistedEntity = this.mapper.fromPersistence(persistedRecord)

    return persistedEntity
  }

  remove(id: number) {
    return `This action removes a #${id} conMentorshipMatch`
  }
}
