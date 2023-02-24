import { Injectable, NotFoundException } from '@nestjs/common'
import { TpJobListingMapper } from '@talent-connect/common-types'
import { SfApiTpJobListingsService } from '../salesforce-api/sf-api-tp-job-listings.service'
import { FindAllVisibleTpJobListingsArgs } from './args/find-all-visible-tp-jobseeker-profiles.args'

@Injectable()
export class TpJobListingsService {
  constructor(
    private readonly api: SfApiTpJobListingsService,
    private readonly mapper: TpJobListingMapper
  ) {}

  async findAll(filter: any = {}) {
    const records = await this.api.getAll(filter)

    const entities = records.map((source) =>
      this.mapper.fromPersistence(source)
    )

    return entities
  }

  async findAllVisibleJobListings(_filter: FindAllVisibleTpJobListingsArgs) {
    const filter: any = {}
    if (_filter.filter.relatesToPositions?.length > 0) {
      filter.Relates_to_Positions__c = {
        $includes: _filter.filter.relatesToPositions,
      }
    }
    if (_filter.filter.skills?.length > 0) {
      filter.Ideal_Technical_Skills__c = {
        $includes: _filter.filter.skills,
      }
    }
    if (_filter.filter.employmentTypes?.length > 0) {
      filter.Employment_Type__c = {
        $in: _filter.filter.employmentTypes,
      }
    }
    if (_filter.filter.federalStates?.length > 0) {
      filter.Federal_State__c = {
        $in: _filter.filter.federalStates,
      }
    }
    if (_filter.filter.isRemotePossible) {
      filter.Remote_Possible__c = true
    }

    return await this.findAll(filter)
  }

  async findAllBelongingToCompany(companyId: string) {
    return await this.findAll({
      Account__c: companyId,
    })
  }

  async findOne(id: string) {
    const entities = await this.findAll({
      Id: id,
    })
    if (entities.length > 0) {
      return entities[0]
    } else {
      throw new NotFoundException('TpJobListing not found with id: ' + id)
    }
  }
}
