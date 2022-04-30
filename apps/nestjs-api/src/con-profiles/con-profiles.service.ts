import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ConProfileEntity,
  PatchConProfileInput,
} from '@talent-connect/common-types'
import { SalesforceApiConProfilesService } from '../salesforce-api/salesforce-api-con-profiles.service'
import { ConProfileMapper } from './mappers/con-profile.mapper'

@Injectable()
export class ConProfilesService {
  constructor(
    private readonly api: SalesforceApiConProfilesService,
    private readonly mapper: ConProfileMapper
  ) {}

  // create(createConProfileInput: CreateConProfileInput) {
  //   return 'This action adds a new conProfile'
  // }

  async findAll(filter: any = {}) {
    const persistedConProfiles = await this.api.getAllConProfiles(filter)

    const entities: ConProfileEntity[] = persistedConProfiles.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findOneById(id: string) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('ConProfile not found')
    }
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

  async update(updateConProfileInput: PatchConProfileInput) {
    const existingEntity = await this.findOneById(updateConProfileInput.id)
    const props = existingEntity.props
    const updatesSanitized = deleteUndefinedProps(updateConProfileInput)
    Object.entries(updatesSanitized).forEach(([key, value]) => {
      props[key] = value
    })
    const entityToPersist = ConProfileEntity.create(props)
    const persistedObject = await this.api.updateConProfile(
      this.mapper.toPersistence(entityToPersist)
    )
    const updatedEntity = this.mapper.fromPersistence(persistedObject)

    return updatedEntity
  }

  remove(id: number) {
    return `This action removes a #${id} conProfile`
  }
}

function deleteUndefinedProps<T extends object>(obj: T): T {
  const returnObject = {}
  for (const key in obj) {
    if (obj[key] !== undefined) {
      Object.assign(returnObject, { [key]: obj[key] })
    }
  }
  return returnObject as T
}
