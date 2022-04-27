import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ConProfileEntity,
  CreateConProfileInput,
  UpdateConProfileInput,
} from '@talent-connect/common-types'
import { SalesforceApiConProfilesService } from '../salesforce-api/salesforce-api-con-profiles.service'
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

  async findOneByLoopbackUserId(loopbackUserId: string) {
    const entities = await this.findAll({
      'Contact__r.Loopback_User_ID__c': loopbackUserId,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('ConProfile not found')
    }
  }

  async update(updateConProfileInput: UpdateConProfileInput) {
    // updateConProfileInput.
    return {}
  }

  remove(id: number) {
    return `This action removes a #${id} conProfile`
  }
}
