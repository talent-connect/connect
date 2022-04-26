import { Injectable } from '@nestjs/common'
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

  async findAll(conditions: any = {}) {
    const persistedConMentorshipMatches =
      await this.api.getAllConMentorshipMatches(conditions)

    const entities: ConMentorshipMatchEntity[] =
      persistedConMentorshipMatches.map((source) =>
        this.mapper.fromPersistence(source)
      )

    return entities
  }

  findOne(id: number) {
    return `This action returns a #${id} conMentorshipMatch`
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
