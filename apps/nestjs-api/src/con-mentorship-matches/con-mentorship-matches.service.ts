import { Injectable, NotFoundException } from '@nestjs/common'
import { ConMentorshipMatchEntity } from '@talent-connect/common-types'
import { SfApiConMentorshipMatchesService } from '../salesforce-api/sf-api-con-mentorship-matches.service'
import { CreateConMentorshipMatchInput } from './dto/create-con-mentorship-match.input'
import { UpdateConMentorshipMatchInput } from './dto/update-con-mentorship-match.input'
import { ConMentorshipMatchMapper } from './mappers/con-mentorship-match.mapper'

@Injectable()
export class ConMentorshipMatchesService {
  constructor(
    private readonly api: SfApiConMentorshipMatchesService,
    private readonly mapper: ConMentorshipMatchMapper
  ) {}

  create(createConMentorshipMatchInput: CreateConMentorshipMatchInput) {
    return 'This action adds a new conMentorshipMatch'
  }

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

  update(
    id: number,
    updateConMentorshipMatchInput: UpdateConMentorshipMatchInput
  ) {
    return `This action updates a #${id} conMentorshipMatch`
  }

  remove(id: number) {
    return `This action removes a #${id} conMentorshipMatch`
  }
}
