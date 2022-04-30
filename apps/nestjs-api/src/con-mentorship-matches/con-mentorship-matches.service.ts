import { Injectable, NotFoundException } from '@nestjs/common'
import { ConMentorshipMatchEntity } from '@talent-connect/common-types'
import { SalesforceApiConMentorshipMatchesService } from '../salesforce-api/salesforce-api-con-mentorship-matches.service'
import { CreateConMentorshipMatchInput } from './dto/create-con-mentorship-match.input'
import { UpdateConMentorshipMatchInput } from './dto/update-con-mentorship-match.input'
import { ConMentorshipMatchMapper } from './mappers/con-mentorship-match.mapper'

@Injectable()
export class ConMentorshipMatchesService {
  constructor(
    private readonly api: SalesforceApiConMentorshipMatchesService,
    private readonly mapper: ConMentorshipMatchMapper
  ) {}

  create(createConMentorshipMatchInput: CreateConMentorshipMatchInput) {
    return 'This action adds a new conMentorshipMatch'
  }

  async findAll(filter: any = {}) {
    const persistedConMentorshipMatches =
      await this.api.getAllConMentorshipMatches(filter)

    const entities: ConMentorshipMatchEntity[] =
      persistedConMentorshipMatches.map((source) =>
        this.mapper.fromPersistence(source)
      )

    return entities
  }

  async findOne(filter: any = {}) {
    const persistedConMentorshipMatches = await this.findAll(filter)
    if (persistedConMentorshipMatches.length > 0) {
      return persistedConMentorshipMatches[0]
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
