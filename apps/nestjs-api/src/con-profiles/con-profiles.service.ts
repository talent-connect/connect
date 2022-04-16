import { Injectable } from '@nestjs/common'
import { ConProfileEntity } from '@talent-connect/common-types'
import { SalesforceApiConProfilesService } from '../salesforce-api/salesforce-api-con-profiles.service'
import { CreateConProfileInput } from './dto/create-con-profile.input'
import { UpdateConProfileInput } from './dto/update-con-profile.input'
import { ConProfilesMapper } from './mappers/con-profiles.mapper'

@Injectable()
export class ConProfilesService {
  constructor(
    private readonly api: SalesforceApiConProfilesService,
    private readonly mapper: ConProfilesMapper
  ) {}

  create(createConProfileInput: CreateConProfileInput) {
    return 'This action adds a new conProfile'
  }

  async findAll() {
    // TODO: We should pass in simply `SfConProfile` (the class) instead of an instance thereof
    // I (Eric) tried for a couple of days to get this to work, without success.
    const persistedConProfiles = await this.api.getAllConProfiles()

    const entities: ConProfileEntity[] = persistedConProfiles.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  findOne(id: number) {
    return `This action returns a #${id} conProfile`
  }

  update(id: number, updateConProfileInput: UpdateConProfileInput) {
    return `This action updates a #${id} conProfile`
  }

  remove(id: number) {
    return `This action removes a #${id} conProfile`
  }
}
