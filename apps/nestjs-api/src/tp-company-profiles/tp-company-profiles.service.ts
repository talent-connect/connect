import { Injectable, NotFoundException } from '@nestjs/common'
import {
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
}
