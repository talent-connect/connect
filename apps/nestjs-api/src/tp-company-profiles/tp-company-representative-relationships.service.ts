import { Injectable } from '@nestjs/common'
import {
  TpCompanyProfileMapper,
  TpCompanyRepresentativeRelationshipMapper,
  UserContactMapper,
} from '@talent-connect/common-types'
import { SfApiTpCompanyProfilesService } from '../salesforce-api/sf-api-tp-company-profiles.service'

@Injectable()
export class TpCompanyRepresentativeRelationshipsService {
  constructor(
    private readonly sfService: SfApiTpCompanyProfilesService,
    private readonly tpCompanyProfileMapper: TpCompanyProfileMapper,
    private readonly tpCompanyRepresentativeRelationshipMapper: TpCompanyRepresentativeRelationshipMapper,
    private readonly userMapper: UserContactMapper
  ) {}

  async findCompanyRepresentativeRelationshipByUser(userId: string) {
    const record =
      await this.sfService.getCompanyRepresentativeRelationshipByUser(userId)

    const entity =
      this.tpCompanyRepresentativeRelationshipMapper.fromPersistence(record)

    return entity
  }

  async findCompanyRepresentativesByCompany(companyId: string) {
    const records = await this.sfService.getCompanyRepresentativesByCompany(
      companyId
    )

    const entities = records.map((record) =>
      this.userMapper.fromPersistence(record)
    )

    return entities
  }

  async findCompanyRepresentedByUser(userId: string) {
    const record = await this.sfService.getCompanyRepresentedByUser(userId)

    const entity = this.tpCompanyProfileMapper.fromPersistence(record)

    return entity
  }
}
