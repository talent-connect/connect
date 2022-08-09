import { Injectable } from '@nestjs/common'
import {
  TpCompanyProfileMapper,
  TpCompanyRepresentativeRelationshipMapper,
} from '@talent-connect/common-types'
import { SfApiTpCompanyProfilesService } from '../salesforce-api/sf-api-tp-company-profiles.service'

@Injectable()
export class TpCompanyRepresentativeRelationshipsService {
  constructor(
    private readonly sfService: SfApiTpCompanyProfilesService,
    private readonly tpCompanyProfileMapper: TpCompanyProfileMapper,
    private readonly tpCompanyRepresentativeRelationshipMapper: TpCompanyRepresentativeRelationshipMapper
  ) {}

  async findCompanyRepresentativeRelationshipByUser(userId: string) {
    const record =
      await this.sfService.getCompanyRepresentativeRelationshipByUser(userId)

    const entity =
      this.tpCompanyRepresentativeRelationshipMapper.fromPersistence(record)

    return entity
  }

  async findCompanyRepresentedByUser(userId: string) {
    const record = await this.sfService.getCompanyRepresentedByUser(userId)

    const entity = this.tpCompanyProfileMapper.fromPersistence(record)

    return entity
  }
}
