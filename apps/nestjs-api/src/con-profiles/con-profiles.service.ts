import { Injectable } from '@nestjs/common'
import { ConProfileEntity } from '@talent-connect/common-types'
import { SalesforceApiConProfilesService } from '../salesforce-api/salesforce-api-con-profiles.service'
import { CreateConProfileInput } from './dto/create-con-profile.input'
import { UpdateConProfileInput } from './dto/update-con-profile.input'
import { ConProfileMapper } from './mappers/con-profile.mapper'

@Injectable()
export class ConProfilesService {
  constructor(
    private readonly api: SalesforceApiConProfilesService,
    private readonly mapper: ConProfileMapper
  ) {}

  create(createConProfileInput: CreateConProfileInput) {
    return 'This action adds a new conProfile'
  }

  async findAll(conditions: any = {}) {
    const persistedConProfiles = await this.api.getAllConProfiles(conditions)

    const entities: ConProfileEntity[] = persistedConProfiles.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findOne(id: string) {
    const persistedConProfile = await this.api.getConProfile(id)

    const entity = this.mapper.fromPersistence(persistedConProfile)

    return entity
  }

  update(id: number, updateConProfileInput: UpdateConProfileInput) {
    return `This action updates a #${id} conProfile`
  }

  remove(id: number) {
    return `This action removes a #${id} conProfile`
  }
}
