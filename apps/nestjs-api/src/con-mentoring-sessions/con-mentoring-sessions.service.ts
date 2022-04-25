import { Injectable } from '@nestjs/common'
import { ConMentoringSessionEntity } from '@talent-connect/common-types'
import { SalesforceApiConMentoringSessionsService } from '../salesforce-api/salesforce-api-con-mentoring-sessions.service'
import { CreateConMentoringSessionInput } from './dto/create-con-mentoring-session.input'
import { UpdateConMentoringSessionInput } from './dto/update-con-mentoring-session.input'
import { ConMentoringSessionsMapper } from './mappers/con-mentoring-sessions.mapper'

@Injectable()
export class ConMentoringSessionsService {
  constructor(
    private readonly api: SalesforceApiConMentoringSessionsService,
    private readonly mapper: ConMentoringSessionsMapper
  ) {}

  create(createConMentoringSessionInput: CreateConMentoringSessionInput) {
    return 'This action adds a new conMentoringSession'
  }

  async findAll(conditions: any = {}, limit: number = 100, offset: number = 0) {
    const persistedConMentoringSessions =
      await this.api.getAllConMentoringSessions(conditions, limit, offset)

    const entities: ConMentoringSessionEntity[] =
      persistedConMentoringSessions.map((source) =>
        this.mapper.fromPersistence(source)
      )

    return entities
  }

  findOne(id: number) {
    return `This action returns a #${id} conMentoringSession`
  }

  update(
    id: number,
    updateConMentoringSessionInput: UpdateConMentoringSessionInput
  ) {
    return `This action updates a #${id} conMentoringSession`
  }

  remove(id: number) {
    return `This action removes a #${id} conMentoringSession`
  }
}
