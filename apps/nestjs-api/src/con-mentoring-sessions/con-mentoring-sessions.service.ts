import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ConMentoringSessionEntity,
  ConMentoringSessionEntityProps,
  ConMentoringSessionMapper,
  CreateConMentoringSessionInput,
} from '@talent-connect/common-types'
import { CurrentUserInfo } from '../auth/current-user.interface'
import { ConProfilesService } from '../con-profiles/con-profiles.service'
import { EmailService } from '../email/email.service'
import { SfApiConMentoringSessionsService } from '../salesforce-api/sf-api-con-mentoring-sessions.service'

@Injectable()
export class ConMentoringSessionsService {
  constructor(
    private readonly api: SfApiConMentoringSessionsService,
    private readonly mapper: ConMentoringSessionMapper,
    private readonly emailService: EmailService,
    private readonly profilesService: ConProfilesService
  ) {}

  // TODO: think about - can this method get user not from the resolver?
  async create(input: CreateConMentoringSessionInput, user: CurrentUserInfo) {
    const props = new ConMentoringSessionEntityProps()
    Object.assign(props, input)
    props.mentorId = user.userId
    const entityToPersist = ConMentoringSessionEntity.create(props)

    const [mentorProfile, menteeProfile] = await Promise.all([
      this.profilesService.findOne({ 'Contact__r.Id': user.userId }),
      this.profilesService.findOne({ 'Contact__r.Id': input.menteeId }),
    ])

    this.emailService.sendMentoringSessionLoggedEmail({
      recipient: mentorProfile.props.email,
      mentorName: mentorProfile.props.firstName,
      menteeFirstName: menteeProfile.props.firstName,
      rediLocation: mentorProfile.props.rediLocation,
    })

    return await this.api.create(this.mapper.toPersistence(entityToPersist))
  }

  async findAll(filter: any = {}) {
    const persistedConMentoringSessions = await this.api.getAll(filter)

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
