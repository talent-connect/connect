import { Injectable, NotFoundException } from '@nestjs/common'
import {
  ContactRecord,
  TpCompanyProfileEntity,
  TpCompanyProfileMapper,
} from '@talent-connect/common-types'
import { SfApiTpCompanyProfilesService } from '../salesforce-api/sf-api-tp-company-profiles.service'

@Injectable()
export class TpCompanyProfilesService {
  constructor(
    private readonly sfService: SfApiTpCompanyProfilesService,
    private readonly mapper: TpCompanyProfileMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.sfService.getAllTpEnabledAccounts(filter)

    const entities: TpCompanyProfileEntity[] = records.map((source) =>
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
      throw new NotFoundException('TpCompanyProfile not found')
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

  // async update(updateConProfileInput: PatchConProfileInput) {
  //   const existingEntity = await this.findOneById(updateConProfileInput.id)
  //   const props = existingEntity.props
  //   const updatesSanitized = deleteUndefinedProps(updateConProfileInput)
  //   Object.entries(updatesSanitized).forEach(([key, value]) => {
  //     props[key] = value
  //   })
  //   const entityToPersist = ConProfileEntity.create(props)
  //   const persistedObject = await this.api.updateConProfile(
  //     this.mapper.toRecord(entityToPersist)
  //   )
  //   const updatedEntity = this.mapper.fromRecord(persistedObject)

  //   return updatedEntity
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} conProfile`
  // }
}
